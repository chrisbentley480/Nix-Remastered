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

