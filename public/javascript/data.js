
var server_url="http://localhost:3000"; // MAKE SURE THIS ENDPOINT IS CORRECT!!
var debug=1; //0 - disabled; 1 - enabled (print to console)


//Site data
var username="";
var user_password="";
var stage=0;
var padlock=0;
var padlockString="";
var friend="";
var createFlag=0;
var contacts=[];

//RSA key (stored in javascript runtime)
var rsa;

//Custom configuration variables
var key_size=2048;//2048,3072,4096

//Experimental cookie system
var REALcookie="";