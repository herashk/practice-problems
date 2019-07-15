function factorial(n) {
    // base case 
    if (n === 1) {
        return 1;
    }
    n = n * factorial(n - 1);
    return n;

}

// odd bunnies have 2 ears, even bunnies have 3 years 
// Recursively return the number of "ears" in the bunny line 1, 2, ... n (without loops or multiplication)
//bunnyEars2(0) → 0
// bunnyEars2(1) → 2
// bunnyEars2(2) → 5
function bunnyEars2(n) {
    // base case
    if (n <= 0) return 0;

    let ears = 0;
    if (n % 2 === 0) {
        ears = 3;
    } else {
        ears = 2;
    }
    ears = ears + bunnyEars2(n - 1);
    return ears;
}

/* Given a non-negative int n, return the count of the occurrences of 7 as a digit, so for example 717 yields 2. (no loops). Note that mod (%) by 10 yields the rightmost digit (126 % 10 is 6), while divide (/) by 10 removes the rightmost digit (126 / 10 is 12).

count7(717) → 2
count7(7) → 1
count7(123) → 0
   I DON'T UNDERSTAND THIS ASK MINSEO
   while (string.length) {
            if (string[0] === '7') {
                count++;
            }
            helper(string.slice(1));
        }
*/
function count7(num) {
    let string = num.toString();
    let count = 0;
    function helper(string) {
        if (string.length === 0) {
            return 0;
        }
        if (string[0] === '7') {
            count++;
        }
        helper(string.slice(1));
    }
    helper(string);
    return count;
}

/*
Given a string, compute recursively (no loops) the number of lowercase 'x' chars in the string.
countX("xxhixx") → 4
countX("xhixhix") → 3
countX("hi") → 0 */
function countX(string) {
    if (string.length === 1 && string === 'x') {
        return 1;
    }
    if (string.length === 1 && string !== 'x') {
        return 0;
    }
    let count = 0;
    if (string[0] === 'x') {
        count++;
    }
    count = count + countX(string.slice(1));
    return count;
}

/*

Given a string, compute recursively (no loops) a new string where all appearances of "pi" have been replaced by "3.14".
changePi("xpix") → "x3.14x"
changePi("pipi") → "3.143.14"
changePi("pip") → "3.14p"
*/
function changePi(string) {
    if (string.indexOf('pi') < 0) {
        return string;
    }
    string = string.replace("pi", "3.14");
    return changePi(string);
}

/*Given an array of ints, compute recursively the number of times that the value 11 appears in the array. We'll use the convention of considering only the part of the array that begins at the given index. In this way, a recursive call can pass index+1 to move down the array. The initial call will pass in index as 0.
array11([1, 2, 11], 0) → 1
array11([11, 11], 0) → 2
array11([1, 2, 3, 4], 0) → 0
*/
function array11(arr, index = 0) {
    // base case
    if (index === arr.length) {
        return 0;
    }
    let count = 0;
    if (arr[index] === 11) {
        count++;
    }
    count = count + array11(arr, index + 1);
    return count;
}

function array11(arr, index) {
    let count = 0;

    function helper(arr, index) {
        if (index === arr.length) {
            return 0;
        }
        if (arr[index] === 11) {
            count++;
        }
        helper(arr, index + 1);
    }
    helper(arr, index);
    return count;
}

/*Given a string, compute recursively a new string where identical chars that are adjacent in the original string are separated from each other by a "*".
pairStar("hello") → "hel*lo"
pairStar("xxyy") → "x*xy*y"
pairStar("aaaa") → "a*a*a*a"
*/

function pairStar(string, index = 0) {
    if (index === string.length) {
        return string;
    }
    if (string[index] === string[index+1]) {
        string = string.slice(0, index+1) + '*' + string.slice(index+1);
    }
    return pairStar(string, index + 1);
}


/*Count recursively the total number of "abc" and "aba" substrings that appear in the given string.
countAbc("abc") → 1
countAbc("abcxxabc") → 2
countAbc("abaxxaba") → 2
HOW TO DO THIS WITHOUT MUTATING THE STRING? CAN I?
*/

function countAbc(string) {
    // base case
    if (string.indexOf('abc') < 0 && string.indexOf('aba') < 0) {
        return 0;
    }
    let count = 0;
    if (string.indexOf('abc') >= 0) {
        string = string.replace('abc', '000');
        count++;
    }
    if (string.indexOf('aba') >= 0) {
        string = string.replace('aba', '000');
        count++;
    }
    count = count + countAbc(string);
    return count;
}

