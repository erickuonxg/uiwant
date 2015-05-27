var mongoose = require( 'mongoose' ),
	config = require( __base + '/server/config/env.js' ),
	schema = require( __base + '/server/model/schema.js' );

module.exports = function(){
	
	mongoose.connection.once( 'open' , function(){
		schema();
		console.log( 'DB authtication successful and connected!' );
	});
	
	mongoose.connection.once( 'connected' , function(){
		console.log( 'DB connected , wait for authtication...' );
	})

	mongoose.connect( 'mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.host+'/'+config.db.name );
	
}