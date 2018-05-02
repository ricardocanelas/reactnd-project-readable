// External Depedencies
import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

// Our Depedencies
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { getCommentsByPostId } from '../../selectors/commentSelectors'

// Styled
export const WrapperComments = styled.div`
background: rgb(245, 245, 245);
padding: 20px 0;
hr.divider {
    margin:42px 0 36px 0;
    border-top: 1px solid rgb(228, 228, 228);
    border-bottom: 1px solid white;
}
`

const CommentList = (props) => {

    const comments = props.comments

    const renderItems = () => {
        return comments.map(comment => (
            <CommentItem key={comment.id} data={comment} post_id={props.post_id} />
        ))
    }

    return (
        <WrapperComments>
            <Container>
                <h3>Comments <small>(total: { comments.length })</ small></h3>
                {comments.length > 0 ? renderItems() : "Be the first to write a comment"}

                <hr className="divider" />

                <h3>Leave a Comment</h3>
                <CommentForm className="comment-form" post_id={props.post_id}/>
            </Container>
        </WrapperComments>
    )
}

// PropTypes
CommentList.propTypes = {
    post_id: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]).isRequired,
}

const mapState = (state, props) => {
    return {
        comments: getCommentsByPostId(props.post_id)(state)
    }
}

export default connect(mapState, null)(CommentList)