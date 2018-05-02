// External Depedencies
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Our Reducers
import statusReducer from './reducers/statusReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
import categoryReducer from './reducers/categoryReducer'
import postReducer from './reducers/postReducer'
import notificationReducer from './reducers/notificationReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    status: statusReducer,
    user: userReducer,
    categories: categoryReducer,
    comments: commentReducer,
    posts: postReducer,
    notifications: notificationReducer,
})

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store