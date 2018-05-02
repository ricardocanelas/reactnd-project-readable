import React from 'react'
import { Container } from 'semantic-ui-react'

import history from '../../history'
import PostForm from '../../components/posts/PostForm'
import HeaderPage from '../../components/ui/HeaderPage';

const CreatePost = (props) => {

    const handleCancel = () => {
        history.goBack()
    }

    const submitted = (response) => {
        history.push(`/posts/${response.id}`)
    }

    return (
        <Container>
            <HeaderPage>
                <h1>New Post</h1>
            </HeaderPage>

            <PostForm onSubmitSuccess={submitted} onCancel={handleCancel} />
        </Container>
    )
}

export default CreatePost