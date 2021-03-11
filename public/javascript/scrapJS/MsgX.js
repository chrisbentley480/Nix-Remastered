
function XMsg(){
	
	
	
}

function init(a,b,c,d){
this.to1=a;
this.from1=b;
this.txt1=c;
this.pub1=d;

	
}
function getText(){
	
	return this.txt1;
}
function getPub(){
	return this.pub1;
	
}

function getTo(){
	return this.to1;
	
}

function getFrom(){
	return this.from1;
	
}
XMsg.prototype.getP = getPub;
XMsg.prototype.getT = getTo;
XMsg.prototype.getF = getFrom;
XMsg.prototype.init = init;
XMsg.prototype.getText = getText;



function bigX(name){
	this.list=new Array();
	this.name=name;
	
}
function getName(){
	return this.name;
}


function addMessage(e){
	this.list.push(e);
}

function getMessage(x){
	return this.list[x];
	
}

function getSize(){
	return this.list.length;
}


bigX.prototype.addX=addMessage;
bigX.prototype.getX=getMessage;
bigX.prototype.getN=getName;
bigX.prototype.getSize=getSize;









