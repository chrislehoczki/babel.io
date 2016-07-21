'use strict';

import passport from "passport";
//IMPORT SCHEMA
const Users = require("../models/users.js");

module.exports = function (app, passport) {

	//LOGIN


	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect("/");
	};


	const fbookScope = [
		"public_profile",
		"email"
	];

	//FBOOK LOGIN
	app.get('/auth/facebook', function(req, res, next) {

		req.session.redirect = req.query.redirect;
  		next();

	},passport.authenticate('facebook', { scope: fbookScope }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect : '/signinfailure'}),
        	function(req, res) {
	    // Successful authentication, redirect home.
	    	//RETAIN REDIRECT IF WANT TO ADD IN A STATIC REDIRECT ROUTE FOR USERS TO RETURN TO SAME PAGE
	    	res.redirect(/*req.session.redirect || */"/dashboard");
    });



	//LOCAL

    app.post('/auth/signup', 
    	passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/loginfailure'
    }));
    
     // process the login form
    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect : '/success', // redirect to the secure profile section
        failureRedirect : '/signinfailure'
    }));

    
  	//SIGN IN FAILURES

  	app.route("/loginfailure")
    	.get(function (req, res) {
    		res.send({message: "There was an error when trying to add you as a user, perhaps you left a field blank?", failure: true})
    	});
    app.route("/signinfailure")
    	.get(function (req, res) {
    		res.send({message: "There was an error logging you in, please check your email and password or your social login information.", failure: true})
    	});

	app.route("/success")
		.get(function (req, res) {
			res.send({message: "Success", failure: false})
		});


    //LOGOUT


    app.route('/logout')
		.get(function (req, res) {
			var url = req.query.redirect;
			req.logout();
			
			res.redirect(url || "/");
		});




	//REST API
	app.route("/api/todo/:id?")
		.get(isLoggedIn, function(req, res) {

		const query = {_id: req.user._id};

		Users
			.findOne(query, {todos: 1, _id: 0})
			.exec(function (err, result) {
				if (err) { 
						res.send({err:err});
					}
					else {
						res.send(result.todos);
				};

			});

		})
		.post(isLoggedIn, function(req, res) {

			console.log("AUTHENTICATED", req.isAuthenticated())
			const _id = req.user._id;
			const title = req.body.title;

			const id = Date.now();
			const query = {_id: _id};

			const todo = {title: title, complete: false, id: id};

			Users
			.findOneAndUpdate(query, { $push: {todos: todo} }, {"new": true})
			.exec(function (err, result) {
				if (err) { 
						res.send({err: err})
					}
					else {
						res.send(result.todos[result.todos.length-1]);
				}

			});


		}).delete(isLoggedIn, function(req, res) {
			console.log(req.params)
			const todoId = req.params.id;
			const _id = req.user._id;
			const query = {_id: _id}

			console.log(todoId)
			Users
			.findOneAndUpdate(query, { $pull: {"todos": {id: +todoId} } }, {"new": true})
			.exec(function (err, result) {
				if (err) { 
						res.send({err: err})
					}
					else {
						console.log(result.todos)
						res.send(result.todos);
				}

			});

		}).put(isLoggedIn, function(req, res) {

			const _id = req.user.id;
			let {id, status} = req.body;
			status = JSON.parse(status);

			const query = {_id: _id, "todos.id": +id};
			console.log(status)

			console.log(query)

			Users
			.findOneAndUpdate(query, { $set: {"todos.$.complete" : status}}, {"new": true})
			.exec(function (err, result) {
				if (err) { 
						res.send({err: err})
					}
					else {
						console.log("result from db", result.todos)
						res.send(result.todos);
				}

			});

		});


	app.route('/checkuser/:email')
		.get(function(req, res) {
			const email = req.params.email;
			
			let message;

			Users.find({"local.email": email}, { "local.email": 1, _id: 0 })
				.exec(function (err, result) {
					if (err) { throw err; }
					console.log(result)
					console.log(result.length)
					if (result.length === 0) {
						message = "Your email is available."
						let obj = {}
						obj.message = message
						obj.alert = "success"
						res.json(obj)
					}
					else {
						message = "That email has already been registered."
							let obj = {}
							obj.message = message
							obj.alert = "warning"
					
							res.json(obj)

					}
				});
		});

};