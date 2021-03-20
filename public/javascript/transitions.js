
//Transition: #1 - Username -> password
function login(){

	//Check username length
	if ($('#username').val().length>30){
		$("#usernameError").show();
		return;
	}else{
		$("#usernameShow").hide();
	}
	//Save username
	username=$('#username').val();

	$('#server-stat').text("Querying Server");
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
		//Proceed to query server
		checkUser();
	}, 2000);
}

//Transition #-1 - password -> username
function reverseLogin(){
	//Clear username and password from memory
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

//Transition #2 - password -> padlock
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
		resetPadlock();
		displayPadlock();
	}, 1700);
}


//Transition #-2 - Padlock -> Password
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

//Transition #3 - padlock gen -> display padlock
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

//Function to reset the padlock
function resetPadlock(){
	for(var i=1;i<101;i++){
		$("#"+i).css('opacity', '1');
		$("#"+i).prop("disabled",false);
	}
	padlock=0;
	padlockString="";
}

//Transition #4 - padlock - rsa generation
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

//Transition #5 - validating -> login success
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
	//Wipe sensitive data (key stored in runtime)
	user_password="00000000000000000000000"
	padlockString="00000000000000000000000"
}

//Transition #6 - validating -> login failure -> ??padlock??
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
}

//Transition #7 - login success -> view message interface
function openInterface(){
	$("#padlock").children().hide();
	$('#padlock').removeClass("padlockExpand");  
	$('#padlock').removeClass("padlockExpand-Set");  
	$('#padlock').addClass("padlockCollapse");  
	$('#spacer-2').removeClass("grow-spacer-2"); 
	$('#spacer-2').addClass("grow-spacer-3"); 
	//Query server for contacts/setting metadata
	loadPreference();
	//Re-arrange the UI and add contacts/messageUI/area to type and anything else needed
	setTimeout(function(){
		$("#subWindowContainer").removeClass("hidden"); 
		//$("#subWindowContainer").children().show();
		$("#contactWindow").removeClass("hidden"); 
	}, 1000);
}


