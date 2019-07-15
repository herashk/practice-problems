// We have an array of integers, where: The integers are in the range 1..n1..n
// The array has a length of n+1
// It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.
// Write a function which finds an integer that appears more than once in our array. (If there are multiple duplicates, you only need to find one of them.)

// O(n) time and space. Can we do better? O(n) space is pretty high!
function findRepeat(numbers) {
    const numbersSeen = {};

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (numbersSeen[number]) {
            return number;
        }
        numbersSeen[number] = true;
    }
    throw error;
}

// how can we break this problem down into sub-problems? - using binary search
// but array is not sorted. What if we cut the problem in half a different way??
// in this problem, we are looking for a repeat in an array. What if we cut the set of possibilities for the duplicate in half?
// full range of options is 1..n. How can we test whether the duplicate is in the first half of that range or the second half?
// if n is 6, n/2 = 3 and n/2 + 1 = 4 so the range is from 1 - 3, and 4 - 6
// if n is 5, n/2 = 2 (throw away remainder) and n/2 + 1 is 3 so the range is 1 - 2 and 3 - 5;
// so ranges aren't necessarily the same size and they do NOT overlap
// taken together, they repesent the original input array's range of 1..n. 
// how can we know if the duplicate is in the first half or the second half?
// we know there is at least one repeat because there are n + 1 and they are all in the range 1..n which contains n distinct integers
// "we have more items than we have possibilities, we must have at least one repeat" - pigeonhole principle
// The pigeonhole principle states that if n items are put into m containers, with n > m, then at least one container must contain more than one item. For example, there must be at least two left gloves or two right gloves in a group of three gloves.
// if we separate the input array into 2 subarrays - 1 containing items in the first range and 2 containing second range, each subarray will have a number of elements as well as a number of possible distinct integers / length of the range of possible integers it holds
// the sum of subarrays' numbers of elements is n + 1 (which is the number of elements in the original input array)
// then the sum of the subarrays' number of possible distinct integers is n (number of possible distinct integers in the original input array)
// since the sums of the subarrays' numbers of elements must be 1 greater than the sumb of subarrays' numbers of possible distinct integers, one of the subarrays must have at least one more element than it has possible distinct integers

/*
1) find the number of integers in input array (within the range 1.. n/2)
2) compare that to the number of possible unique integers in the same range
3) if number of actual integers is greater than the number of possible integers, we know there is a duplicate in the range 1.. n/2. So we iteratively use the same approach on that range;
4) if the number of actual integers is NOT greater than the number of possible integers, we know there must be duplicate in the second range. So we iteratively use the same approach on that range. 
5) at some point the range will contain just 1 integer, which will be the answer
*/

function findRepeat(numbers) {
    let start = 1;
     let end = numbers.length - 1;
 
     while (start < end) {
         const midPoint = Math.floor(((end - start) / 2) + start);
         const firstRangeStart = start;
         const firstRangeEnd = midPoint;
         const secondRangeStart = midPoint + 1;
         const secondRangeEnd = end;
 
         const possibleDistinctInts = firstRangeEnd - firstRangeStart + 1;
 
         // count items in first rnage
         let itemsInFirst = 0;
         numbers.forEach(item => {
             // is it in first range
             if (item >= firstRangeStart && item <= firstRangeEnd) {
                 itemsInFirst++;
             }
         })
         if (itemsInFirst > possibleDistinctInts) {
             // there's a duplicate in the first rnage
             // so use the same approach iteratively on that range
             start = firstRangeStart;
             end = firstRangeEnd;
         } else {
             start = secondRangeStart;
             end = secondRangeEnd;
         }
     }
     return start;
 }

// Tests

let desc = 'just the repeated number';
let actual = findRepeat([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findRepeat([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findRepeat([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findRepeat([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}