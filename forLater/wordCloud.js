// You want to build a word cloud, an infographic where the size of a word corresponds to how often it appears in the body of text.

// To do this, you'll need data. Write code that takes a long string and builds its word cloud data in a map ↴ , where the keys are words and the values are the number of times the words occurred.

// We'll use a JavaScript Map instead of an object because it's more explicit—we're mapping words to counts. And it'll be easier and cleaner when we want to iterate over our data.

// Think about capitalized words. For example, look at these sentences:

//   "After beating the eggs, Dana read the next step:"
// "Add milk and eggs, then add flour and sugar."
// What do we want to do with "After", "Dana", and "add"? In this example, your final map should include one "Add" or "add" with a value of 22. Make reasonable (not necessarily perfect) decisions about cases like "After" and "Dana".

// Assume the input will only contain words and standard punctuation.

//O(n) time and space
class WordCloudData {
    constructor(inputString) {
      this.wordsToCounts = new Map();
      this.populateWordsToCounts(inputString);
    }
  
    populateWordsToCounts(inputString) {
      
      let currentWordLength = 0;
      let currentWordStartIndex = 0;
    
      for (let i = 0; i < inputString.length; i++) {
        const character = inputString.charAt(i);
        
        if (i === inputString.length - 1) {
          if (this.isLetter(character)) {
            currentWordLength++;
          }
          if (currentWordLength > 0) {
            const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
          }
        }
        
        else if (character === ' ' || character === '\u2014') {
          if (currentWordLength > 0) {
            const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
            currentWordLength = 0;
          }
        }
        
        else if (character === '.') {
          if (i < inputString.length - 1 && inputString.charAt(i+1) === '.') {
            if (currentWordLength > 0) {
            const word = inputString.slice(currentWordStartIndex, currentWordStartIndex + currentWordLength);
            this.addWordToMap(word);
            currentWordLength = 0;
          }
          }
        }
        
        else if (this.isLetter(character) || character === '\'') {
          if (currentWordLength === 0) {
            currentWordStartIndex = i;
          }
          currentWordLength++;
        }
        
        else if (character === '-') {
          if (i > 0 && this.isLetter(inputString.charAt(i - 1)) &&
            this.isLetter(inputString.charAt(i + 1))) {
            if (currentWordLength === 0) {
              currentWordStartIndex = i;
            }
            currentWordLength += 1;
          } else {
            if (currentWordLength > 0) {
              const word = inputString.slice(currentWordStartIndex,
                currentWordStartIndex + currentWordLength);
              this.addWordToMap(word);
              currentWordLength = 0;
            }
          }
        }
      }
  
    }
    
    addWordToMap(word) {
      
      let newCount;
      
      if (this.wordsToCounts.has(word)) {
        newCount = this.wordsToCounts.get(word) + 1;
        this.wordsToCounts.set(word, newCount);
      } 
      else if (this.wordsToCounts.has(word.toLowerCase())) {
        newCount = this.wordsToCounts.get(word.toLowerCase()) + 1;
        this.wordsToCounts.set(word.toLowerCase(), newCount);
      }
      else if (this.wordsToCounts.has(this.capitalize(word))) {
        newCount = this.wordsToCounts.get(this.capitalize(word)) + 1;
        this.wordsToCounts.set(word, newCount);
        this.wordsToCounts.delete(this.capitalize(word));
      }
      else {
        this.wordsToCounts.set(word, 1);
      }
    }
    
    
    
    isLetter(character) {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(character) >= 0;
    }
    
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  
  }
  
  
  
  
  
  
  
  // Tests
  
  // There are lots of valid solutions for this one. You
  // might have to edit some of these tests if you made
  // different design decisions in your solution.
  
  let desc = 'simple sentence';
  let actual = new WordCloudData('I like cake').wordsToCounts;
  let expected = new Map([['I', 1], ['like', 1], ['cake', 1]]);
  assert(isMapsEqual(actual, expected), desc);
  
  desc = 'longer sentence';
  actual = new WordCloudData('Chocolate cake for dinner and pound cake for dessert').wordsToCounts;
  expected = new Map([['and', 1], ['pound', 1], ['for', 2], ['dessert', 1],
    ['Chocolate', 1], ['dinner', 1], ['cake', 2]]);
  assert(isMapsEqual(actual, expected), desc);
  
  desc = 'punctuation';
  actual = new WordCloudData('Strawberry short cake? Yum!').wordsToCounts;
  expected = new Map([['cake', 1], ['Strawberry', 1], ['short', 1], ['Yum', 1]]);
  assert(isMapsEqual(actual, expected), desc);
  
  desc = 'hyphenated Words';
  actual = new WordCloudData('Dessert - mille-feuille cake').wordsToCounts;
  expected = new Map([['cake', 1], ['Dessert', 1], ['mille-feuille', 1]]);
  assert(isMapsEqual(actual, expected), desc);
  
  desc = 'ellipses between words';
  actual = new WordCloudData('Mmm...mmm...decisions...decisions').wordsToCounts;
  expected = new Map([['mmm', 2], ['decisions', 2]]);
  assert(isMapsEqual(actual, expected), desc);
  
  desc = 'apostrophes';
  actual = new WordCloudData("Allie's Bakery: Sasha's Cakes").wordsToCounts;
  expected = new Map([['Bakery', 1], ['Cakes', 1], ["Allie's", 1], ["Sasha's", 1]]);
  assert(isMapsEqual(actual, expected), desc);
  
  function isMapsEqual(map1, map2) {
    if (map1.size !== map2.size) {
      return false;
    }
    for (let [key, val] of map1) {
      const testVal = map2.get(key);
  
      // In cases of an undefined value, make sure the key
      // actually exists on the object so there are no false positives
      if (testVal !== val || (testVal === undefined && !map2.has(key))) {
        return false;
      }
    }
    return true;
  }
  
  function assert(condition, desc) {
    if (condition) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL`);
    }
  }