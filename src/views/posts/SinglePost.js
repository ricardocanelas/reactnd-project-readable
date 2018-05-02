// External Depedencies
import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux'
import { Container, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'

// Our Depedencies
import actions from '../../actions'
import history from '../../history'
import PostModel from '../../models/PostModel'
import CommentList from '../../components/comments/CommentList'
import HeaderPage from '../../components/ui/HeaderPage'
import { getCurrentPost } from '../../selectors/postSelectors'

// Style
const WrapperSinglePost = styled.div`
margin-bottom: -30px;
`
const Actions = styled.div`
margin-bottom: 20px;
`
const PostContent = styled.div`
`
const Details = styled.div`
font-size: 12px;
color:#929292;
margin-bottom: 6px;
`
const Text = styled.div`
font-size: 14px;
line-height: 1.6em;
`
const WrapperVoteBlock = styled.div`
background: rgb(239, 239, 239);
padding: 20px 0;
margin-top:30px;
`
const Buttons = styled.div`
display:inline-block;
margin: 0 12px 0 12px;
.ui.button {
    margin: 0 0 0 0 !important;
    padding: 10px 4px 10px 10px !important;
    background-color: inherit !important;
}
`
const DividerButton = styled.span`
display:inline-block;
margin: 0 8px;
border-right: 1px solid #ccc;
width: 2px;
height: 13px;
`

class SinglePost extends Component {

    state = {
        isDeleting: false
    }

    componentDidMount() {
        this.props.setCurrentPost(this.props.match.params.post_id)
    }

    componentWillUnmount() {
        this.props.setCurrentPost(undefined)
    }

    savePost = () => {
        this.props.savePost({...this.props.post, title: 'Updated in...' + (Math.random(100) * 100)})
    }

    deletePost = () => {
        this.setState({isDeleting: true})
        this.props.deletePost(this.props.post)
            .then(post => {
                history.push('/')
            })
    }

    upVote = () => {
        this.props.votePost(this.props.post, true)
    }

    downVote = () => {
        this.props.votePost(this.props.post, false)
    }

    gotoEditPage = () => {
        history.push(`/posts/${this.props.match.params.post_id}/edit`)
    }

    gotoBack = () => {
        history.goBack()
    }

    renderPost = () => {
        const post = new PostModel(this.props.post)

        return (
            <WrapperSinglePost>
                <Dimmer active={this.state.isDeleting} inverted>
                    <Loader label="Deleting" />
                </Dimmer>

                <Container>
                    <Actions>
                        <Button basic onClick={this.gotoEditPage}>Edit This Post</Button>
                        <Button basic onClick={this.deletePost}>Delete</Button>
                        <div className="pull-right">
                            <Button basic onClick={this.gotoBack}>Back</Button>
                        </div>
                    </Actions>

                    <HeaderPage>
                        <h1>Post / {post.title}</h1>
                    </HeaderPage>

                    <PostContent>
                        <Details>{post.date} - by {post.author}</Details>
                        <Text>{post.body.split('\n').map((text, index) => (
                            <p key={index}>{text}</p>)
                        )}</Text>
                    </PostContent>
                </Container>

                <WrapperVoteBlock>
                    <Container>
                        <div>
                            <span>Did you like this post?</span>
                            <Buttons>
                                <Button onClick={this.upVote}>
                                    <Icon name="thumbs up" />
                                </Button>
                                <DividerButton />
                                <Button onClick={this.downVote}>
                                    <Icon name="thumbs down" />
                                </Button>
                            </Buttons>
                            <span className="votes">{post.votes}</span>
                        </div>
                    </Container>
                </WrapperVoteBlock>

                <CommentList post_id={post.id} />
            </WrapperSinglePost>
        )
    }

    renderLoading() {
        return (
            <Container>
                Loading..
            </Container>
        )
    }

    renderHasDeleted() {
        return (<Container>It already deleted this post!</Container>)
    }

    renderNotFound() {
        return (
            <Container>
                Not Found
            </Container>
        )
    }

    getStatus() {
        const { hasDeleted, notFound, post } = this.props

        if (post) return 'SUCCESS'
        if (hasDeleted) return 'HAS-DELETED'
        if (notFound) return 'NOT-FOUND'
        return 'LOADING'
    }

    render() {
        const status = this.getStatus()

        return (
            <div>
                {status === 'LOADING'     && this.renderLoading()}
                {status === 'HAS-DELETED' && this.renderHasDeleted()}
                {status === 'NOT-FOUND'   && this.renderNotFound()}
                {status === 'SUCCESS'     && this.renderPost()}
            </div>
        )
    }
}

const mapState = (state, props) => {
    return {
        post: getCurrentPost(state),
        hasDeleted: state.posts.currentHasDeleted,
        notFound: state.posts.currentNotFound,
    }
}

const mapDispatch = (dispatch) => {
    return {
        setCurrentPost: (post_id) => dispatch(actions.posts.setCurrentPost(post_id)),
        savePost: (post) => dispatch(actions.posts.savePost(post)),
        deletePost: (post) => dispatch(actions.posts.deletePost(post)),
        votePost: (post, increment) => dispatch(actions.posts.votePost(post, increment))
    }
}

export default connect(mapState, mapDispatch)(SinglePost)
