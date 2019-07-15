// same as the singleRiffle question

// recursive solution, O(n^2) time and space / quadratic
// since this includes a .slice each recursive call, this is a common series/sum of integers
function isFirstComeFirstServed(takeOut, dineIn, servedOrders) {
    // base case
    if (serverdOrders.length === 0) {
        return true;
    }

    if (takeOut.length && takeOut[0] === serverdOrders[0]) {
        return isFirstComeFirstServed(takeOut.slice(1), dineIn, serverdOrders.slice(1));
    } else if (dineIn.length && dineIn[0] === servedOrders[0]) {
        return isFirstComeFirstServed(takeOut, dineIn.slice(1), servedOrders.slice(1));
    } else {
        return false;
    }
}

// We can avoid having quadratic time complexity by NOT slicing the array and just keeping track of
// indices in the array
// this gets the time complexity down to O(n) but we still take O(n) space in the call stack because of recursion. We can write this iteratively to get the memory cost down to O(1)
function isSingleRiffle(takeOut, dineIn, servedOrders, takeOutIndex, dineInIndex, servedOrdersIndex) {
    takeOutIndex = takeOutIndex || 0;
    dineInIndex = dineInIndex || 0;
    servedOrdersIndex = servedOrdersIndex || 0;

    if (servedOrdersIndex === servedOrders.length) {
        return true;
    }

    if (takeOutIndex < takeOut.length && takeOut[takeOutIndex] === servedOrders[servedOrdersIndex]) {
        takeOutIndex++;
        servedOrdersIndex++;
    } else if (dineInIndex < dineIn.length && dineIn[dineInIndex] === servedOrders[servedOrdersIndex]) {
        dineInIndex++;
        servedOrdersIndex++;
    } else {
        return false;
    }
    return isSingleRiffle(takeOut, dineIn, servedOrders, takeOutIndex, dineInIndex, servedOrdersIndex);
}

//What's happening in each iteration of our recursive function? Sometimes we're taking a customer order out of takeOut and sometimes we're taking a customer order out of dineIn, but we're always taking a customer order out of servedOrders.

// So what if instead of taking customer orders out of servedOrders 1-by-1, we iterated over them?


// O(n) time and O(1) space
// keep pointers to current index in takeOut, dineIn, and servedOrders
// walk through servedOrders(loop)
// if current order in servedOrders is the same as the current customer order in takeOut, increment takeOutIndex and keep going. This is like checking off the current customer order in takeOut and servedOrders, reducing the problem to the remaining customer orders in the arrays
// do the same for dineIn
// if the current order is NOT the same as the customer order at the front of takeOut or dineIn, we know something is gone wrong and we are not serving food first come first served
// if we make it to the end of servedOrders, return true;

function isFirstComeFirstServed(takeOut, dineIn, servedOrders) {
    let takeOutIndex = 0;
    let dineInIndex = 0;

    for (let i = 0; i < servedOrders.length; i++) {
        let current = servedOrders[i];

        if (current === takeOut[takeOutIndex]) {
            takeOutIndex++;
        } else if (current === dineIn[dineInIndex]) {
            dineInIndex++;
        } else {
            return false;
        }
    }
    return true;
}

// improved - this checks if we still have orders in takeOut and dineIn
function isFirstComeFirstServed(takeOut, dineIn, servedOrders) {
    let takeOutIndex = 0;
    let dineInIndex = 0;

    for (let i = 0; i < servedOrders.length; i++) {
        let current = servedOrders[i];

        if (takeOutIndex <= takeOut.length - 1 && current === takeOut[takeOutIndex]) {
            takeOutIndex++;
        } else if (dineInIndex <= dineIn.length - 1 && current === dineIn[dineInIndex]) {
            dineInIndex++;
        } else {
            return false;
        }
    }
    return true;
}