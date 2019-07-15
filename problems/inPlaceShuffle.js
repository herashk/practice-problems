//Write a function for doing an in-place shuffle of an array.
// The shuffle must be "uniform," meaning each item in the original array must have the same probability of ending up in each spot in the final array.
// Assume that you have a function getRandom(floor, ceiling) for getting a random integer that is >= floor and <= ceiling.

// choose a random item to move to the first index, then choose a random other item to move to the second index, etc. "Place" an item in an index by swapping it with the item currently at that index.

// Crucially, once an item is placed at an index it can't be moved. So for the first index, choose from n items, for the second index choose from n−1 items, etc.

// This is a semi-famous algorithm known as the Fisher-Yates shuffle (sometimes called the Knuth shuffle).
// O(n) time and O(1) space.

function getRandom(floor, ceiling) {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
  }
  
function shuffle(array) {
    if (array.length <= 1) return;

    // you can do up to array.length - 1 because let's say there's 5 elements in the array. If 4 elements are randomly sorted, there is no reason to sort the last one since it's already going to be in place. So i will be from 0 ~ 3 (0, 1, 2, 3) 
    for (let i = 0; i < array.length - 1; i++) {

        // Choose a random not-yet-placed item to place there
        // (could also be the item currently in that spot)
        // must be an item AFTER the current item, because the stuff before has all already been placed

        const randomIndex = getRandom(i, array.length - 1);
        if (i !== randomIndex) {
            const chosenValue = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = chosenValue;
        }
    }
    return array;
}


const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
shuffle(sample);
console.log('Shuffled array: ', sample);


