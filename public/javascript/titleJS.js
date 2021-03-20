
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
var encookie="";
//Custom configuration variables
var key_size=2048;//2048,3072,4096

var server_url="http://localhost:3000"; // MAKE SURE THIS ENDPOINT IS CORRECT!!

var debug=1; //0 - disabled; 1 - enabled (print to console)

//Experimental cookie system
var REALcookie="";



function login(){
	
	//Set username
	if ($('#username').val().length>30){
		$("#usernameError").show();
		return;
	}else{
		$("#usernameShow").hide();
	}
	
	
	username=$('#username').val();
	$('#server-stat').text("Querying Server");
	//Pretty animations
	$("#login").children().hide(); 
	$("#login").addClass("collapse");
	$('#spacer').addClass("collapse");  
	setTimeout(function(){
		$('#title').removeClass("titleCollapse"); 
		$('#title').addClass("titleExpand");  
	}, 500);
	setTimeout(function(){
		$('#spacer-2').addClass("grow-spacer-2"); 
		$('#password').removeClass("passwordCollapse");
		$('#password').addClass("passwordExpand");  
	}, 1000);
	setTimeout(function(){
		$("#password").children().show();
		$('#advancedBtn').hide();
		$('#continueBtn').hide();
		$('#passwordDiv').hide();
		$('#passTitle').text(username);	
		stage=1;
	}, 1500);
	
	setTimeout(function(){
		$('#password').addClass("passwordExpand-Set");  
		checkUser();
	}, 2000);

}

function reverseLogin(){
	username="";
    user_password="";
	stage=0;
	$("#password").children().hide();
	
	$('#spacer-2').removeClass("grow-spacer-2");  
	$('#password').removeClass("passwordExpand");
	$('#password').removeClass("passwordExpand-Set");
	$("#password").addClass("passwordCollapse");
	
		$('#title').removeClass("titleExpand"); 
		$('#title').addClass("titleCollapse"); 
		$("#login").removeClass("collapse");	 
	
	setTimeout(function(){
		$("#login").children().show(); 
		$("#usernameError").hide();
		$('#spacer').removeClass("collapse"); 
	}, 800);
	
	
}

//Function to query server to check if user exists
function checkUser(){
	if (stage!=1){return;}
	//Query server
	var data = {};
	data.user = username;			
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
        url: server_url+'/userExists',						
        success: function(data) {
				var response=parseInt(data.response);
				if (debug){
					console.log('success');
					console.log(JSON.stringify(data));
					console.log('User exist response:'+response);
				}
				$('#advancedBtn').show();
				$('#continueBtn').show();
				$('#passwordDiv').show();
				if (!response){
					//New user
					createFlag=1;
					$('#server-stat').text("Account does not exist - A new account will be created");
				}else{
					//User exists
					createFlag=0;
					$('#server-stat').text("Account exists - Attempt to login");
				}
            },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
}

//Function to reset the padlock
function resetPadlock(){
	
	for(var i=1;i<101;i++){
		$("#"+i).css('opacity', '1');
		$("#"+i).prop("disabled",false);
	}
	padlock=0;
	padlockString="";
	
}


function reversePadlock(){
	$("#padlock2").children().hide();
	$('#padlock2').removeClass("padlockExpand-2"); 
	$('#padlock2').removeClass("padlockExpand-Set-2"); 
	$('#padlock2').addClass("padlockCollapse-2"); 
	$('#spacer-2').removeClass("grow-spacer-3"); 
	$('#spacer-2').addClass("grow-spacer-2"); 
	$('#password').removeClass("passwordCollapse");  
	$('#password').addClass("passwordExpand");  
	setTimeout(function(){
		$('#password').children().show();
	}, 1000);
}


