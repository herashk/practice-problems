/*
You are given a string representing an attendance record for a student. The record only contains the following three characters:
'A' : Absent.
'L' : Late.
'P' : Present.
A student could be rewarded if his attendance record doesn't contain more than one 'A' (absent) or more than two continuous 'L' (late)
You need to return whether the student could be rewarded according to his attendance record.

Example 1:
Input: "PPALLP"
Output: True

Example 2:
Input: "PPALLL"
Output: False

Obviously this problem is better solved by just having a single loop but I wanted to practice recursion
*/
function checkRecord(string) {
    let countA = 0;
    let continousL = 0;
    function helper(string, index) {
        index = index || 0;
        if (index >= string.length) {
            return;
        }
        if (countA > 1) {
            return;
        }
        if (string[index] === 'A') {
            countA++;
        }
        if (string[index] === 'L' && string[index+1] === 'L' && string[index+2] === 'L') {
            continousL++;
        }
        helper(string, index + 1);
    }
    helper(string);
    if (continousL > 0) {
        return false;
    }
    if (countA > 1) {
        return false;
    }
    return true;
}

//Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
function reverseString(string, start, end) {
    start = start || 0;
    end = end || string.length - 1;
   
    // base case - this means the pointers are overlapping or meeting in the middle
    if (end <= start) {
        return string;
    }
    let temp = string[start];
    string[start] = string[end];
    string[end] = temp;

    return reverseString(string, start + 1, end - 1);
}

/* Given a linked list, swap every two adjacent nodes and return its head. You may not modify the values in the list's nodes, only nodes itself may be changed. 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * param listNode head, return listNode
*/
function swapPairs(head) {
    // base case
    if (head === null || head.next === null) {
        return head;
    }
    let temp = head.val;
    head.val = head.next.val;
    head.next.val = temp;
    swapPairs(head.next.next);
    return head;
}

// IMPORTANT = recurrence relation: the relationship between the result of a problem and the result of its subproblems.
// to implement a recursive function we simply call the function itself according to the recurrence relation until we reach the base case.

/*Given a non-negative integer numRows, generate the first numRows of Pascal's triangle. (hard, review again!)
Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
*/
function pascals(numRows) {
    let result = [];
    if (numRows === 0) {
        return [];
    }
    for (let i = 0; i < numRows; i++) {
        result.push([])
    }
    console.log('result', result);
    result[0][0] = 1; // top of the triangle
    populate(numRows, result, 1);
    return result;
}
function populate(numRows, resultArray, currentRow) {
    if (currentRow === numRows) {
        return resultArray;
    }
    resultArray[currentRow][0] = 1;
    resultArray[currentRow][currentRow] = 1;
    for (let i = 1; i < currentRow; i++) {
        resultArray[currentRow][i] = resultArray[currentRow - 1][i - 1] + resultArray[currentRow - 1][i];
    }
    populate(numRows, resultArray, currentRow + 1)
}



// into 1 function
const generatePascals = function(numRows) {
    let result = [];
    if (numRows === 0) {
        return [];
    }
    for (let i = 0; i < numRows; i++) {
        result.push([])
    }
    result[0][0] = 1; // this is the top of the pascal's triangle
    
        function helper(numRows, currentRow) {
            if (currentRow === numRows) {
                return result;
            }
            // this fills up the side
            result[currentRow][0] = 1;
            result[currentRow][currentRow] = 1;
            for (let j = 1; j < currentRow; j++) {
                result[currentRow][j] = result[currentRow - 1][j - 1] + result[currentRow - 1][j]
            }
            helper(numRows, currentRow + 1);
        }
    // start from 1 because the 0th row is filled out
    helper(numRows, 1);
    return result;
};


 


/* Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle. Note that the row index starts from 0.
Input: 3
Output: [1,3,3,1]
*/

// previousRow [1]
// currentRow [1, 1]
// previousRow [1, 1]
// currentRow [1, 2, 1]
// previousRow [1, 2, 1]
// currentRow [1, 3, 3, 1]
const getPascalsRow = function(row) {
   // you want to popoulate the previous rows

   // base case
   if (rows === 0) {
       return [1];
   }
   let previousRow = getPascalsRow(row - 1);
   let currentRow = []; // need to fill this
   for (let i = 0; i <= row; i++) {
       if (i === 0 || i === row) {
           currentRow.push(1);
       } else {
           currentRow.push(previousRow[i - 1] + previousRow[i]);
       }
   }
   console.log('previousRow :', previousRow);
   console.log('currentRow :', currentRow);
   // since this function is returning currentRow, previousRow becomes currentRow in the next callstack
   return currentRow;
}

/*Reverse a singly linked list.
Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

A linked list can be reversed either iteratively or recursively. Could you implement both? 
TRICKEY! O(n) time and space
*/
function reverseList(head) {
    if (head === null || head.next === null) {
        return head;
    }
    let newHead = reverseList(head.next); // this effectively puts the tail as the newHead at the bottom of the call stack
    head.next.next = head; 
    head.next = null;
    return newHead;
}

// newHead ListNode { val: 5, next: null }
// head ListNode { val: 4, next: ListNode { val: 5, next: null } }

// newHead ListNode { val: 5, next: ListNode { val: 4, next: null } }
// head ListNode { val: 3, next: ListNode { val: 4, next: null } }

// newHead ListNode {
//   val: 5,
//   next: ListNode { val: 4, next: ListNode { val: 3, next: null } } }
// head ListNode { val: 2, next: ListNode { val: 3, next: null } }

// newHead ListNode {
//   val: 5,
//   next:
//    ListNode { val: 4, next: ListNode { val: 3, next: [ListNode] } } }
// head ListNode { val: 1, next: ListNode { val: 2, next: null } }

// 맨날 헷갈림!!
// While you are traversing the list, change the current node's next pointer to point to its previous element. Since a node does not have reference to its previous node, you must store its previous element beforehand. You also need another pointer to store the next node before changing the reference. Do not forget to return the new head reference at the end!
// O(n) time O(1) space
function reverseListIterative(head) {
    if (!head) {
        return;
    }
    let previous = null;
    while (head) {
       let next = head.next;
       head.next = previous;
       previous = head;
       head = next;
    }
    return previous;
}