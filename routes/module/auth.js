var express = require('express');
var router = express.Router();
var jwt = require( 'jsonwebtoken' );
var config = require( __base + '/server/config/env.js' );

// auth router start
var google_auth = require( __base + '/routes/module/auth/google.js' )( router );
var facebook_auth = require( __base + '/routes/module/auth/facebook.js' )( router );
var internal_auth = require( __base + '/routes/module/auth/internal.js' )( router );
// auth router end

router.get( '/logout' , function( req,res,next ){
	req.session.jwt = null;
	res.redirect( '/' );
});

module.exports = router;