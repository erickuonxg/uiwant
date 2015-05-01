
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/member';
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

}


module.exports = function( router ){

	// PG Database
	router.get( '/member/create' , function( req,res,next ){
        	var client = new pg.Client(connectionString);
        	client.connect();
        	var query = client.query('CREATE TABLE members(id SERIAL PRIMARY KEY, fb_id VARCHAR(100) not null, password VARCHAR(100) not null, deposit INTEGER DEFAULT 0);')
        	query.on('end', function() {
        	client.end();
        	});
	})

	router.get( '/member/insert' , function( req,res,next ){
	        var results = [];
	        var client = new pg.Client(connectionString);
	        client.connect();
		var fb_id = "jimmyko";
		var password = "1234";
		var deposit = 10000;
		var reg_time = getDateTime(); 
	
	        var data = {fb_id: fb_id, password: password, deposit: deposit, reg_time: reg_time};
	        client.query("INSERT INTO members(fb_id, password, deposit, reg_time) VALUES ($1, $2, $3, $4)", [data.fb_id, data.password, data.deposit, data.reg_time]);
	
	        // SQL Query > Select Data
	        var query = client.query("SELECT * FROM members ORDER BY id ASC");
	
	        // Stream results back one row at a time
	        query.on('row', function(row) {
	            results.push(row);
	        });
	
	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	            client.end();
	            return res.send(results);
	        });
	
		//@@! err is undefined
	        // Handle Errors  
	        //if(err) {
	        //  console.log(err);
	        //}
	})

	router.post( '/login_with_internal' , function( req,res,next ){
		var user = "jimmyko";
		var pwd = "1234";

		
	} );

	router.post( '/check/mail' , function( req,res,next ){

	} );

	router.post( '/check/id' , function( req,res,next ){

	} );

}