//Function to display "generating padlock"
function generatePadlock(){
	
	//Update data
	stage=2;
	user_password=$('#passwordInput').val();
	
	
	$("#password").children().hide();
	$('#spacer-2').removeClass("grow-spacer-2");  
	$('#spacer-2').addClass("shrink-spacer-2"); 
	$("#password").addClass("passwordCollapse");
	$("#password").removeClass("passwordExpand");
	$("#password").removeClass("passwordExpand-Set");
	setTimeout(function(){
		$('#spacer-2').removeClass("shrink-spacer-2");  
		$('#spacer-2').addClass("grow-spacer-2"); 
		$('#padlock').removeClass("padlockCollapse");  
		$('#padlock').addClass("padlockExpand");  
		
	}, 1000);
	setTimeout(function(){
		$('#padlock').addClass("padlockExpand-Set");  
		$('#padlock').children().show();
		
	}, 1600);
	
	setTimeout(function(){
	//Generate padlock here
	
	//Take username+password
	var padlockSeed = username+user_password;
	console.log("Seed: "+padlockSeed);
	var padlockHasher = xmur3(padlockSeed);
	
	
	//Hash-cycle: 500 million cycles
	//TODO: figure out a way to do this without blocking UI thread
	for (var i=0;i<500000000;i++){
		padlockHasher();
		
	}
	
	//Seed PRNG
	var padlockPRNG = sfc32(padlockHasher(),padlockHasher(),padlockHasher(),padlockHasher());
	
	//Cycle the PRNG a million cycles
	for (var i=0;i<1000000;i++){
		padlockPRNG();
	}
	
	
	//Set padlock
	for (var i=1;i<101;i++){
		//Get a printable character
		var num =Math.floor(((padlockPRNG()*1000) % 95+33));
		$("#"+i).html(String.fromCharCode(num));
		//Make a better method for colors
		var colorSeed=Math.floor(padlockPRNG()*16777215).toString(16);
		var colorSeed2=Math.floor(padlockPRNG()*16777215).toString(16);
		var colored=colorSeed.substr(0,3)+colorSeed2.substr(0,3);
		//console.log(colored);
		$("#"+i).css('background',"#"+colored);
		
	}
	
	//REALcookie=String(padlockHasher());
	
	resetPadlock();
	displayPadlock();
		
	}, 1700);
}


function workerPadlock(){
	// figure out way to offload javascript to stop UI from being blocked??
}





function displayPadlock(){
	
	//MAKE SURE TO ADD CODE TO RESET PADLOCK BUTTONS!!
	
	stage=3;
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 
	setTimeout(function(){
		$('#padlock2').removeClass("padlockCollapse-2"); 
		$('#padlock2').addClass("padlockExpand-2"); 
		
		
	}, 1000);
	setTimeout(function(){
		
		$("#padButtons").hide();
		$('#padlock2').addClass("padlockExpand-Set-2"); 
		

	}, 1400);
	setTimeout(function(){
		$("#padButtons").css("display", "flex");
		$('#padlock2').children().show();
	}, 2200);
	
}


function buttonEvent(id){
	
	$("#"+id).css('opacity', '0');
	$("#"+id).prop("disabled",true);
	var frag="";
	padlockString+=$("#"+id).html()+id.toString('base64')+rgb2hex($("#"+id).css('background-color')).toString('base64');
	if (debug){
		console.log("PADLOCKSTRING: " +padlockString);
	}
	padlock++;
	if (padlock>=4){
	$("#padlockSubmission").show();
	
	}
	
}

function generateKeys(){
	stage=4;
	user_password=$('#passwordInput').val();
	$("#padlock2").children().hide();
	$('#spacer-2').removeClass("grow-spacer-2");  
	$('#spacer-2').addClass("shrink-spacer-2"); 
	$("#padlock2").addClass("padlockCollapse-2");
	$("#padlock2").removeClass("padlockExpand-2");
	$("#padlock2").removeClass("padlockExpand-Set-2");
	setTimeout(function(){
		$('#spacer-2').removeClass("shrink-spacer-2");  
		$('#spacer-2').addClass("grow-spacer-2"); 
		$('#padlock').removeClass("padlockCollapse");  
		$('#padlock').addClass("padlockExpand");  
		
	}, 1000);
	setTimeout(function(){
		$('#padlock').children().show();
		$('#loadingMessage').text("Generating RSA keys");
		$('#loadingMessageSub').text("Key size: "+key_size+" - please be patient");
		$('#padlock').addClass("padlockExpand-Set");  
	}, 1600);
	
	setTimeout(function(){
		
		var before = new Date();
		 rsa = new RSAKey();
		
		var rsaSeed=username+user_password+padlockString
		
		if (debug){
			console.log("RSA SEED: " +rsaSeed);
		}

		rsa.generate(key_size,"10001",rsaSeed);
		
		if (debug){
			console.info((rsa.n.toString(16)));
			console.info(linebrk(rsa.d.toString(16),64));
			console.info(linebrk(rsa.p.toString(16),64));
			console.info(linebrk(rsa.q.toString(16),64));
			console.info(linebrk(rsa.dmp1.toString(16),64));
			console.info(linebrk(rsa.dmq1.toString(16),64));
			console.info(linebrk(rsa.coeff.toString(16),64));
		}

		validateUser();
	}, 2000);

}

