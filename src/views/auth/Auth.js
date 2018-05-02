// External Depedencies
import React from 'react'
import firebase from 'firebase'
import styled from 'styled-components'
import { Container, Grid, Segment, Divider, Button, Icon } from 'semantic-ui-react'

// Our Depedencies
import { auth } from '../../config/firebase'
import AuthForm from './../../components/auth/AuthForm'

// Styles
const WrapperAuth = styled(Container) `&&& {
height: 100%;
margin: auto 0;
}`

class Auth extends React.Component {

    signInEmailAndPasswordOrReset(values, formikBag) {
        formikBag.setSubmitting(true);

        switch (values.type) {
            case 'signin':
                auth.signInWithEmailAndPassword(values.email, values.password)
                    .then(response => {
                        formikBag.setSubmitting(false)
                    })
                    .catch(error => {
                        formikBag.setFieldError('warning', error.message)
                        formikBag.setSubmitting(false)
                    })
                break

            case 'signup':
                auth.createUserWithEmailAndPassword(values.email, values.password)
                    .then(response => {
                        formikBag.setSubmitting(false)
                    })
                    .catch(error => {
                        formikBag.setFieldError('warning', error.message)
                        formikBag.setSubmitting(false)
                    })
                break

            case 'reset':
                auth.sendPasswordResetEmail(values.email)
                    .then(response => {
                        formikBag.setSubmitting(false)
                        formikBag.setFieldError('success', 'Foi enviado para seu e-mail...')
                        formikBag.resetForm()

                    })
                    .catch(error => {
                        formikBag.setFieldError('warning', error.message)
                        formikBag.setSubmitting(false)
                    })
                break

            default:
                break
        }
    }


    signInGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                // const token = result.credential.accessToken;
                // const user = result.user;
            })
            .catch(error => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.email;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert(`You have signed up with a different provider for that email (${error.email})`)
                }
            })
    }


    render() {
        return (
            <WrapperAuth>
                 <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
                        <Button onClick={this.signInGithub} fluid color="blue">
                            <Icon name="github" />Authetication with Github
                        </Button>

                        <Divider horizontal>Or</Divider>

                        <Segment>
                            <h3>Log-in to or create your account</h3>
                            <AuthForm onSubmit={this.signInEmailAndPasswordOrReset} data="xxx"/>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </WrapperAuth>
        )
    }
}



export default Auth