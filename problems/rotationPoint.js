// There's an array of words that are mostly alphabetical, except they start somewhere in the middle of the alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an alphabetically ordered array that has been "rotated." For example:

  const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];

// Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. 
// words = ['k', 'v', 'a', 'b', 'c', 'd', 'e', 'g', 'i'];
// if current guess is 'c', where the the rotation point? is it to the left or to the right?
// so here rotation point is 'a' at index 2. every item to the right of the rotation point is alphabetically before the 1st item in the array. So rotation point to is to the left! else right.
// this means, if the currentValue is alphabetically less than the first item, I can reset the end to that currentValue's index - 1
// another example = [f,g,h,i,j,k,l,m,a,b,c]
// above, let's say currentValue is 'k'. 'k' is alphabetically after the first value. So rotation point is on the right side!


// this is a modified version of binary search. At each iteration, we go right if the item we are looking at is greater than the first item. We go left if the item we are looking at is less than the first item.
// when start and end are directly next to each other, you know floor is the last item that was added before starting from the beginning and end is the first item added.



// O (log n), O(1) space (storing first word and the indexes)
function findRotationPoint(words) {
    if (words.length === 1) return 0;
    if (words.length < 1) return false;

    let start = 0;
    let end = words.length;
    const firstWord = words[0];

    while(start < end) {
        const halfPoint = Math.floor((end - start) / 2);
        const guessIndex = start + halfPoint;

        if (words[guessIndex] >= firstWord) {
            start = guessIndex;
        } else {
            end = guessIndex;
        }
        // if start and end are next to each other. end comes alphabetically first!
        if (start + 1 === end) {
            break;
        }
    }
    return end;
}

/* Binary search teaches us that when an array is sorted or mostly sorted:

The value at a given index tells us a lot about what's to the left and what's to the right.
We don't have to look at every item in the array. By inspecting the middle item, we can "rule out" half of the array.
We can use this approach over and over, cutting the problem in half until we have the answer. This is sometimes called "divide and conquer." So whenever you know an array is sorted or almost sorted, think about these lessons from binary search and see if they apply. */


// Tests

let desc = 'small array';
let actual = findRotationPoint(['cape', 'cake']);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'medium array';
actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
expected = 4;
assertEquals(actual, expected, desc);

desc = 'large array';
actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
  'undulate', 'xenoepist', 'asymptote',
  'babka', 'banoffee', 'engender',
  'karpatka', 'othellolagkage']);
expected = 5;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}