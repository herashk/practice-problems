// You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

// Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

// For example, given:
//   [1, 7, 3, 4]

// your function would return:
//   [84, 12, 28, 21]
 
// by calculating:
//   [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]
 
// Here's the catch: You can't use division in your solution!

function getProductsOfAllIntsExceptAtIndex(intArray) {

    let result = [];
    let index = 0;
    for (let i = 0; i < intArray.length; i++) {
        let copy = intArray.slice(0);
        copy.splice(i, 1);
        let multiplied = copy.reduce((a, b) => a * b);
        result.push(multiplied);
    }
    return result;
}

function multiplyHelper(arr) {
    let result = 1;
    for (let i = 0; i < arr.length; i++) {
        result = result * arr[i];
    }
    return result;
}


// But we can do better.
// The product of all integers except the integer at each index can be broken down into two pieces
// 1) product of all integers before each index AND 2) the product of all integers after each index

// make an array, productOfAllIntsBeforeIndex
const productsOfAllIntsBeforeIndex = [];

// For each integer, find the product of all the integers before it, storing the total product so far each time
let productSoFar = 1;
for (let i = 0; i < intArray.length; i++) {
  productsOfAllIntsBeforeIndex[i] = productSoFar;
  productSoFar *= intArray[i];
}

// Now, how can we find the products of all the integers after each index? walk the array backwards
const productsOfAllIntsAfterIndex = [];

let productSoFar = 1;
for (let i = intArray.length - 1; i >= 0; i--) {
  productsOfAllIntsAfterIndex[i] = productSoFar;
  productSoFar *= intArray[i];
}

// we need
// productsOfAllIntsBeforeIndex
// productsOfAllIntsAfterIndex
// productsOfAllIntsExceptAtIndex

// Well, we want the product of all the integers before an index and the product of all the integers after an index. We just need to multiply every integer in productsOfAllIntsBeforeIndex with the integer at the same index in productsOfAllIntsAfterIndex!
  

function getProductsOfAllIntsExceptAtIndex(intArray) {
    if (intArray.length < 2) throw error;
    
    const finalProducts = [];
    
    let productSoFar = 1;
    for (let i = 0; i < intArray.length; i++) {
      finalProducts[i] = productSoFar;
      productSoFar *= intArray[i];
    }
    
    productSoFar = 1;
    for (let j = intArray.length - 1; j >= 0; j--) {
      finalProducts[j] *= productSoFar;
      productSoFar *= intArray[j];
    }
    return finalProducts;
  }
  
  
  // Tests
  
  let desc = 'short array';
  let actual = getProductsOfAllIntsExceptAtIndex([1, 2, 3]);
  let expected = [6, 3, 2];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'longer array',
  actual = getProductsOfAllIntsExceptAtIndex([8, 2, 4, 3, 1, 5]);
  expected = [120, 480, 240, 320, 960, 192];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'array has one zero',
  actual = getProductsOfAllIntsExceptAtIndex([6, 2, 0, 3]);
  expected = [0, 0, 36, 0];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'array has two zeros';
  actual = getProductsOfAllIntsExceptAtIndex([4, 0, 9, 1, 0]);
  expected = [0, 0, 0, 0, 0];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'one negative number';
  actual = getProductsOfAllIntsExceptAtIndex([-3, 8, 4]);
  expected = [32, -12, -24];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'all negative numbers';
  actual = getProductsOfAllIntsExceptAtIndex([-7, -1, -4, -2]);
  expected = [-8, -56, -14, -28];
  assertArrayEquals(actual, expected, desc);
  
  desc = 'error with empty array';
  const emptyArray = () => (getProductsOfAllIntsExceptAtIndex([]));
  assertThrowsError(emptyArray, desc);
  
  desc = 'error with one number';
  const oneNumber = () => (getProductsOfAllIntsExceptAtIndex([1]));
  assertThrowsError(oneNumber, desc);
  
  function assertArrayEquals(a, b, desc) {
    const arrayA = JSON.stringify(a);
    const arrayB = JSON.stringify(b);
    if (arrayA !== arrayB) {
      console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`)
    } else {
      console.log(`${desc} ... PASS`);
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