// External Depedencies
import React from 'react'
import Yup from 'yup'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react'

// Our Depedencies
import actions from '../../actions'
import { getCategories } from '../../selectors/categorySelectors'

const ErrorMessage = (props) => (<div className="error-message">{props.msg}</div>)

const InnerForm = (props) => {
    const { values, errors, touched, handleChange, handleBlur } = props
    const { handleSubmit, isSubmitting, onCancel, initialValues } = props
    const hasError = (field) => touched[field] && errors[field] ? true : false

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Field error={hasError('title')} width={10}>
                    <label>Title</label>
                    <input
                        type="text" name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {hasError('title') && <ErrorMessage msg={errors.title} />}
                </Form.Field>

                <Form.Field error={hasError('category')} width={6}>
                    <label>Category</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                    >
                        <option value=""></option>
                        {props.categories.map((item, index) => (
                            <option key={index} value={item.id}>{item.label}</option>
                        ))}
                    </select>
                    {hasError('category') && <ErrorMessage msg={errors.category} />}
                </Form.Field>
            </Form.Group>

            <Form.Field error={hasError('body')}>
                <label>Body</label>
                <textarea
                    name="body" rows={12}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                ></textarea>
                {hasError('body') && <ErrorMessage msg={errors.body} />}
            </Form.Field>

            <Form.Field error={hasError('author')}>
                <label>Author</label>
                <input
                    type="text" name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                />
                {hasError('author') && <ErrorMessage msg={errors.author} />}
            </Form.Field>

            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                { initialValues.hasOwnProperty('created_at') ? 'Save' : 'Add'}
            </Button>
            <Button basic type="button" disabled={isSubmitting} onClick={() => onCancel()}>
                Cancel
            </Button>
        </Form>
    )
}

// Validation
const formValidation = Yup.object().shape({
    title: Yup.string().min(3, 'Title must be 3 characters or longer').required('Title is required'),
    category: Yup.mixed().required('Category is required'),
    body: Yup.string().min(10, 'Comment must be 10 characters or longer').max(2000, 'Comment must be less of 2000 characters').required('Comment is required'),
    author: Yup.string().min(3, 'Author must be 3 characters or longer').required('Author is required'),
})

// Config
const formConfig = ({
    mapPropsToValues: props => (props.initialValues || { title: '', category: '', body: '', author: ''}),
    validationSchema: formValidation,
    handleSubmit: (values, {setSubmitting, props, resetForm}) => {
        setSubmitting(true);
        props.savePost(values)
            .then(response => {
                setSubmitting(false);
                if (!props.initialValues) resetForm()
                if (props.onSubmitSuccess) {
                    props.onSubmitSuccess(response)
                }
            })
    }
})

const mapState = (state, props) => {
    return {
        categories: getCategories(state)
    }
}

const mapDispatch = (dispatch) => {
    return {
        savePost: (post) => dispatch(actions.posts.savePost(post))
    }
}

export default connect(mapState, mapDispatch)(withFormik(formConfig)(InnerForm))