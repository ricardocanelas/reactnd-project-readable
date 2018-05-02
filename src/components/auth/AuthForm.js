// External Depedencies
import React from 'react'
import Yup from 'yup'
import If from 'react-if'
import styled from 'styled-components'
import { withFormik } from 'formik';
import { Form, Button, Message } from 'semantic-ui-react'

// Our Depedencies
const ErrorMessage = (props) => (<div className="error-message">{props.msg}</div>)

// Styles
const Link = styled.a`
display: block;
padding-top: 8px;
float:right;
cursor: pointer;
`

const InnerForm = (props) => {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props
    const { status = { isSigningIn: false, isSigningUp: false, isResettingPassword: false, view: 'form' } } = props

    const hasError = (field) => touched[field] && errors[field] ? true : false

    const handleSingIn = () => {
        props.setStatus({...status, isSigningIn: true, isSigningUp: false, isResettingPassword: false})
        props.setValues({...values, type: 'signin'})
        props.submitForm()
    }

    const handleSingUp = () => {
        props.setStatus({...status, isSigningIn: false, isSigningUp: true, isResettingPassword: false})
        props.setValues({...values, type: 'signup'})
        props.submitForm()
    }

    const handleResetPassword = () => {
        if(errors['email'] === undefined) {
            props.setStatus({...status, isSigningIn: false, isSigningUp: false, isResettingPassword: true})
            props.setValues({...values, type: 'reset'})
            props.submitForm()
        }
    }

    const changeView = (view) => {
        props.setStatus({...status, view})
        props.setValues({...values, type: view === 'reset' ? 'reset' : ''})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field error={hasError('email')}>
                <label>E-mail</label>
                <input
                    type="email" name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {hasError('email') && <ErrorMessage msg={errors.email} />}
            </Form.Field>

            <If condition={status.view === 'form'}>
                <Form.Field error={hasError('password')}>
                    <label>Password</label>
                    <input
                        type="password" name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {hasError('password') && <ErrorMessage msg={errors.password} />}
                </Form.Field>
            </If>

            <If condition={status.view === 'form'}>
                <div>
                    <Button type="button" disabled={isSubmitting} loading={isSubmitting && status.isSigningIn} onClick={handleSingIn}>
                        Sign-In
                    </Button>

                    <Button type="button" disabled={isSubmitting} loading={isSubmitting && status.isSigningUp} onClick={handleSingUp}>
                        Sign-Up
                    </Button>

                    <Link onClick={() => changeView('reset')}>
                        Forget password?
                    </Link>
                </div>
            </If>

            <If condition={status.view === 'reset'} >
                <div>
                    <Button type="button" disabled={isSubmitting} loading={isSubmitting && status.isResettingPassword} onClick={handleResetPassword}>
                        Send Password
                    </Button>

                    <Link onClick={() => changeView('form')}>
                        Back to login form
                    </Link>
                </div>
            </If>

            <If condition={(errors['success'] || errors['warning']) && touched['email'] && touched['password'] ? true : false}>
                <Message color={errors['success'] ? 'green' : 'yellow'}>
                    <Message.Header>{errors['success'] ? 'Success' : 'Warning'}</Message.Header>
                    <p>{errors['success'] || errors['warning'] }</p>
                </Message>
            </If>
        </Form>
    )
}

// Validation
const formValidation = Yup.object().shape({
    type: Yup.string(),
    email: Yup.string().email().required('Your e-mail is required'),
    password: Yup.string().when('type', {
        is: 'reset',
        then: Yup.string().min(0),
        otherwise: Yup.string().min(6, 'Password must be 6 characters or longer').max(24, 'Password must be less of 24 characters').required('Password is required'),
    })
})

// Config
const formConfig = ({
    mapPropsToValues: props => (props.initialValues || { type: '', email: '', password: '' }),
    validationSchema: formValidation,
    handleSubmit: (values, formikBag) => {
        formikBag.props.onSubmit(values, formikBag)
    },
})

export default withFormik(formConfig)(InnerForm)