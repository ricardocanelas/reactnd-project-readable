// External Depedencies
import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Icon, Card, Button } from 'semantic-ui-react'

// Our Depedencies
import actions from '../../actions'
import history from '../../history'
import PostModel from '../../models/PostModel'
import { truncate } from '../../utils/helpers'
import { getTotalCommentsByPostId } from '../../selectors/commentSelectors'

// Styled
const WrapperItem = styled(Grid.Column)`&&& {
.extra.content { padding: 0 1px 1px 1px }
}`
const Title = styled.a`
font-weight: bold;
color: #ff5f23;
font-size: 15px;
:hover{
    color: #f54b0c;
}
`
const Details = styled.div`
font-size: 11px;
color: #757575;
`
const Detail = styled.div`
display: inline;
margin-right: 6px;
`
const Excerpt = styled.div`
margin-top: 5px;
font-size: 13px;
line-height: 1.6em;
`
const VoteButton = styled(Button)`&&& {
padding: 10px 6px 10px 12px;
margin: 0;
height: 100%;
border-radius: 0;
box-shadow: none;
background-color: white;
:hover{
    background: whitesmoke;
}
}`
const SmallButton = styled(Button).attrs({ size: 'mini' })`&&& {
padding: 10px 10px 10px 10px;
margin: 0;
height: 100%;
border-radius: 0;
box-shadow: none;
background-color: white;
:hover{
    background: whitesmoke;
}
}`
const VoteLabel = styled.span`
font-size: 11px;
`

const PostItem = ({ post, deletePost, votePost, comments_count }) => {

    post = new PostModel(post)

    const handleDeletePost = () => {
        deletePost(post)
    }

    const handleGotoViewPost = () => {
        history.push(`/posts/${post.id}`)
    }

    const handleGotoEditPost = () => {
        history.push(`/posts/${post.id}/edit`)
    }

    const handleUpVote = () => {
        votePost(post, true)
    }

    const handleDownVote = () => {
        votePost(post, false)
    }

    return (
        <WrapperItem width={8}>
            <Card fluid>
                <Card.Content>
                    <div className="pull-right">
                        <Icon name="comment outline" /> {comments_count}
                    </div>
                    <Title onClick={handleGotoViewPost}>{post.title}</Title>
                    <Details>
                        <Detail>Category: {post.category},</Detail>
                        <Detail>by {post.author},</Detail>
                        <Detail>{post.date}</Detail>
                    </Details>
                    <Excerpt>
                        {truncate(post.body, 200)}
                    </Excerpt>
                </Card.Content>
                <Card.Content extra>
                    <Grid>
                        <Grid.Column width={8}>
                            <VoteButton onClick={handleUpVote}><Icon name="thumbs up" /></VoteButton>
                            <VoteButton onClick={handleDownVote}><Icon name="thumbs down" /></VoteButton>
                            <VoteLabel>{post.votes}</VoteLabel>
                        </Grid.Column>

                        <Grid.Column width={8} style={{ textAlign: "right" }}>
                            <SmallButton onClick={handleGotoViewPost}>view</SmallButton>
                            <SmallButton onClick={handleGotoEditPost}>edit</SmallButton>
                            <SmallButton onClick={handleDeletePost}>remove</SmallButton>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        </WrapperItem>
    )
}

// PropTypes
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    comments_count: PropTypes.number.isRequired,
}

const mapState = (state, props) => {
    return {
        comments_count: getTotalCommentsByPostId(props.post.id)(state)
    }
}

const mapDispatch = (dispatch) => {
    return {
        deletePost: (post) => dispatch(actions.posts.deletePost(post)),
        votePost: (post, increment) => dispatch(actions.posts.votePost(post, increment))
    }
}

export default connect(mapState, mapDispatch)(PostItem)
