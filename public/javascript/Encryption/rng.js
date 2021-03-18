// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;
var seed;
var xmur;
var prng;
// Mix in a 32-bit integer into the pool

//Change to mix hashes into file or something else


/*
function rng_seed_int(x) {
  rng_pool[rng_pptr++] ^= x & 255;
  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}
*/

function rng_seed_int(){
	//console.info("Attempting to reseed");
	if (prng==null){
	//console.info("prng null");	
	}
	if (xmur==null){
	//console.info("xmur null");	
	}
	
	if (prng!=null&&xmur!=null){
			//console.info("working...");
while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
	
    t = Math.floor(65536 * prng());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
}/*
  var x = xmur();
  console.info("rng_pool 0 : "+rng_pool[0]);
  rng_pool[rng_pptr++] ^= x & 255;
  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;*/
}

}


// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  
  /*
  if(window.crypto && window.crypto.getRandomValues) {
    // Use webcrypto if available
    var ua = new Uint8Array(32);
    window.crypto.getRandomValues(ua);
    for(t = 0; t < 32; ++t)
      rng_pool[rng_pptr++] = ua[t];
  }*/
  /*
  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
    // Extract entropy (256 bits) from NS4 RNG if available
    var z = window.crypto.random(32);
    for(t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
  }  
  */
  
  //Seed with key instead of random
  
  /*
  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
  */
  
  
  //rng_seed_int(window.screenX);
  //rng_seed_int(window.screenY);
}

function rng_get_byte() {
	
  if(rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_byte2() {
  if(rng_state == null) {
    
  }
  // TODO: allow reseeding after first request

  //console.info("Great work, Hash is: "+xmur());
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function rng_get_bytes2(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte2();
}
function setSeed(Pss){
	
	seed=Pss;
	//rng_seed_time();
	//console.info("Great work, Pss is: "+seed);
	xmur = xmur3(seed);
	
	//May re-enable this part
	//for (var i=0;i<5000000;i++){
	//	var barfoo1=xmur().toString();
	//	var barfoo2=xmur().toString();
	//	var barfoo3=xmur().toString();
	//	var barfoo4=xmur().toString();
	//	xmur=xmur3(barfoo1+barfoo2+barfoo3+barfoo4);
	//}
	//console.info("timsink finished");
	 
	var seed1=xmur();
	var seed2=xmur();
	var seed3=xmur();
	var seed4=xmur();
	prng= sfc32(seed1,seed2,seed3,seed4);
	rng_seed_int();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
	
	//Wipe the pool
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;

	//console.info("reseeding with "+seed);
}



function SecureRandom() {}
function SecureRandom2() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
SecureRandom2.prototype.nextBytes = rng_get_bytes2;
SecureRandom2.prototype.setSeed = setSeed;