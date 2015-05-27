var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var config = require( __base + '/server/config/env.js' );

router.get('/getAccountInfo', function(req, res, next) {
	return res.send( req.user );
});

module.exports = router;
