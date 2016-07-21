import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compare from "./pages/Compare";
import Quiz from "./pages/Quiz";
import AddLang from "./pages/AddLang";

import loginStore from "./stores/loginStore";

function requireAuth(nextState, replaceState) {

	const user = loginStore.getUser();
	console.log("REQUIRE AUTH USER", user)
    if (!user) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
}


export default (
  	<Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
     	<Route path="dashboard" component={Dashboard}></Route>
     	<Route path="login" component={Login}></Route>
     	<Route path="signup" component={Signup}></Route>
      <Route path="compare" component={Compare}></Route>
      <Route path="quiz" component={Quiz}></Route>
      <Route path="addlang" component={AddLang}></Route>
   	</Route>
);
