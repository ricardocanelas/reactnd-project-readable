// External Depedencies
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

// Our Depedencies
import actions from '../../actions'
import history from '../../history'
import PostForm from '../../components/posts/PostForm'
import { getCurrentPost } from '../../selectors/postSelectors'
import HeaderPage from '../../components/ui/HeaderPage';

class EditPost extends Component {

    componentDidMount() {
        this.props.setCurrentPost(this.props.match.params.post_id)
    }

    componentWillUnmount() {
        this.props.setCurrentPost(undefined)
    }

    handleCancel = () => {
        history.goBack()
    }

    submitted = (response) => {
        history.push(`/posts/${this.props.match.params.post_id}`)
    }

    renderPost() {
        const { post } = this.props
        return (
            <Container>
                <HeaderPage>
                    <h1>Edit Post / {post.title}</h1>
                </HeaderPage>

                <PostForm
                    enableReinitialize
                    initialValues={post}
                    onSubmitSuccess={this.submitted}
                    onCancel={this.handleCancel}
                />
            </Container>
        )
    }

    renderLoading() {
        return (
            <div>
                Loading...
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.post ? this.renderPost() : this.renderLoading()}
            </div>
        )
    }
}

const mapState = (state, props) => {
    return {
        post: getCurrentPost(state)
    }
}

const mapDispatch = (dispatch) => {
    return {
        setCurrentPost: (postId) => dispatch(actions.posts.setCurrentPost(postId))
    }
}

export default connect(mapState, mapDispatch)(EditPost)