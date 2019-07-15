const message = [ 'c', 'a', 'k', 'e', ' ',
'p', 'o', 'u', 'n', 'd', ' ',
's', 't', 'e', 'a', 'l' ];

reverseWords(message);

console.log(message.join(''));
// Prints: 'steal pound cake'

// My solution
function reverseWords(message) {
    let joined = message.join('').split(' ');
    let swapped = swap(joined).join(' ');
    console.log('swapped ----->', swapped)
    return swapped;
 }
 
 
 function swap(message) {
     let start = 0;
     let end = message.length - 1;
     while (start < end) {
         let temp = message[start];
         message[start] = message[end];
         message[end] = temp;
         start++;
         end--;
     }
     return message;
 }

 // O(1) space, O(n) time
 // tweak the swap function take in start and end indexes
 function swap(message, start, end) {
    while (start < end) {
        let temp = message[start];
        message[start] = message[end];
        message[end] = temp;
        start++;
        end--;
    }
    return message;
}

function reverseWords(message) {
    // swap the whole array so that the words are in order 
    swap(message, 0, message.length - 1); 
    // but the characters are backwards so let's reverse them
    let currentStart = 0;
    for (let i = 0; i <= message.length; i++) {
        if (message[i] === ' ' || i === message.length) {
            swap(message, currentStart, i - 1);
            currentStart = i + 1;
        }
    }
    return message;
 }
