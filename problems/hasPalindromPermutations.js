// Write an efficient function that checks whether any permutation ↴ of an input string is a palindrome. ↴

// You can assume the input string only contains lowercase letters.

// Examples:

// "civic" should return true
// "ivicc" should return true
// "civil" should return false
// "livci" should return false

function hasPalindromePermutation(string) {
  // Check if any permutation of the input is a palindrome
  // for a word to be a palindrome, you need all characters to repeat 
  // OR with the except of one
  
  // iterate through theString
  // keep track of how many times each character occurs
  // see if the numbers are even OR even + 1 odd
  // then return true

  let check = [];
  for (let i = 0; i < string.length; i++) {
      if (check.indexOf(string[i]) === -1) {
          check.push(string[i]);
      } else {
          check.splice(check.indexOf(string[i]), 1);
      }
  }
  if (check.length === 1 || check.length === 0) {
      return true;
  }
  return false;
}

// O(n) time complexity
// you can use a set

function hasPalindromePermutation(theString) {

    // Track characters we've seen an odd number of times
    const unpairedCharacters = new Set();
  
    for (let char of theString) {
      if (unpairedCharacters.has(char)) {
        unpairedCharacters.delete(char);
      } else {
        unpairedCharacters.add(char);
      }
    }
  
    // The string has a palindrome permutation if it
    // has one or zero characters without a pair
    return unpairedCharacters.size <= 1;
}



// Tests

let desc = 'permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcbcd'), true, desc);

desc = 'permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabccbdd'), true, desc);

desc = 'no permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcd'), false, desc);

desc = 'no permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabbcd'), false, desc);

desc = 'empty string';
assertEqual(hasPalindromePermutation(''), true, desc);

desc = 'one character string ';
assertEqual(hasPalindromePermutation('a'), true, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}