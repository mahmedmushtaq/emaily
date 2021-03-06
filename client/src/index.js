import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import {Provider} from "react-redux";
import {createStore,applyMiddleware} from "redux";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";
import axios from "axios";
window.axios = axios;

const store = createStore(reducer,{},applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
   document.getElementById('root')
);




