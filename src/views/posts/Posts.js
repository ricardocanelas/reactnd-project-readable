// External Depedencies
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Segment, Item } from 'semantic-ui-react'

// Our Depedencies
import history from '../../history'
import actions from '../../actions'
import PostItem from './../../components/posts/PostItem'
import FilterBy from '../../components/posts/FilterBy'
import SortBy from '../../components/posts/SortBy'
import HeaderPage from '../../components/ui/HeaderPage'
import { getPosts } from '../../selectors/postSelectors'
import { getCategories } from '../../selectors/categorySelectors'

class Posts extends Component {

    componentDidMount() {
        const filterValue = this.props.match.params.hasOwnProperty('category_id') ? this.props.match.params.category_id : 'all'
        this.props.changeFilterBy('category', filterValue)
    }

    handleChangeFilterBy = (value) => {
        this.props.changeFilterBy('category', value)
        history.push(`/category/${value}`)
    }

    handleChangeSortBy = (value) => {
        this.props.changeSortBy(value.field, value.order)
    }

    render() {
        const { posts, categories, sortBy, filterBy, match} = this.props

        return (
            <Container>
                <HeaderPage>
                    <h1>Posts</h1>
                    <h3>/ {filterBy.value}</h3>
                    <div className="right">
                        <div className="sortby">
                            sort by: {sortBy.field} {sortBy.order}
                        </div>
                    </div>
                </HeaderPage>

                <Grid columns="equal">
                    <Grid.Column width={3}>
                        {/* SIDE BAR  */}
                        <Segment.Group>
                            <Segment>
                                <Item>
                                    <Item.Header as="b">Categories</Item.Header>
                                    <Item.Content>
                                        <Item.Description>
                                            <FilterBy
                                                onChange={this.handleChangeFilterBy}
                                                selected={match.params.category_id ? match.params.category_id : filterBy.value}
                                                categories={categories} />
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Segment>
                            <Segment>
                                <Item>
                                    <Item.Header as="b">Sort</Item.Header>
                                    <Item.Content>
                                        <SortBy
                                            onChange={this.handleChangeSortBy}
                                            selected={{ field: sortBy.field, order: sortBy.order }} />
                                    </Item.Content>
                                </Item>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>

                    <Grid.Column>
                        <div className="items-container">
                            <Grid columns="equal">
                                {posts.length > 0 && posts.map(post => (
                                    <PostItem key={post.id} post={post} />
                                ))}
                                {posts.length === 0 && (
                                    <span style={{ marginTop: '16px' }}>
                                        {`Sorry! There are no results that match with the category '${filterBy.value}'.`}
                                    </span>
                                )}
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}


const mapState = (state, props) => {
    return {
        posts: getPosts(state),
        sortBy: state.posts.sortBy,
        filterBy: state.posts.filterBy,
        categories: getCategories(state)
    }
}

const mapDispatch = (dispatch) => {
    return {
        changeFilterBy: (field, value) => dispatch(actions.posts.changeFilter(field, value)),
        changeSortBy: (field, order) => dispatch(actions.posts.changeSort(field, order))
    }
}

export default connect(mapState, mapDispatch)(Posts)
