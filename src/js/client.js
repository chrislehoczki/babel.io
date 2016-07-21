//require("../sass/nav.css")

import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
import routes from "./routes.js";

//THIS SYNCS SERVER AND CLIENT PROPS
import * as todoActions from "./actions/todoActions.js";
import todoStore from "./stores/todoStore.js"

import * as loginActions from "./actions/loginActions.js";
import loginStore from "./stores/loginStore.js";

let initialState = JSON.parse(document.getElementById("initialState").innerHTML);
let user = document.getElementById("user") ? JSON.parse(document.getElementById("user").innerHTML) : null;

todoActions.initiateTodos(initialState);
loginActions.initiateUser(user);


let history = createBrowserHistory();


//RENDER APP IN HTML
const app = document.getElementById('app');
ReactDOM.render(<Router history={history}>{routes}</Router>, app);
