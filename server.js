// Imports
var express = require('express');
var app = express(); 
var bodyParser = require('body-parser')
var keys = require('./Keys');
//Specify port
const port = 3000

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


// Handle posts


//Query database to determine if user exists, respond 0 for no 1 for yes.
app.post('/userExists', function(req, res){
	var obj = {response:0};
	
	//Query server for existence of user
	
	console.log('body: ' + JSON.stringify(req.body));
	
	res.send(obj);
});

//Create cookie for user
app.post('/userLogin', function(req, res){
	var obj = {cookie:0};
	
	//Ideally, this step does the following: Generates a cookie, takes the public cookie of the user and encrypts the cookie, then sends it back.
	//For now, it just assumes their login is correct and gives them an unencrypted cookie, this isn't as dangerous as you might think because 
	//if you have the wrong password, you will just get encrypted junk.
	
	console.log('body: ' + JSON.stringify(req.body));
	
	res.send(obj);
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





//Launch server
app.listen(port, () => console.info(`App listening on port ${port}`))