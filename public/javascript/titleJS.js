var username="";
var user_password="";
var stage=0;
var padlock="";

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
	}, 1000);
	setTimeout(function(){
		$('#spacer-2').addClass("grow-spacer-2"); 
		$('#password').removeClass("passwordCollapse");
		$('#password').addClass("passwordExpand");  
	}, 1500);
	setTimeout(function(){
		$("#password").children().show();
		$('#advancedBtn').hide();
		$('#continueBtn').hide();
		$('#passwordDiv').hide();
		$('#passTitle').text(username);	
		stage=1;
	}, 2200);
	
	setTimeout(function(){
		$('#password').addClass("passwordExpand-Set");  
		
		checkUser();
	}, 3000);

}

function reverseLogin(){
	username="";
		 
	stage=0;
	$("#password").children().hide();
	
	$('#spacer-2').removeClass("grow-spacer-2");  
	$('#password').removeClass("passwordExpand");
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

function checkUser(){
	if (stage!=1){return;}
	
	//Query server
	var response=1;
	
	
	$('#advancedBtn').show();
	$('#continueBtn').show();
	$('#passwordDiv').show();
	if (!response){
		//New user
		$('#server-stat').text("Account does not exist - A new account will be created");
		
	}else{
		//User exists
		$('#server-stat').text("Account exists - Attempt to login");
		
	}
	
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


function generatePadlock(){
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
		$('#padlock').children().show();
		$('#padlock').addClass("padlockExpand-Set");  
	}, 1600);
	
	
	//Generate padlock here
	setTimeout(function(){
		displayPadlock()
	}, 2500);
	
	
	
	
	
}

function displayPadlock(){
	
	//MAKE SURE TO ADD CODE TO RESET PADLOCK BUTTONS!!
	
	
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
		$('#padlock2').children().show();
		$("#padButtons").hide();
		$('#padlock2').addClass("padlockExpand-Set-2"); 

	}, 1700);
	setTimeout(function(){
		$("#padButtons").css("display", "flex");

	}, 1800);
	
}


function buttonEvent(id){

	if (padlock==0){
	//document.getElementById("combo").style.color= "black";
	//document.getElementById("combo").innerText= "";
	}
	if (padlock<4){
	$("#"+id).css('opacity', '0');
	$("#"+id).prop("disabled",true);
	//var frag = dec2bin(document.getElementById(id).innerHTML.charCodeAt(0))+dec2bin(id);
	var frag="";
	user_password=user_password+frag;
	padlock++;
	var foo="";
	for (var i=0;i<padlock;i++){
		foo+="*";
	}
	//document.getElementById("combo").innerText= foo;
	if (padlock==4){
	//	document.getElementById("fs1").style.display = "inline";
	$("#padlockSubmission").show();
	
	}
	}
}