/*Given a string, compute recursively the number of times lowercase "hi" appears in the string, however do not count "hi" that have an 'x' immedately before them.
countHi2("ahixhi") → 1
countHi2("ahibhi") → 2
countHi2("xhixhi") → 0
*/

function countHi2(string, index = 0) {
    if (index === string.length) {
        return 0;
    }
    let count = 0;
    if (string[index] === 'h' && string[index+1] === 'i') {
    //   console.log('string[i]', string[i])
    //   console.log('string[i+1]', string[i+1])
    //   console.log('string[i-1]', string[i-1])
        if (string[index-1] !== 'x') {
            count++;
        }
    }
    count = count + countHi2(string, index + 1);
    return count;
}

/*
Given a string and a non-empty substring sub, compute recursively the number of times that sub appears in the string, without the sub strings overlapping.
strCount("catcowcat", "cat") → 2
strCount("catcowcat", "cow") → 1
strCount("catcowcat", "dog") → 0
*/

function strCount(string, sub) {
    if (string.indexOf(sub) < 0) {
        return 0;
    }
    let count = 0;
    let subStartIndex = string.indexOf(sub, 0)
    if (subStartIndex >= 0) {
        count++;
        string = string.slice(0, subStartIndex) + string.slice(subStartIndex + subStartIndex + sub.length)
    }
    count = count + strCount(string, sub);
    return count;
    
}

function bunnyEars(num) {
    if (num === 0) {
        return 0;
    }
    let count = 0;
    if (num > 0) {
        count+=2;
    }
    count = count + bunnyEars(num - 1);
    return count;

}

/*We have triangle made of blocks. The topmost row has 1 block, the next row down has 2 blocks, the next row has 3 blocks, and so on. Compute recursively (no loops or multiplication) the total number of blocks in such a triangle with the given number of rows.
triangle(0) → 0
triangle(1) → 1
triangle(2) → 3, 3 => 6 
*/

function triangle(rows) {
    if (rows === 1) {
        return 1;
    }
    let total = 0;
    total = rows + triangle(rows - 1); // this is to get the very first example
    return total;
}

/*Given a non-negative int n, compute recursively (no loops) the count of the occurrences of 8 as a digit, except that an 8 with another 8 immediately to its left counts double, so 8818 yields 4. Note that mod (%) by 10 yields the rightmost digit (126 % 10 is 6), while divide (/) by 10 removes the rightmost digit (126 / 10 is 12).
count8(8) → 1
count8(818) → 2
count8(8818) → 4
*/
function count8(num) {
    let string = num.toString();
    let count = 0;
    function helper(string) {
        if (string.length === 0) {
          return 0;
        }
        if (string[string.length - 1] === '8' && string[string.length - 1 - 1] === '8') {
            count = count + 2;
        } else if (string[string.length - 1] === '8') {
            count++;
        }
        // console.log('count', count);
        helper(string.slice(0, string.length - 1));
    }
    helper(string);
    return count;
}

/*Given a string, compute recursively (no loops) the number of times lowercase "hi" appears in the string.
countHi("xxhixx") → 1
countHi("xhixhix") → 2
countHi("hi") → 1
*/
function countHi(string) {
    if (string.indexOf('hi') < 0) {
        return 0;
    }
    let count = 0;
    if (string.indexOf('hi') >= 0) {
        count++;
        string = string.replace('hi', '00');
    }
    count = count + countHi(string);
    return count;
}

/*Given a string, compute recursively a new string where all the 'x' chars have been removed.
noX("xaxb") → "ab"
noX("abc") → "abc"
noX("xx") → ""
*/

function noX(string) {
    if (string.indexOf('x') < 0) {
        return string;
    }
    let xIndex = string.indexOf('x');
    if (xIndex >= 0) {
        string = string.slice(0, xIndex) + string.slice(xIndex + 1);
    }
    return noX(string);
}

/*Given an array of ints, compute recursively if the array contains somewhere a value followed in the array by that value times 10. We'll use the convention of considering only the part of the array that begins at the given index. In this way, a recursive call can pass index+1 to move down the array. The initial call will pass in index as 0.
array220([1, 2, 20], 0) → true
array220([3, 30], 0) → true
array220([3], 0) → false
*/
function array220(arr, index) {
    if (index === arr.length) {
        return false;
    }
    if (arr[index + 1] === (arr[index] * 10)) {
        return true;
    }
    return array220(arr, index + 1); // don't forget to return the function
}

