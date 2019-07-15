// write a function that given an amount of money and an array of coin denominations, computes the number of ways to make the amount of money with the coins of the vailable denominations. Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 44—the number of ways to make 4¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢

function changePossibilities(amountLeft, denominations, currentIndex = 0) {

    if (amountLeft === 0) {
        return 1; // found a possibility
    }
    if (amountLeft < 0) {
        return 0; // combination of coin exceeds amountLeft/too many coins
    }
    if (currentIndex === denominations.length) {
        return 0; // ran out of denominations
    }
    console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');

    const currentCoin = denominations[currentIndex];

    let possibilities = 0;
    while (amountLeft >= 0) {
        possibilities += changePossibilities(amountLeft, denominations, currentIndex + 1);
        amountLeft = amountLeft - currentCoin;
    }
    return possibilities;
}
  
// memoization
class Change {
    constructor() {
      this.memo = {};
    }
  
    changePossibilitiesTopDown(amountLeft, denominations, currentIndex = 0) {
  
      // Check our memo and short-circuit if we've already solved this one
      const memoKey = [amountLeft, currentIndex].join(', ');
      if (this.memo.hasOwnProperty(memoKey)) {
        console.log('grabbing memo [' + memoKey + ']');
        return this.memo[memoKey];
      }
  
      // Base cases:
      // We hit the amount spot on. yes!
      if (amountLeft === 0) return 1;
  
      // We overshot the amount left (used too many coins)
      if (amountLeft < 0) return 0;
  
      // We're out of denominations
      if (currentIndex === denominations.length) return 0;
  
      console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');
  
      // Choose a current coin
      const currentCoin = denominations[currentIndex];
  
      // See how many possibilities we can get
      // for each number of times to use currentCoin
      let numPossibilities = 0;
      while (amountLeft >= 0) {
        numPossibilities += this.changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
        amountLeft -= currentCoin;
      }
  
      // Save the answer in our memo so we don't compute it again
      this.memo[memoKey] = numPossibilities;
      return numPossibilities;
    }
  }
  
  // to avoid recursion, use bottom up approach
  function changePossibilitiesBottomUp(amount, denominations) {

    // Initialize an array of zeros with indices up to amount
    const waysOfDoingNcents = new Array(amount + 1).fill(0);
    waysOfDoingNcents[0] = 1;
  
    denominations.forEach(coin => {
      for (let higherAmount = coin; higherAmount <= amount; higherAmount++) {
        const higherAmountRemainder = higherAmount - coin;
        waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
      }
    });
  
    return waysOfDoingNcents[amount];
  }
  
  
  
  // Tests
  
  let desc = 'sample input';
  let actual = changePossibilities(4, [1, 2, 3]);
  let expected = 4;
  assertEqual(actual, expected, desc);
  
  desc = 'one way to make zero cents';
  actual = changePossibilities(0, [1, 2]);
  expected = 1;
  assertEqual(actual, expected, desc);
  
  desc = 'no ways if no coins';
  actual = changePossibilities(1, []);
  expected = 0;
  assertEqual(actual, expected, desc);
  
  desc = 'big coin value';
  actual = changePossibilities(5, [25, 50]);
  expected = 0;
  assertEqual(actual, expected, desc);
  
  desc = 'big target amount';
  actual = changePossibilities(50, [5, 10]);
  expected = 6;
  assertEqual(actual, expected, desc);
  
  desc = 'change for one dollar';
  actual = changePossibilities(100, [1, 5, 10, 25, 50]);
  expected = 292;
  assertEqual(actual, expected, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }