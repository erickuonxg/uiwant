var express_jwt = require( 'express-jwt' );
var config = require( __base + '/server/config/env.js' ),
	pageRouter = require( __base + '/routes/module/page.js' ),
	apiRouter = require( __base + '/routes/module/api.js' ),
	authRouter = require( __base + '/routes/module/auth.js' );
	
module.exports = function( app ){
	
	app.use( '/' , pageRouter );
	app.use( '/api' , express_jwt( {
		secret:config.jwt.secret,
		getToken : function( req ){ 
			return req.session.jwt;
		} } 
	) );
	app.use( '/api' , apiRouter );
	app.use( '/auth' , authRouter );
	
}

