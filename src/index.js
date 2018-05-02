// External Depedencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// Our Depedencies
import store from './store'
import App from './App';
import sycnData from './sycn'

// Style
import 'semantic-ui-css/semantic.min.css';
import './index.css'

sycnData.init(store)

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
    ), document.getElementById('root'));
