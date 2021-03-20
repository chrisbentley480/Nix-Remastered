
//Scrap/misc javascript functions



function workerPadlock(){
	// figure out way to offload javascript to webworker to stop UI from being blocked??
}

//Function for padlock buttons
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

//Function to set focus to contact
function messageContact(newFriend){
	friend=newFriend;
	$("#messageWindow").removeClass("hidden"); 
	$("#messageTitle").text(friend);
	$("#contactWindow").children().removeClass("active");
	$("#contactUser"+friend).addClass("active");

	//Load/decrypt messages here?


}

function removeContact(){
	//make dialog confirming
	
	//Cycle through contacts to find contact - remove - call savePreference();
	

	savePreference();
	//alert("are you sure?")
	//alert("Do you want to remove messages from the server?");
	
	
}


