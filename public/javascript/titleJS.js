



function login(){
	 $("#login").children().hide(); 
	//$('#login').addClass("collapse");  
	$('#spacer').addClass("collapse");  
	setTimeout(function(){
    $('#title').addClass("titleExpand");  
}, 1000);
setTimeout(function(){
    $('#spacer-2').addClass("grow-spacer-2");  
	 $('#password').addClass("passwordExpand");  
}, 1500);
}