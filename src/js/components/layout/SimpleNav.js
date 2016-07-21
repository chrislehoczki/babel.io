import React from "react";
import { IndexLink, Link } from "react-router";

import loginStore from "../../stores/loginStore";


export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;

    const user = loginStore.getUser();
    console.log("loginstore user", user)

    const index = user ? "/dashboard" : "/";
    const indexName = user ? "Dashboard" : "Home";

    return (
     
           
           
       
        <div>
        <nav className='navbar navbar-default navbar-static-top'>
        <div className="container-fluid">
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            Babel.io
          </Link>
        </div>

        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><IndexLink to={index} activeClassName="active-link">{indexName}</IndexLink></li>
            <li>{!user ? <Link to="compare" activeClassName="active-link">Compare</Link> : null}</li>
            <li>{!user ? <Link to="quiz" activeClassName="active-link">Quiz</Link> : null}</li>
           
            <li>{!user ? <Link to="addlang" activeClassName="active-link">Add Language</Link> : null} </li>
           
            
          </ul>
          <ul class="nav navbar-nav navbar-right">
           <li>{!user ? <Link to="login" activeClassName="active-link">Login</Link> : null}</li>
             <li>{!user ? <Link to="signup" activeClassName="active-link">Signup</Link> : null}</li>
             <li>{user ? <a href="/logout" activeClassName="active-link">Logout</a> : null}</li>
          </ul>
        </div>
        </div>
      </nav>
      </div>
    
      

    );
  }
}
