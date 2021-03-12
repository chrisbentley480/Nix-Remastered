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

let PUBKEY=line;

let part1="\u003c\u0068\u0074\u006d\u006c\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0074\u0079\u0070\u0065\u003d\u0022\u0074\u0065\u0078\u0074\u002f\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0073\u0072\u0063\u003d\u0022\u006a\u0073\u0062\u006e\u002e\u006a\u0073\u0022\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0074\u0079\u0070\u0065\u003d\u0022\u0074\u0065\u0078\u0074\u002f\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0073\u0072\u0063\u003d\u0022\u0070\u0072\u006e\u0067\u0034\u002e\u006a\u0073\u0022\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0074\u0079\u0070\u0065\u003d\u0022\u0074\u0065\u0078\u0074\u002f\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0073\u0072\u0063\u003d\u0022\u0072\u006e\u0067\u002e\u006a\u0073\u0022\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0074\u0079\u0070\u0065\u003d\u0022\u0074\u0065\u0078\u0074\u002f\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0073\u0072\u0063\u003d\u0022\u0072\u0073\u0061\u002e\u006a\u0073\u0022\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0074\u0079\u0070\u0065\u003d\u0022\u0074\u0065\u0078\u0074\u002f\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u0022\u0020\u0073\u0072\u0063\u003d\u0022\u0062\u0061\u0073\u0065\u0036\u0034\u002e\u006a\u0073\u0022\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u006c\u0061\u006e\u0067\u0075\u0061\u0067\u0065\u003d\u0022\u004a\u0061\u0076\u0061\u0053\u0063\u0072\u0069\u0070\u0074\u0022\u003e\u000a\u003c\u0021\u002d\u002d\u000a\u002f\u002a\u0048\u0061\u0073\u0068\u002d\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u002a\u002f\u000a\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u0020\u0078\u006d\u0075\u0072\u0033\u0028\u0073\u0074\u0072\u0029\u0020\u007b\u000a\u0020\u0020\u0020\u0020\u0066\u006f\u0072\u0028\u0076\u0061\u0072\u0020\u0069\u0020\u003d\u0020\u0030\u002c\u0020\u0068\u0020\u003d\u0020\u0031\u0037\u0037\u0039\u0030\u0033\u0033\u0037\u0030\u0033\u0020\u005e\u0020\u0073\u0074\u0072\u002e\u006c\u0065\u006e\u0067\u0074\u0068\u003b\u0020\u0069\u0020\u003c\u0020\u0073\u0074\u0072\u002e\u006c\u0065\u006e\u0067\u0074\u0068\u003b\u0020\u0069\u002b\u002b\u0029\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0020\u003d\u0020\u004d\u0061\u0074\u0068\u002e\u0069\u006d\u0075\u006c\u0028\u0068\u0020\u005e\u0020\u0073\u0074\u0072\u002e\u0063\u0068\u0061\u0072\u0043\u006f\u0064\u0065\u0041\u0074\u0028\u0069\u0029\u002c\u0020\u0033\u0034\u0033\u0032\u0039\u0031\u0038\u0033\u0035\u0033\u0029\u002c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0020\u003d\u0020\u0068\u0020\u003c\u003c\u0020\u0031\u0033\u0020\u007c\u0020\u0068\u0020\u003e\u003e\u003e\u0020\u0031\u0039\u003b\u000a\u0020\u0020\u0020\u0020\u0072\u0065\u0074\u0075\u0072\u006e\u0020\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u0028\u0029\u0020\u007b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0020\u003d\u0020\u004d\u0061\u0074\u0068\u002e\u0069\u006d\u0075\u006c\u0028\u0068\u0020\u005e\u0020\u0068\u0020\u003e\u003e\u003e\u0020\u0031\u0036\u002c\u0020\u0032\u0032\u0034\u0036\u0038\u0032\u0032\u0035\u0030\u0037\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u0020\u003d\u0020\u004d\u0061\u0074\u0068\u002e\u0069\u006d\u0075\u006c\u0028\u0068\u0020\u005e\u0020\u0068\u0020\u003e\u003e\u003e\u0020\u0031\u0033\u002c\u0020\u0033\u0032\u0036\u0036\u0034\u0038\u0039\u0039\u0030\u0039\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0065\u0074\u0075\u0072\u006e\u0020\u0028\u0068\u0020\u005e\u003d\u0020\u0068\u0020\u003e\u003e\u003e\u0020\u0031\u0036\u0029\u0020\u003e\u003e\u003e\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u007d\u000a\u007d\u000a\u002f\u002a\u0031\u0032\u0038\u002d\u0062\u0069\u0074\u0020\u0073\u0065\u0065\u0064\u0061\u0062\u006c\u0065\u0020\u0072\u006e\u0067\u002a\u002f\u000a\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u0020\u0073\u0066\u0063\u0033\u0032\u0028\u0061\u002c\u0020\u0062\u002c\u0020\u0063\u002c\u0020\u0064\u0029\u0020\u007b\u000a\u0020\u0020\u0020\u0020\u0072\u0065\u0074\u0075\u0072\u006e\u0020\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u0028\u0029\u0020\u007b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u0020\u003e\u003e\u003e\u003d\u0020\u0030\u003b\u0020\u0062\u0020\u003e\u003e\u003e\u003d\u0020\u0030\u003b\u0020\u0063\u0020\u003e\u003e\u003e\u003d\u0020\u0030\u003b\u0020\u0064\u0020\u003e\u003e\u003e\u003d\u0020\u0030\u003b\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0076\u0061\u0072\u0020\u0074\u0020\u003d\u0020\u0028\u0061\u0020\u002b\u0020\u0062\u0029\u0020\u007c\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0061\u0020\u003d\u0020\u0062\u0020\u005e\u0020\u0062\u0020\u003e\u003e\u003e\u0020\u0039\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0020\u003d\u0020\u0063\u0020\u002b\u0020\u0028\u0063\u0020\u003c\u003c\u0020\u0033\u0029\u0020\u007c\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0063\u0020\u003d\u0020\u0028\u0063\u0020\u003c\u003c\u0020\u0032\u0031\u0020\u007c\u0020\u0063\u0020\u003e\u003e\u003e\u0020\u0031\u0031\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0020\u003d\u0020\u0064\u0020\u002b\u0020\u0031\u0020\u007c\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0020\u003d\u0020\u0074\u0020\u002b\u0020\u0064\u0020\u007c\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0063\u0020\u003d\u0020\u0063\u0020\u002b\u0020\u0074\u0020\u007c\u0020\u0030\u003b\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0072\u0065\u0074\u0075\u0072\u006e\u0020\u0028\u0074\u0020\u003e\u003e\u003e\u0020\u0030\u0029\u0020\u002f\u0020\u0034\u0032\u0039\u0034\u0039\u0036\u0037\u0032\u0039\u0036\u003b\u000a\u0020\u0020\u0020\u0020\u007d\u000a\u007d\u000a\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e\u0020\u0064\u006f\u005f\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0028\u0029\u0020\u007b\u000a\u0020\u0020\u0076\u0061\u0072\u0020\u0072\u0073\u0061\u0020\u003d\u0020\u006e\u0065\u0077\u0020\u0052\u0053\u0041\u004b\u0065\u0079\u0028\u0029\u003b\u000a\u0020\u0020\u0072\u0073\u0061\u002e\u0073\u0065\u0074\u0050\u0075\u0062\u006c\u0069\u0063\u0028\u0022";
let part2="\u0022\u000a\u002c\u0020\u0022\u0031\u0030\u0030\u0030\u0031\u0022\u0029\u003b\u000a\u0020\u0020\u0076\u0061\u0072\u0020\u0072\u0065\u0073\u0020\u003d\u0020\u0072\u0073\u0061\u002e\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0028\u0022";
let part3="\u0022\u0029\u003b\u000a\u0020\u0020\u002f\u002f\u0076\u0061\u0072\u0020\u0061\u0066\u0074\u0065\u0072\u0020\u003d\u0020\u006e\u0065\u0077\u0020\u0044\u0061\u0074\u0065\u0028\u0029\u003b\u000a\u0020\u002f\u002f\u0020\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u002e\u0069\u006e\u0066\u006f\u0028\u0022\u006d\u006f\u0076\u0069\u006e\u0067\u0020\u0074\u006f\u0020\u0072\u0065\u0073\u0022\u0029\u003b\u000a\u0020\u0020\u0069\u0066\u0028\u0072\u0065\u0073\u0029\u0020\u007b\u000a\u0020\u0020\u002f\u002f\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u002e\u0069\u006e\u0066\u006f\u0028\u0022\u0072\u0065\u0073\u0075\u006c\u0074\u003a\u0022\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u002f\u002f\u0064\u006f\u0063\u0075\u006d\u0065\u006e\u0074\u002e\u0072\u0073\u0061\u0074\u0065\u0073\u0074\u002e\u0063\u0069\u0070\u0068\u0065\u0072\u0074\u0065\u0078\u0074\u002e\u0076\u0061\u006c\u0075\u0065\u0020\u003d\u0020\u006c\u0069\u006e\u0065\u0062\u0072\u006b\u0028\u0072\u0065\u0073\u002c\u0020\u0036\u0034\u0029\u003b\u000a\u0020\u0020\u0020\u0020\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u002e\u0069\u006e\u0066\u006f\u0028\u0072\u0065\u0073\u0029\u003b\u000a\u0020\u0020\u0020\u002f\u002f\u0020\u0064\u006f\u0063\u0075\u006d\u0065\u006e\u0074\u002e\u0072\u0073\u0061\u0074\u0065\u0073\u0074\u002e\u0073\u0074\u0061\u0074\u0075\u0073\u002e\u0076\u0061\u006c\u0075\u0065\u0020\u003d\u0020\u0022\u0054\u0069\u006d\u0065\u003a\u0020\u0022\u0020\u002b\u0020\u0028\u0061\u0066\u0074\u0065\u0072\u0020\u002d\u0020\u0062\u0065\u0066\u006f\u0072\u0065\u0029\u0020\u002b\u0020\u0022\u006d\u0073\u0022\u003b\u000a\u0020\u0020\u007d\u000a\u0020\u002f\u002f\u0020\u0064\u006f\u005f\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0028\u0029\u000a\u0020\u0020\u000a\u007d\u000a\u002f\u002f\u0073\u0065\u0074\u005f\u0031\u0030\u0032\u0034\u0066\u0034\u0028\u0029\u003b\u000a\u002f\u002f\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u002e\u0069\u006e\u0066\u006f\u0028\u0022\u0061\u0074\u0074\u0065\u006d\u0070\u0074\u0069\u006e\u0067\u0022\u0029\u003b\u000a\u0064\u006f\u005f\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0028\u0029\u003b\u000a\u002f\u002f\u002d\u002d\u003e\u000a\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u000a\u000a\u0020\u0020\u0020\u0020\u000a\u0020\u000a\u003c\u002f\u0068\u0074\u006d\u006c\u003e";

fs.writeFileSync("serverSideJS.html", (part1+PUBKEY+part2+(x+z)+part3))

	
JSDOM.fromFile("serverSideJS.html", options).then((dom) => {
  //console.log(dom.window.document.body.textContent.trim());
  process.stdout.write((x+z)+":"+dom.window.document.body.textContent.trim());

  setTimeout(() => {
    console.log(dom.window.document.body.textContent.trim());
  }, 100);
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