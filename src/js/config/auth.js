'use strict';

module.exports = {
	
	'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_KEY, // your App ID
        'clientSecret'  : process.env.FACEBOOK_SECRET, // your App Secret
        'callbackURL'   : process.env.APP_URL + "auth/facebook/callback"
    }

};
