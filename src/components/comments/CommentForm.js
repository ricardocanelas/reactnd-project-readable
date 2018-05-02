// External Depedencies
import React from 'react'
import Yup from 'yup'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react'

// Our Depedencies
import actions from '../../actions'

const ErrorMessage = (props) => (<div className="error-message">{props.msg}</div>)

const InnerForm = (props) => {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, onCancel, initialValues} = props
    const hasError = (field) => touched[field] && errors[field] ? true : false

    const updateStatus = initialValues.hasOwnProperty('created_at')
    // const createStatus = !updateStatus

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field error={hasError('author')}>
                <label>Your Full Name</label>
                <input
                    type="text" name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                />
                {hasError('author') && <ErrorMessage msg={errors.author} />}
            </Form.Field>

            <Form.Field error={hasError('comment')}>
                <label>Your Comment</label>
                <textarea
                    name="comment" rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                ></textarea>
                {hasError('comment') && <ErrorMessage msg={errors.comment} />}
            </Form.Field>

            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                { updateStatus ? 'Save' : 'Add'}
            </Button>

            {updateStatus && (
                <Button basic type="button" disabled={isSubmitting} onClick={() => onCancel()}>
                    Cancel
                </Button>
            )}

        </Form>
    )
}

const formConfig = ({
    mapPropsToValues: props => (props.initialValues || {author: '', comment: '', vote_score: 0}),
    validationSchema: Yup.object().shape({
        author: Yup.string().min(3, 'Your name must be 3 characters or longer').required('Your name is required'),
        comment: Yup.string().min(10, 'Comment must be 10 characters or longer').max(320, 'Comment must be less of 320 characters').required('Comment is required')
    }),
    handleSubmit: (values, {setSubmitting, props, resetForm}) => {
        setSubmitting(true);
        props.saveComment(values)
            .then(response => {
                setSubmitting(false);
                if (props.onSubmitSuccess) props.onSubmitSuccess(response)
                if (!props.initialValues) resetForm()
            })
    }
})

const mapDispatch = (dispatch) => {
    return {
        saveComment: (comment) => dispatch(actions.comments.saveComment(comment))
    }
}

export default connect(null, mapDispatch)(withFormik(formConfig)(InnerForm))