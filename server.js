

// ES6/JSX COMPILER
require('babel-core/register')({
    presets: ['es2015', 'react']
});

//ENV VARIABLES
require('dotenv').load();

//REACT
const React = require("react");
const ReactDOM = require('react-dom/server');
const Router = require('react-router');

//NPM MODULES
const passport = require("passport");
const session = require('express-session');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser   = require('body-parser');

//LOCAL MODULES
const reactRoutes = require('./src/js/routes');
const routes = require("./src/js/routes/index.js");
require('./src/js/config/passport')(passport);


//APP SETUP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set('views', __dirname + '/dist/views');

app.use('/js', express.static(process.cwd() + '/dist/js'));
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use('/uploads', express.static(process.cwd() + '/uploads'));


//MONGOOSE CONNECT
mongoose.connect(process.env.MONGO_URI);


//SESSION SETUP
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 1 * 24 * 60 * 60, autoRemove: 'interval', autoRemoveInterval: 10, touchAfter: 24 * 3600 })
}));

app.use(passport.initialize());
app.use(passport.session());



//IMPORT ROUTES
routes(app, passport);


//THESE ARE OUR MODELS, ACTIONS, AND STORES FOR RENDERING DATA SERVER SIDE
const Users = require("./src/js/models/users.js");

const todoActions = require("./src/js/actions/todoActions.js");
const todoStore = require("./src/js/stores/todoStore.js");

const loginActions = require("./src/js/actions/loginActions.js");
const loginStore = require("./src/js/stores/loginStore.js");


//REACT ROUTER ROUTES
app.use(function(req, res) {
  Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      

      //IF USER LOGGED IN - RENDER USER DATA
      if (req.user) {
            
            const query = {_id: req.user._id};
            Users.find(query, {todos: 1, _id: 0}).exec(function(err, result) {
              if (err) {
                res.send({err: err});
              }
              else {
                const todos = result[0].todos;
                
                //ADD TODOS TO SERVER STORE
                todoActions.initiateTodos(todos);
                
                //ADD USER TO STORE ON SERVER FOR RENDERING
                let user = req.user;

                loginActions.initiateUser(user);
                
                //STRINGIFY TO SEND TO CLIENT
                user = JSON.stringify(user);
                
                console.log("SERVER RENDERING BEING CALLED", loginStore.default.getUser())
                //RENDER DATA TO STRING
                const html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
                const initialState = JSON.stringify(todos);
                
                //SEND INDEX WITH RENDERED REACT AND PROPS
                res.status(200).render("index.ejs", {html, initialState, user});
              }
            });
      }

      else {

          //CLEAR OUT ANY USER IN SERVER SIDE STORE
          loginActions.removeUser();

          //PROPS TO BE RENDERED
          const user = JSON.stringify(null);
          const initialState = JSON.stringify([]);

          //RENDER REACT
          const html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));

          //SEND IT ALL DOWN
          res.status(200).render("index.ejs", {html, initialState, user});
      }
     
  
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});