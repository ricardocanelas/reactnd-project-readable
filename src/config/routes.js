import PostsView from '../views/posts/Posts'
import CreatePostView from '../views/posts/CreatePost'
import EditPostView from '../views/posts/EditPost'
import SinglePostView from '../views/posts/SinglePost'

export default [
    { path: "/", component: PostsView, exact: true },
    { path: "/category/:category_id", component: PostsView },
    { path: "/new-post", component: CreatePostView },
    { path: "/posts/:post_id/edit", component: EditPostView },
    { path: "/posts/:post_id", component: SinglePostView },
];