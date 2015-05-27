var jwt = require( 'jsonwebtoken' );
var config = require( __base + '/server/config/env.js' ),
	gconfig = config.googleapi,
	request = require( 'request' ),
	google = require( 'googleapis' ),
	OAuth2 = google.auth.OAuth2,
	oauth2Client = new OAuth2( gconfig.client_id , gconfig.client_secret , gconfig.redirect_url ); 

module.exports = function( router ){
	router.get('/login_with_google', function(req, res, next) {
		var _scope = [ 
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		];
		var _url = oauth2Client.generateAuthUrl({
			access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
			scope: _scope
		});
		res.redirect( _url );
	});

	router.get( '/oauth2callback' , function( req,res,next ){
		oauth2Client.getToken( req.query.code , function( error,tokens ){
			if( !error ){
				req.session.gtoken = tokens.access_token;
				var _roption = { 
					url:'https://www.googleapis.com/oauth2/v2/userinfo' , 
					headers : { 'Authorization' : 'Bearer '+req.session.gtoken }
				}
				request.get( _roption , function( error,response,body ){
					var _userInfo = JSON.parse(body);
					if(config.access_account.filter( function(mail){ if(mail==_userInfo.email) return mail; } ).length==1) {
						req.session.jwt = jwt.sign( _userInfo , config.jwt.secret , {expiresInMinutes:60*5} );
						return res.redirect( '/dashboard' );
					}else return res.redirect( '/' );
				} );
			}
		} );
	});
}