/*Given a string, compute recursively a new string where all the lowercase 'x' chars have been moved to the end of the string.
endX("xxre") → "rexx"
endX("xxhixx") → "hixxxx"
endX("xhixhix") → "hihixxx"
REVIEW LATER!!!!
*/
function endX(string) {
    let count = 0;
    let newString;
    function helper(string) {
        if (string.indexOf('x') < 0) {
            return string;
        }
        let xIndex = string.indexOf('x');
        count++;
        newString = string.slice(0, xIndex) + string.slice(xIndex + 1);
        console.log('newString', newString);
        helper(newString);
    }
    helper(string);
    console.log('count', count);
    console.log('string', newString);
    for(let i = 0; i < count; i++) {
        newString += 'x';
    }
    return newString;
}

/*
Given a string, compute recursively (no loops) the number of "11" substrings in the string. The "11" substrings should not overlap.
count11("11abc11") → 2
count11("abc11x11x11") → 3
count11("111") → 1
*/

function count11(string, index = 0) {
    if (index === string.length) {
        return 0;
    }
    let count = 0;
    if (string[index] === '1' && string[index+1] === '1') {
        count++;
    }
    // do this so that you don't count overlapping 1
    if (count > 0) {
        count = count + count11(string, index + 2);
    } else {
        count = count + count11(string, index + 1);
    }
    return count;
}

/*Given a string that contains a single pair of parenthesis, compute recursively a new string made of only of the parenthesis and their contents, so "xyz(abc)123" yields "(abc)".
parenBit("xyz(abc)123") → "(abc)"
parenBit("x(hello)") → "(hello)"
parenBit("(xy)1") → "(xy)"

IS THERE A SIMPLER WAY?
*/

function parenBit(string) {
    let firstParenSeen = false;
    let newString;

    function helper(string, index) {
        index = index || 0;
        if (index >= string.length) {
            return
        }

        if (firstParenSeen) {
            if (string[index] === ')') {
                newString = newString.slice(0, index + 1);
                console.log('newString after )', newString);
                return newString;
            } else {
                newString = string;
                helper(newString, index + 1);
            }
        } 

        if (string[0] === '(') {
            firstParenSeen = true;
            newString = string;
            helper(string, index + 1);
        } else { 
            newString = string.slice(1);
            helper(newString, index);
        }
    }
    helper(string)
    return newString;
}

/*Given a string and a non-empty substring sub, compute recursively if at least n copies of sub appear in the string somewhere, possibly with overlapping. N will be non-negative.
strCopies("catcowcat", "cat", 2) → true
strCopies("catcowcat", "cow", 2) → false
strCopies("catcowcat", "cow", 1) → true
*/

function strCopies(string, sub, count) {
    
    let occur = 0;
    function helper(string, sub) {
        if (string.indexOf(sub) < 0) {
            return 0;
        }
        let subIndex = string.indexOf(sub, 0);
        if (string.indexOf(sub) >= 0) {
            occur++;
            string = string.slice(0, subIndex) + string.slice(subIndex + sub.length);
        }
        helper(string, sub);
    }
    helper(string, sub);
    if (count === occur) {
        return true;
    } else {
        return false;
    }
}

//0, 1, 1, 2, 3, 5, 8, 13, 21
// fibonacci(0) → 0
// fibonacci(1) → 1
// fibonacci(2) → 1
function fibonacci(num) {
    if (num === 0) {
        return 0;
    }
    if (num > 0 && num <=2) {
        return 1;
    }
    let total = fibonacci(num - 1) + fibonacci(num - 2);
    return total;
}

/*Given a non-negative int n, return the sum of its digits recursively (no loops). Note that mod (%) by 10 yields the rightmost digit (126 % 10 is 6), while divide (/) by 10 removes the rightmost digit (126 / 10 is 12).
sumDigits(126) → 9
sumDigits(49) → 13
sumDigits(12) → 3
*/
function sumDigits(num) {
    if (Math.floor(num / 10) === 0) {
        return num;
    }
    let sum = 0;
    sum = num % 10;
    sum = sum + sumDigits(Math.floor(num / 10));
    return sum;
}

/*
Given base and n that are both 1 or more, compute recursively (no loops) the value of base to the n power, so powerN(3, 2) is 9 (3 squared).
powerN(3, 1) → 3
powerN(3, 2) → 9
powerN(3, 3) → 27
*/

function powerN(num, power) {
    if (power === 1) {
        return num;
    }
    num = num * powerN(num, power - 1);
    return num;
}

/*Given a string, compute recursively (no loops) a new string where all the lowercase 'x' chars have been changed to 'y' chars.
changeXY("codex") → "codey"
changeXY("xxhixx") → "yyhiyy"
changeXY("xhixhix") → "yhiyhiy"
*/
function changeXY(string, index = 0) {
    if (index === string.length) {
        return string;
    }
    if (string[index] === 'x') {
        string = string.replace(string[index], 'y');
    }
    return changeXY(string, index + 1);
}

