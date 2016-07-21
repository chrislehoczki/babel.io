# Babel.io
Flux Boilerplate Web App to Compare Different Languages

This project brings together React, React-Router, Flux Framework, and Social Login with Webpack as a build tool.

To use.
1. Clone project.
2. Create a ".env" file that corresponds to the exampleEnv.env file in the project directory.
3. NPM install.


#For Dev

These two commands need to be run

NPM run dev - starts webpack dev server
NPM run watch - starts nodemon

#For Prod
NPM run build - this will build your js file into a nice small package.
In index.html change the source of js from dev to production - you can see this commented in html code.

NPM run start - this will start up the server with forever to keep it running in case of anything going horribly wrong.

#TO FIX

Webpack config file not currently importing sass correctly and building to static css file - for the life of me I cant work out how to modify config file for this to work!!!


