// Imports
var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var keys = require('./Keys');

//Specify port
const port = 3000

//Create express app
var app = express(); 

// mysql connection config
let connection = mysql.createConnection({
		host:  keys.DATABASE_URL,
		user: keys.PRIVATE_DATABASE_USER,
		database: keys.PRIVATE_DATABASE_NAME,
		password: keys.PRIVATE_DATABASE_PASSWORD
});


//Initalize Server-side RSA (required for generating login cookies)
const NodeRSA = require('node-rsa');
const key = new NodeRSA();

//Set padding pkcs1
const options = {
  encryptionScheme: {
    scheme:'pkcs1'
  }
};
key.setOptions(options);

// Static Files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Serve html
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/html/title.html')
})

// Connect to DB - alternate handling?
	connection.connect((err) => {
	 if(err){
		console.log('Error connecting to Db');
		return;
	 }
	  console.log('Connection established');
});

//Query database to determine if user exists, respond 0 for no 1 for yes.
app.post('/userExists', function(req, res){
	var obj = {response:0};
	//Query server for existence of user
	console.log(req.body.user);
	var edituserSQL =  "CALL userExists(?)";
	connection.query(edituserSQL, [req.body.user], function(ERROR,RESULT) {
		if (ERROR) { 
			console.log("SQL error"); 
		} else {
			let result = JSON.parse(JSON.stringify(RESULT[0][0]));
			obj.response = result.existing;
			res.send(obj);
		}
	});
});

//Fetch cookie from sever and encrypt with user's public key.
//This is the request to login
app.post('/fetchCookie', function(req, res){
	//Fetch user's public key and then user's cookie. This should be combined into 1 call for effeciency later.
	var obj = {response:''};
	var edituserSQL =  "CALL getPublic(?)";
	connection.query(edituserSQL, [req.body.user], function(ERROR,results,fields) {
		if (ERROR) { 
			console.log("SQL error"); 
		} else {
			let result = JSON.parse(JSON.stringify(results[0][0]));
			let pubKey=result.pubKey;
			edituserSQL =  "CALL fetchCookie(?)";
			connection.query(edituserSQL, [req.body.user], function(ERROR,results,fields) {
				if (ERROR) { 
					console.log("SQL error"); 
				} else {
					result = JSON.parse(JSON.stringify(results[0][0]));
					console.log("FETCH: "+result.cookie);
					var buffer = Buffer.from(result.cookie);
						//Activate the public key
						key.importKey({
							n: Buffer.from(pubKey, 'hex'),
							e: 65537,
						}, 'components-public');
					obj.response = key.encrypt(buffer,'buffer', 'hex').toString('hex');;
					res.send(obj);
				}
			});
		}
	});
});





//Attempt to add a new username and public key to the server manifest
app.post('/cheapCreate', function(req, res){
	var obj = {response:0};
	//Activate the public key
	key.importKey({
		n: Buffer.from(req.body.key, 'hex'),
		e: 65537,
	}, 'components-public');
	var token="";
	//Create user's cookie
	require('crypto').randomBytes(48, function(err, buffer) {
		token = buffer.toString('hex');
		console.log("Generating user "+req.body.user+" cookie: "+token);
		//Query server for existence of user
		console.log(req.body.user);
		var edituserSQL =  "CALL cheapUser(?,?,?)";
		connection.query(edituserSQL, [req.body.user,req.body.key,token], function(ERROR,RESULT) {
			if (ERROR) {
				console.log("SQL error");
				res.send(obj);
			} else {
				console.log("User Created");
				obj.response = 1;
				res.send(obj);
			}
		});
	});	
});


//Takes a username and a cookie, validates login, queries server for all messages, and returns to user. 
app.post('/fetchMessages', function(req, res){
	var obj = {response:0};
	
	
	
	console.log('body: ' + JSON.stringify(req.body));
	
	res.send(obj);
});

//Takes two usernames and a cookie as well as two messages, validates login, posts messages. Ideally, one message could be used with two RSA AES-encrypted keys attached, writing this down this would be much simpler and I will try to rework the messages to do this.
app.post('/sendMessages', function(req, res){
	var obj = {response:0};
	
	
	
	console.log('body: ' + JSON.stringify(req.body));
	
	res.send(obj);
});





//Takes two usernames and a cookie, validates login, orders server to delete all messages between the 2. Unimplemented on database currently, ideally could assign messages id's and delete specific ones.
app.post('/nixConversation', function(req, res){
	var obj = {response:0};
	
	//todo
	
	res.send(obj);
});
app.post('/nixMessage', function(req, res){
	var obj = {response:0};
	
	//todo - requires messages with id
	
	res.send(obj);
});


//OLD VERSION OF CREATE USER
app.post('/userCreate', function(req, res){
	var obj = {response:0};
	//Query server for existence of user
	 console.log(req.body.user);
	var edituserSQL =  "CALL publicUser(?,?)";
        connection.query(edituserSQL, [req.body.user,req.body.key], function(ERROR,RESULT) {
                if (ERROR) {
					console.log("SQL error");
					res.send(obj);
                } else {
                    console.log("userCreate result");
                    obj.response = 1;
					res.send(obj);
                }
            });
});





//Launch server
app.listen(port, () => console.info(`Server running on port ${port}`))