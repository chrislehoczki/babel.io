import React from "react";

import * as loginActions from "../actions/loginActions";

export default class Featured extends React.Component {

    constructor() {
    	super();
    	this.state = {
    		userOK: false,
    		passwordOK: false
    	};
    	this.sendForm = this.sendForm.bind(this);
    	this.addUser = this.addUser.bind(this);
    	this.addPassword = this.addPassword.bind(this);
      this.navigateSignup = this.navigateSignup.bind(this);
    	
    };

    componentDidMount() {
      this.setState({facebookDirect: "/auth/facebook?redirect=" + window.location.pathname})
    };

    sendForm() {

      const component = this;
      //MAKE PARAMS HERE
      const url = "/auth/login"
      
      const username = this.state.user;
      const password = this.state.password;
      const params = "username=" + username + "&password=" + password;

  
      $.post(url, params, function(data) {

      	console.log(data);
          if (data.failure) {

            component.setState({errorMessage: data.message})
          }
          else {
            window.location.replace("/dashboard");
          }

      });

    };

    addUser(e) {
      const user = e.target.value;
      this.setState({user});

    };

    addPassword(e) {
      const password = e.target.value;
      this.setState({password})

    };

    navigateSignup() {
      console.log("calling navigate signup");
      console.log(this.props)
      this.props.history.push('/signup')
    };

    render() {
    	const inline = {
    		display: "inline",
    	}

    	const center = {
    		textAlign: "center"
    	}

      const image = {
        width: "100px",
        height: "100px"
      }

      const form = {
        textAlign: "center"
      }


       return (
          <div>
            <h2> Log In </h2>  
            <div className="signup-container"> 

              <a style={{color: "white"}} className="btn btn-social btn-facebook" href={this.state.facebookDirect}>
              <span className="fa fa-facebook"></span> Login with Facebook</a>

              <h4 className="form-element"> Or Login With Email </h4>

              <div className="form-group">
                <label>Email</label>
                <input onKeyUp={this.addUser} type="text" className="form-control" name="username"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input onKeyUp={this.addPassword} type="password" className="form-control" name="password"/>
              </div>
              <button type="submit" onClick={this.sendForm} className="btn btn-primary btn-block">Sign In</button>

              {this.state.errorMessage ? <p className="alert alert-warning"> {this.state.errorMessage} </p> : null }
              <p className="form-element"> Not got an account yet? </p> <button onClick={this.navigateSignup} className="show-signup btn btn-secondary"> Sign Up </button>
            </div>

          </div>
        );
  
  
      }
}
