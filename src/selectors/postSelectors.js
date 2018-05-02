import { createSelector } from 'reselect'

// const postsSelector    = state => state.posts
const allPostsSelector = state => state.posts.all
const currentPostSelector = state => state.posts.current
const filterBySelector = state => state.posts.filterBy
const sortBySelector = state => state.posts.sortBy
const allCommentsSelector = state => state.comments.all

const getPosts = createSelector(
    [filterBySelector, sortBySelector, allPostsSelector, allCommentsSelector],
    (filterBy, sortBy, all_posts, all_comments) => {
        let posts = all_posts || {}

        // let data = objToArray(items)
        posts = Object.keys(posts).map(key => {
            return all_posts[key];
        });

        // FilterBy
        if (filterBy.value !== 'all' && filterBy.value !== undefined && filterBy.value !== '') {
            posts = posts.filter(elem => elem[filterBy.field] === filterBy.value)
        }

        // SortBy
        const sortByField = sortBy.field
        const orderByField = sortBy.order === 'desc' ? 'desc' : 'asc'
        posts = posts.sort((a, b) => {
            if (a[sortByField] === b[sortByField]) {
                return 0
            } else {
                if (orderByField === 'asc') {
                    return (a[sortByField] < b[sortByField]) ? -1 : 1
                } else {
                    return (a[sortByField] > b[sortByField]) ? -1 : 1
                }
            }
        });

        return posts
    }
)

const getCurrentPost = createSelector(
    [allPostsSelector, currentPostSelector],
    (all, current_post) => {
        return current_post && all ? all[current_post] : undefined
    }
)

export {
    getPosts,
    getCurrentPost
}