/*Given an array of ints, compute recursively if the array contains a 6. We'll use the convention of considering only the part of the array that begins at the given index. In this way, a recursive call can pass index+1 to move down the array. The initial call will pass in index as 0.
array6([1, 6, 4], 0) → true
array6([1, 4], 0) → false
array6([6], 0) → true
*/

function array6(arr, index) {
    if (index === arr.length) {
        return false;
    }
    if (arr[index] === 6) {
        return true;
    }
    return array6(arr, index + 1);
}

/*
Given a string, compute recursively a new string where all the adjacent chars are now separated by a "*".
allStar("hello") → "h*e*l*l*o"
allStar("abc") → "a*b*c"
allStar("ab") → "a*b"
*/

function allStar(string, index = 0) {
    if (index >= string.length) {
        return string;
    }
    string = string.slice(0, index+1) + '*' + string.slice(index+1);
    return allStar(string, index + 2);
}

/*
We'll say that a "pair" in a string is two instances of a char separated by a char. So "AxA" the A's make a pair. Pair's can overlap, so "AxAxA" contains 3 pairs -- 2 for A and 1 for x. Recursively compute the number of pairs in the given string.
countPairs("axa") → 1
countPairs("axax") → 2
countPairs("axbx") → 1
*/

function countPairs(string) {
    if (string.length < 3) {
        return 0;
    }
    let count = 0;
    const char = string[0];
    if (char !== string[1] && char === string[2]) {
        count++;
    }
    count = count + countPairs(string.slice(1));
    return count;
}

/*
Given a string, return recursively a "cleaned" string where adjacent chars that are the same have been reduced to a single char. So "yyzzza" yields "yza".
stringClean("yyzzza") → "yza"
stringClean("abbbcdd") → "abcd"
stringClean("Hello") → "Helo"
*/
function stringClean(string, index = 0) {
    if (index >= string.length) {
        return string;
    }
    let sliced = false;
    if (string[index] === string[index+1]) {
        string = string.slice(0, index+1) + string.slice(index+2);
        sliced = true;
    }
    if (sliced) {
        return stringClean(string, index);
    } else {
        return stringClean(string, index + 1);
    }
}

/*Given a string, return true if it is a nesting of zero or more pairs of parenthesis, like "(())" or "((()))". Suggestion: check the first and last chars, and then recur on what's inside them.
nestParen("(())") → true
nestParen("((()))") → true
nestParen("(((x))") → false
*/

function nestParen(string, start, end) {
    start = start || 0;
    end = end || string.length - 1;
    if (start === end) {
        return false;
    }
    if (string[end] !== ')' && string[start] !== '(') {
        return false;
    }
    if ((end === start + 1)) {
        if ((string[end] === ')' && string[start] === '(')) {
            return true;
        } else if ((string[end] === ')' && string[start] === '(')) {
            return true;
        } else {
            return false;
        }
    }
    return nestParen(string, start + 1, end - 1);

}

/*
Given a string and a non-empty substring sub, compute recursively the largest substring which starts and ends with sub and return its length.
strDist("catcowcat", "cat") → 9
strDist("catcowcat", "cow") → 3
strDist("cccatcowcatxx", "cat") → 9

IS THERE A EASIER WAY?
*/
function strDist(string, sub) {
    let startIndex = -1;
    let endIndex = -1;

    function helper(string, sub, index) {
        index = index || 0;
        if (index >= string.length) {
            return;
        }
        if (startIndex < 0) {
            if (string.indexOf(sub, index) >= 0) {
                startIndex = string.indexOf(sub, index);
                console.log('start', startIndex)
                helper(string, sub, startIndex + sub.length);
            } else {
                return false;
            }
        }
         if (startIndex > -1 && (string.indexOf(sub, index) >= 0)) {
            endIndex = string.indexOf(sub, index);
            console.log('end', endIndex);
            helper(string, sub, endIndex + sub.length);
        } else if (startIndex > -1 && (string.indexOf(sub, index) < 0) && endIndex > -1) {
            endIndex = endIndex;
           console.log('end', endIndex);
            return;
        } else if (startIndex > -1 && (string.indexOf(sub, index) < 0)) {
            endIndex = startIndex;
            console.log('end', endIndex);
            return;
        } 
    }
   
    helper(string, sub);
     console.log('startIndex', startIndex);
    console.log('endIndex :', endIndex);
    return endIndex - startIndex + sub.length;
}