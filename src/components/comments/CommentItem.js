// External Depedencies
import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Segment, Label, Icon } from 'semantic-ui-react'

// Our Depedecies
import actions from '../../actions'
import CommentModel from '../../models/CommentModel'
import CommentForm from './CommentForm'

// Style
export const Details = styled.div`
font-size: 12px;
color: #757575;
`
export const CommentText = styled.div`
font-size: 13px;
`
export const MiniButton = styled(Button)`
margin:0 !important;
padding: 7px 0.5em 7px 1.0em !important;
border-radius:0 !important;
`
export const VoteLabel = styled(Label)`
font-size:11px !important;
margin: 0 !important;
border-radius: 0 !important;
border-left: 0 !important;
border-top: 0 !important;
`
export const GroupMiniButtons = styled(Button.Group)``
export const Attached = styled.div`
position: absolute;
right: -1px;
top: -1px;
`
export const WrapperComment = styled(Segment) `
position: relative;
padding: 12px;
background-color: yellow;
`


class CommentItem extends Component {

    state = {
        mode: 'view'
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextState.mode === this.state.mode) return false
        // if (nextProps.data.updated_at === this.props.data.updated_at) return false
        return true
    }

    handleChangeMode = (mode) => {
        this.setState({mode})
    }

    handleView = () => {
        this.handleChangeMode('view')
    }

    handleEdit = () => {
        this.handleChangeMode('edit')
    }

    handleDelete = () => {
        this.handleChangeMode('deleting')
        this.props.deleteComment(this.props.data)
    }

    handleUpVote = () => {
        this.props.voteComment(this.props.data, true)
    }

    handleDownVote = () => {
        this.props.voteComment(this.props.data, false)
    }

    submit = (values) => {
        this.handleChangeMode('saving')
        this.props.saveComment(values, this.props.post_id).then(response => {
                this.handleChangeMode('view')
            })
    }

    submitted = () => {
        this.handleChangeMode('view')
    }

    cancel = () => {
        this.setState({mode:'view'})
    }

    render() {
        const comment = new CommentModel(this.props.data)

        return (
            <WrapperComment>

                {this.state.mode === 'view' && (
                    <div>
                        <Attached>
                            <GroupMiniButtons>
                                <MiniButton onClick={this.handleEdit} alt="edit">
                                    <Icon size="small" name="edit" />
                                </MiniButton>
                                <MiniButton onClick={this.handleDelete} alt="delete">
                                    <Icon size="small" name="delete" />
                                </MiniButton>
                                <MiniButton onClick={this.handleUpVote}>
                                    <Icon size="small" name="thumbs up" />
                                </MiniButton>
                                <MiniButton onClick={this.handleDownVote}>
                                    <Icon size="small" name="thumbs down" />
                                </MiniButton>
                            </GroupMiniButtons>
                            <VoteLabel basic>
                                {comment.votes}
                            </VoteLabel>
                        </Attached>

                        <Details>
                            By {comment.author}, {comment.date}
                        </Details>

                        <CommentText>
                            {comment.comment}
                        </CommentText>
                    </div>
                )}

                {this.state.mode === 'edit' && (
                    <div>
                        <CommentForm
                            className="comment-form"
                            post_id={this.props.post_id}
                            initialValues={comment}
                            onSubmitSuccess={this.submitted}
                            onCancel={this.cancel}
                        />
                    </div>
                )}

                {this.state.mode === 'deleting' && (
                    <div>
                        Removendo comment of the {comment.author}
                    </div>
                )}

                {this.state.mode === 'saving' && (
                    <div>
                        Salvando comment of the {comment.author}
                    </div>
                )}

            </WrapperComment>
        )
    }
}

// PropTypes
CommentItem.propTypes = {
    data: PropTypes.object.isRequired,
    post_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

const mapDispatch = (dispatch) => {
    return {
        saveComment: (comment) => dispatch(actions.comments.saveComment(comment)),
        deleteComment: (comment) => dispatch(actions.comments.deleteComment(comment)),
        voteComment: (comment, increment) => dispatch(actions.comments.voteComment(comment, increment)),
    }
}


export default connect(null, mapDispatch)(CommentItem)