function validateUser(){
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 
	setTimeout(function(){
		$('#padlock').removeClass("padlockCollapse"); 
		$('#padlock').addClass("padlockExpand"); 
		
		
	}, 1000);
	setTimeout(function(){
		$('#padlock').children().show();
		$('#loadingMessageSub').text("This may take a moment");
		if (createFlag){
			$('#loadingMessage').text("Submitting public key");
		}else{
			$('#loadingMessage').text("Validating against server");
		}
		$('#padlock').addClass("padlockExpand-Set"); 

	}, 1700);
	
	setTimeout(function(){
	if (createFlag){
		//Create a user
		//encookie=rsa.encrypt(REALcookie)
		response = createUser(username,rsa.n.toString(16));
	}else{
		//Request cookie
		
		var data = {};
		data.user = username;	
		$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: server_url+'/fetchCookie',						
		success: function(data) {
		response=data.response;
		if (debug){
			console.log('success');
			console.log(JSON.stringify(data));
			console.log('cookie fetch response:'+response);
		}
		try{
					var returnv=rsa.decrypt(response);
					REALcookie=returnv;
					//alert (encookie);
					//alert(response);
					//alert(returnv + "\t"+REALcookie);

					//alert("Decrypt: "+returnv);

					if (returnv===null){
						failedLogin();
					}else{
						successfullLogin();
					}
					}catch(e){
						alert(e);
						failedLogin();
					}
            },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
	}
	}, 1800);
}


