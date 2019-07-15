
let desc = 'both halves are the same length';
let actual = isSingleRiffle([1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6]);
assertEquals(actual, true, desc);

desc = 'halves are different lengths';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 2, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'one half is empty';
actual = isSingleRiffle([], [2, 3, 6], [2, 3, 6]);
assertEquals(actual, true, desc);

desc = 'shuffled deck is missing cards';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'shuffled deck has extra cards';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8]);
assertEquals(actual, false, desc);


function isSingleRiffle(half1, half2, shuffledDeck) {
    let merged = mergeArrays(half1, half2);
    for (let i = 0; i < shuffledDeck.length; i++) {
        if (merged[i] !== shuffledDeck[i]) {
            return false;
        }
    }
    return true;
  };
  
  function mergeArrays(myArray, alicesArray) {
      let result = [];
      let count = 0;
      while (myArray.length && alicesArray.length) {
          if (myArray[0] <= alicesArray[0]) {
              result.push(myArray.shift());
          } else {
              result.push(alicesArray.shift());
          }
      }
      if (alicesArray.length) {
          result = result.concat(alicesArray);
      }
      if (myArray.length) {
          result = result.concat(myArray);
      }
      return result;
  }
  

  // O(n) time O(1) time
  function isFirstComeFirstServed(takeOut, dineIn, servedOrders) {
    var takeOutIndex = 0;
    var dineInIndex = 0;
    var takeOutMaxIndex = takeOut.length - 1;
    var dineInMaxIndex = dineIn.length - 1;

    for (var i = 0; i < servedOrders.length; i++) {
        var order = servedOrders[i];

        // if we still have orders in takeOut
        // and the current order in takeOut is the same
        // as the current order in servedOrders
        if (takeOutIndex <= takeOutMaxIndex &&
                order === takeOut[takeOutIndex]) {
            takeOutIndex++;

        // if we still have orders in dineIn
        // and the current order in dineIn is the same
        // as the current order in servedOrders
        } else if (dineInIndex <= dineInMaxIndex &&
                order === dineIn[dineInIndex]) {
            dineInIndex++;

        // if the current order in servedOrders doesn't match the current
        // order in takeOut or dineIn, then we're not serving first-come,
        // first-served
        } else {
            return false;
        }
    }

    // all orders in servedOrders have been "accounted for"
    // so we're serving first-come, first-served!
    return true;
}