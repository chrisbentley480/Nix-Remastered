//Decimal to binary
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

/*Hash-function*/
//Murmur hash 3 - non cryptographic (reversible)
//Use - Repetitive Hash cycles for seeding PRNG
//This should be fine for its use, since no output is saved.
//Known vulnerabilities - susceptible to hash collision
//Analysis: Based on my limited knowledge this function with its use shouldn't be the source of any vulnerabilities.
//Designation: Temporary
function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}


/*128-bit seedable rng*/
// Small Fast Counter 32 from PracRand PRNG test suite.
//Analysis: I don't know much about this PRNG, it may be vulnerable in it's use case. Also limited to 128-bits. Considering researching another PRNG to use in it's place.
//Designation: Temporary
function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}