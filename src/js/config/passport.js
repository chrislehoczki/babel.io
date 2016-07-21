'use strict';

//STRATEGIES

const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/users';
import configAuth from './auth';


module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
  
	
	   //LOCAL
    //SIGNUPS STRATEGY
 passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false/*, req.flash('signupMessage', 'That username is already taken.')*/)
            } else {

                // if there is no user with that email
                // create the user
                let newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.firstName = req.body.firstName;
                newUser.local.profileImg = "/public/images/profile.png"
                // save the user
                newUser.tips = [];
                newUser.descriptions = [];
                newUser.guideCities = [];

                /*
                //ADD IN OTHER FIELDS FOR LATER
                newUser.facebook = {};
                newUser.strava = {};
                */
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false/*, req.flash('loginMessage', 'No user found.')*/); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false/*, req.flash('loginMessage', 'Oops! Wrong password.')*/); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));




 passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(large)']
    },

    // facebook will send back the token and profile
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

          

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    let newUser = new User();
                   
                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.firstName  = profile._json.first_name; // look at the passport user profile to see how names are returned
                    newUser.facebook.secondName  = profile._json.last_name;
                    newUser.facebook.picture = profile.photos[0].value;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.facebook.profileImg = profile.photos[0].value;

                     // facebook can return multiple emails so we'll take the first
                    newUser.tips = [];
                    newUser.descriptions = [];
                    newUser.guideCities = [];

                    /*
                    //ADD OTHER FIELDS FOR LATER
                    newUser.strava = {};
                    newUser.local = {};
                    */
                
   
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));



	
	
};