function createUser(user,pubKey,){
	
	var data = {};
	data.user = user;	
	data.key=pubKey;
	//data.cookie=cookie;
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
        url: server_url+'/cheapCreate',						
        success: function(data) {
				var response=parseInt(data.response);
				if (debug){
					console.log('success');
					console.log(JSON.stringify(data));
					console.log('User create response:'+response);
				}
				if (!response){
					//Failure: User prob already exists
					alert("Server Failure: Does this username already exist?");
					failedLogin();
					//return 0;
					//createFlag=1;
					//$('#server-stat').text("Account does not exist - A new account will be created");
				}else{
					//User created!
					//alert("Success! User created!");
					data = {};
					data.user = username;	
					$.ajax({
					type: 'POST',
					data: JSON.stringify(data),
					contentType: 'application/json',
					url: server_url+'/fetchCookie',						
					success: function(data) {
					response=data.response;
					if (debug){
						console.log('success');
						console.log(JSON.stringify(data));
						//console.log('cookie fetch response:'+response);
					}
					try{
					var returnv=rsa.decrypt(response);
					//alert (encookie);
					//alert(response);
					//alert(returnv + "\t"+REALcookie);

					//alert("Decrypt: "+returnv);
					REALcookie=returnv;
					if (returnv===null){
						failedLogin();
					}else{
						successfullLogin();
					}
					}catch(e){
						alert(e);
						failedLogin();
					}
				
				//if (!response){
					//Failure: User prob already exists
					//alert("Server Failure: Does this username already exist?");
					//failedLogin();
					////return 0;
					//createFlag=1;
					//$('#server-stat').text("Account does not exist - A new account will be created");
				//}else{
					//User created!
					//alert("Success! User created!");
					//successfullLogin();
					//return 1;
					//createFlag=0;
					//$('#server-stat').text("Account exists - Attempt to login");
				//}
            },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
					
					//return 1;
					//createFlag=0;
					//$('#server-stat').text("Account exists - Attempt to login");
				}
            },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
	

	
	
	
}

function successfullLogin(){
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 

	
	
	
	
	setTimeout(function(){
		$('#padlock').removeClass("padlockCollapse"); 
		$('#padlock').addClass("padlockExpand"); 
		
		
	}, 1000);
	setTimeout(function(){
		$('#padlock').children().show();
		$('#loadingMessage').text("Login Successful!");
		$('#msgImage').attr("src", "assets/check2.png");
		$('#padlock').addClass("padlockExpand-Set"); 

	}, 1700);
	
	setTimeout(function(){
		openInterface()
	}, 2800);
	
		
	
	
		
	//Wipe sensitive data (keys stored in session storage)
	//username="00000000000000000000000"
	user_password="00000000000000000000000"
	padlockString="00000000000000000000000"
	
	//If user validated successfully then open UI

}

function failedLogin(){
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 
	setTimeout(function(){
		$('#padlock').removeClass("padlockCollapse"); 
		$('#padlock').addClass("padlockExpand"); 
		
		
	}, 1000);
	setTimeout(function(){
		$('#padlock').children().show();
		$('#loadingMessage').text("Login Failure!");
		$('#msgImage').attr("src", "assets/error.png");
		$('#padlock').addClass("padlockExpand-Set"); 

	}, 1700);
	
	setTimeout(function(){
		$("#padlock").children().hide();
		$('#padlock').removeClass("padlockExpand");  
		$('#padlock').removeClass("padlockExpand-Set");  
		$('#padlock').addClass("padlockCollapse");  
		login();
	}, 3500);
	
	//If user validated successfully then open UI
	
}


function openInterface(){
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 
	loadPreference();
	//Re-arrange the UI and add contacts/messageUI/area to type and anything else needed
	setTimeout(function(){
		$("#subWindowContainer").removeClass("hidden"); 
		//$("#subWindowContainer").children().show();
		$("#contactWindow").removeClass("hidden"); 
		
		
	}, 1000);
	
	
	
	
}

function addContact(){

	var data = {};
		data.user = $("#addContactInput").val();	
		$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: server_url+'/fetchPublic',						
		success: function(data) {
		response=data.response;
		if (response!=0){
			console.log("Add contact key: "+response);
			var newContact={
				'username': $("#addContactInput").val(),
				'key':response
			};
			contacts.push(newContact);
			//add the UI
			$("#contactWindow").append('<div id="contactUser'+$("#addContactInput").val()+'" class="contactBox"><div class="title-card-3">'+$("#addContactInput").val()+'</div><button id="" class="button-4 " type="button" onclick="messageContact(\''+$("#addContactInput").val()+'\')">Message</button> <button id="removeContactButton" class="button-4 red" type="button" onclick="removeContact()">Remove</button> </div>');

			//Save changes to preferences
			savePreference();
		}else{
			alert("User not found");
		}


        },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
}


function loadPreference(){
	var data = {};
	data.user = username;	
	data.cookie=REALcookie;
	//data.meta=rsa.encrypt(JSON.stringify(contacts));
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: server_url+'/fetchMeta',						
		success: function(data) {
		response=data.response;
		if (response!=0){
			var hybrid_total=response.split("<-|BEGIN AES|->");
			var hybrid_rsa=rsa.decrypt(hybrid_total[0]);
			let hybrid_tmp=hybrid_rsa.split(',');
			let hybrid_aes= new Uint8Array(16);
			for (let p1=0;p1<hybrid_aes.length;p1++){
				hybrid_aes[p1]=parseInt(hybrid_tmp[p1]);
			}

		// When ready to decrypt the hex string, convert it back to bytes
		var encryptedBytes = aesjs.utils.hex.toBytes(hybrid_total[1]);

		// The counter mode of operation maintains internal state, so to
		// decrypt a new instance must be instantiated.
		var aesCtr = new aesjs.ModeOfOperation.ctr(hybrid_aes, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);
		// Convert our bytes back into text
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		contacts=JSON.parse(decryptedText);
		$("#contactWindow").empty();
		$("#contactWindow").append('<div id="contactTitle" class="contactTitle ">Contacts</div><div id="addContactWindow" class="addContactWindow"><div class="title-card-3">Add a contact</div><input id="addContactInput" class="title-card-3"></input><button id="addContactButton" class="button-4" type="button" onclick="addContact()">Connect</button></div>');
		for (var i=0;i<contacts.length;i++){
						$("#contactWindow").append('<div id="contactUser'+contacts[i].username+'" class="contactBox"><div class="title-card-3">'+contacts[i].username+'</div><button id="" class="button-4 " type="button" onclick="messageContact(\''+contacts[i].username+'\')">Message</button> <button id="removeContactButton" class="button-4 red" type="button" onclick="removeContact()">Remove</button> </div>');
		}
		}else{
			alert("Contact/Preference load failure!");
		}
        },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
}



function savePreference(){

	//Wrap up preferences into JSON, encrypt with AES, then with RSA and post to server

	var array = new Uint8Array(16);
	window.crypto.getRandomValues(array);
	// Convert text to bytes
	var textBytes = aesjs.utils.utf8.toBytes(JSON.stringify(contacts));
	// The counter is optional, and if omitted will begin at 1
	var aesCtr = new aesjs.ModeOfOperation.ctr(array, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	// To print or store the binary data, you may convert it to hex
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	let final_meta=rsa.encrypt(array.toString())+"<-|BEGIN AES|->"+encryptedHex;

	var data = {};
	data.user = username;	
	data.cookie=REALcookie;
	data.meta=final_meta;
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: server_url+'/updateMeta',						
		success: function(data) {
		response=data.response;
		if (response!=0){
		}else{
			alert("Contact/Preference save failure!");
		}
        },
		error: function() {
                  //Could not reach server - if you are using a custom endpoint please make sure it is correct
				  alert("Could not reach server - if you are using a custom endpoint please make sure it is correct");
				  //Display some error message
        },
    });
}







function messageContact(newFriend){
	friend=newFriend;
	$("#messageWindow").removeClass("hidden"); 
	$("#messageTitle").text(friend);
	$("#contactWindow").children().removeClass("active");
	$("#contactUser"+friend).addClass("active");

	
}

function removeContact(){
	//make custom dialog
	
	
	alert("are you sure?")
	alert("Do you want to remove messages from the server?");
	
	
}


