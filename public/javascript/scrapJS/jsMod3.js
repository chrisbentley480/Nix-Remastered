'use strict';
const { JSDOM } = require('jsdom');
const	fs = require('fs');
const options = {
  resources: 'usable',
  runScripts: 'dangerously',
};
let k;
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
	 let z = (Math.random()).toString();
	 let x=Math.random().toString();
	//var experimental = RSAEncrypt("FOOOOO");
    //k=line;
	
//console.info("\u0074\u0065\u0073\u0074\u0074\u0065\u0073\u0074\u0074\u0065\u0073\u0074");

	
	
JSDOM.fromFile("serverSideJS.html", options).then((dom) => {
  //console.log(dom.window.document.body.textContent.trim());
  process.stdout.write((x+z)+":"+dom.window.document.body.textContent.trim());

  setTimeout(() => {
    console.log(dom.window.document.body.textContent.trim());
  }, 1000);
});
	
	
})
//process.stdout.write(k);
/*
const { JSDOM } = require('jsdom');

const options = {
  resources: 'usable',
  runScripts: 'dangerously',
};

JSDOM.fromFile('fookme.html', options).then((dom) => {
  console.log(dom.window.document.body.textContent.trim());

  setTimeout(() => {
    console.log(dom.window.document.body.textContent.trim());
  }, 100000);
});
*/


/*
// Return the PKCS#1 RSA encryption of "text" as an even-length hex string


















function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
	 console.info("does this never run?!?!");
  if(n < s.length + 11) { // TODO: fix for utf-8
    alert("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  //var rng = new SecureRandom(seed);
  console.info("rng switched to rsa");
  var rng = rng1;
  //rng.setSeed(seed);
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}




















//var fs = require('getStdin');

//var fs = require('fs');

// file is included here:
//eval(fs.readFileSync('./FUCK/rsa.js')+'').prototype;
//eval(fs.readFileSync('./FUCK/jsbn.js')+'').prototype;
//eval(fs.readFileSync('./FUCK/jsbn2.js')+'').prototype;
//eval(fs.readFileSync('./FUCK/rng.js')+'').prototype;
//eval(fs.readFileSync('./FUCK/prng4.js')+'').prototype;
//eval(fs.readFileSync('./FUCK/base64.js')+'');
//eval(fs.readFileSync('./clusterFUCK/rsa2.js')+'');
//eval(fs.readFileSync('./clusterFUCK/sha1.js')+'');
//eval(fs.readFileSync('./clusterFUCK/prng4.js')+'');
//eval(fs.readFileSync('./clusterFUCK/base64.js')+'');
//eval(fs.readFileSync('./clusterFUCK/jsbn.js')+'');
//eval(fs.readFileSync('./clusterFUCK/jsbn2.js')+'');

//let hu="782452865876517h8568";
//let bu=BigInt(hu);
//process.stdout.write(bu.toString());
//var rsa = new RSAKey();
//rsa.setPublic('a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3', "10001");
//var experimental = RSAEncrypt("FOOOOO");
let k;
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', function(line){
	 var z = Math.random();
	//var experimental = RSAEncrypt("FOOOOO");
    k=line;
	process.stdout.write(""+z+":"+line);
})


//let data2 = process.stdin.read();


 
 /*
var rsa = new RSAKey();
  rsa.setPublic(document.rsatest.n.value, document.rsatest.e.value);
  var res = rsa.encrypt(document.rsatest.plaintext.value);
  var after = new Date();
  if(res) {
    document.rsatest.ciphertext.value = linebrk(res, 64);
    document.rsatest.cipherb64.value = linebrk(hex2b64(res), 64);
    document.rsatest.status.value = "Time: " + (after - before) + "ms";
  }
  */

//process.stdout.write(JSON.stringify({"test":"load"})+"\n");


/*
// include the http module
var http = require('http');

// create a webserver
http.createServer(function (req, res) {

    // respond to any incoming http request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
	 process.stdout.write("SAMPLE DATA");
}).listen(1337, '127.0.0.1');
*/