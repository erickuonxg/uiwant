var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require( __base+'/server/config/env.js' );

router.get('/', function(req, res, next) {

	jwt.verify( req.session.jwt,config.jwt.secret,function( err,decode ){
		if( err )
			return res.sendFile( __base+'build/landing.html' );
		else
			return res.redirect( '/dashboard' );
	} );

});

router.get('/dashboard', function(req, res, next) {

	jwt.verify( req.session.jwt,config.jwt.secret,function( err,decode ){
		if( !err )
			return res.sendFile( __base+'build/dashboard.html' );
		else
			return res.redirect( '/' );
	} );

});

module.exports = router;
