// keep track of the highestProductOf2 and lowestProductOf2 (could be negative number)
// how do we keep track of the highestProductOf2 and lowestProductOf2 at each iteration??
// we keep track of the lowest and highest number. If the current number times the current highest
// OR the current lowest, if the current is negative, is greater than the current highestProductOf2
// we have a new highestProductOf2. Same for lowestProductOf2
// So at each iteration we are keeping track of and updating the following:
// highestProductOf3
// highestProductOf2
// highest
// lowestProductOf2
// lowest

// Careful—make sure you update each of these variables in the right order, otherwise you might end up e.g. multiplying the current number by itself to get a new highestProductOf2.

// O(n) time and O(1) additional space

function highestProductOf3(arrayOfInts) {
    if (arrayOfInts.length < 3) {
        throw new Error('Less than 3 items!');
    }

    let highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
    let lowest  = Math.min(arrayOfInts[0], arrayOfInts[1]);

    let highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
    let lowestProductOf2  = arrayOfInts[0] * arrayOfInts[1];

    let highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

    // loop through items starting at index 2, so 3rd item
    for (let i = 2; i < arrayOfInts.length; i++) {
        const current = arrayOfInts[i];

        // check if we have a highest product of 3
        // it is either the current highest
        // or the current times the highest product of two
        // or the current times the lowest product of two

        highestProductOf3 = Math.max(highestProductOf3, (current * highestProductOf2), (current * lowestProductOf2));

        // check if we have a new hightest product of two
        highestProductOf2 = Math.max(highestProductOf2, current * highest, current * lowest);

        // check if we have a new lowest product of two
        lowestProductOf2 = Math.min(lowestProductOf2, current * highest, current * lowest);

        // ehck if we have a new highest and lowest vars
        highest = Math.max(highest, current);
        lowest = Math.min(lowest, current);
    }
    return highestProductOf3;

    
}
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'short array';
  let actual = highestProductOf3([1, 2, 3, 4]);
  let expected = 24;
  assertEqual(actual, expected, desc);
  
  desc = 'longer array';
  actual = highestProductOf3([6, 1, 3, 5, 7, 8, 2]);
  expected = 336;
  assertEqual(actual, expected, desc);
  
  desc = 'array has one negative';
  actual = highestProductOf3([-5, 4, 8, 2, 3]);
  expected = 96;
  assertEqual(actual, expected, desc);
  
  desc = 'array has two negatives';
  actual = highestProductOf3([-10, 1, 3, 2, -10]);
  expected = 300;
  assertEqual(actual, expected, desc);
  
  desc = 'array is all negatives';
  actual = highestProductOf3([-5, -1, -3, -2]);
  expected = -6;
  assertEqual(actual, expected, desc);
  
  desc = 'error with empty array';
  const emptyArray = () => (highestProductOf3([]));
  assertThrowsError(emptyArray, desc);
  
  desc = 'error with one number';
  const oneNumber = () => (highestProductOf3([1]));
  assertThrowsError(oneNumber, desc);
  
  desc = 'error with two numbers';
  const twoNumber = () => (highestProductOf3([1, 1]));
  assertThrowsError(twoNumber, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }
  
  function assertThrowsError(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }