// binary search algorithm - finds an item in a sorted array in O(log n) time


// 1,3,6,7,8,9 - target 3
function binarySearch(target, arr) {
    if (arr.length === 1) return arr;
    if (arr.length < 1) return false;

    let start = 0;
    let end = arr.length;

    while (start < end) {
        const halfPoint = Math.floor((end - start) / 2);
        const guessIndex = start + halfPoint;

        const guessValue = arr[guessIndex];
        if (target === guessValue) {
            return true;
        }
        if (guessValue > target) {
            end = guessIndex;
        } else {
            start = guessIndex;
        }
    }
    return false;
}