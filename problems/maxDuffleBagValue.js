// unbounded knapsack problem
// limited number of types of cake but unlimited supply of each type
// each type of cake has a weight and a value, stored in an object with two properties: 1) weight: weight of cake in kg, 2) value: monetary value of cake in British shillings

// { weight: 7, value: 160 }
// { weight: 3, value: 90 }

// you brought a duffle bag that can hold limited weight and you want to make off with most valuable haul possible. Write a function maxDuffleBagValue that takes an array of cake type objects and a weight capacity and returns the maximum moetary value the duffel bag can hold

const cakeTypes = [
    { weight: 7, value: 160 },
    { weight: 3, value: 90 },
    { weight: 2, value: 15 },
  ];
  
  const capacity = 20;
  
  maxDuffelBagValue(cakeTypes, capacity);
  // Returns 555 (6 of the middle type of cake and 1 of the last type of cake)

// need a way to store and update all the max monetary values for each capacity 
// use a bottom up approach to find the max value at the duffel bag's weightCapacity by finding the max value at every capacity from 0 to weightCapacity
// allocate an array maxValues atCapacities wehre the indices are capacities and each value is the max value at that capacity. For each capacity, you want to know the max monetary value you can carry - that is 1) that cake's value plus the best monetary value you can carry in the remaining duffel bag capacity after taking the cake. 


function maxDuffelBagValue(cakeTypes, weightCapacity) {

    // We make an array to hold the maximum possible value at every duffel bag weight capacity from 0 to weightCapacity starting each index with value 0
    const maxValuesAtCapacities = new Array(weightCapacity + 1).fill(0);
  
    for (let currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {
  
      // Set a variable to hold the max monetary value so far for currentCapacity
      let currentMaxValue = 0;
  
      // We use a for loop here instead of forEach because we return infinity if we get a cakeType that weighs nothing and has a value. but forEach loops always return undefined and you can't break out of them without throwing an exception
      for (let j = 0; j < cakeTypes.length; j++) {
        const cakeType = cakeTypes[j];
  
        // If a cake weighs 0 and has a positive value the value of our duffel bag is infinite!
        if (cakeType.weight === 0 && cakeType.value !== 0) {
          return Infinity;
        }
  
        // If the current cake weighs as much or less than the current weight capacity
        // it's possible taking the cake would get a better value
        if (cakeType.weight <= currentCapacity) {
  
          // So we check: should we use the cake or not?
          // If we use the cake, the most kilograms we can include in addition to the cake we're adding is the current capacity minus the cake's weight. we find the max value at that integer capacity in our array maxValuesAtCapacities
          const maxValueUsingCake = cakeType.value
            + maxValuesAtCapacities[currentCapacity - cakeType.weight];
  
          // Now we see if it's worth taking the cake. how does the
          // value with the cake compare to the currentMaxValue?
          currentMaxValue = Math.max(maxValueUsingCake, currentMaxValue);
        }
      }
  
      // Add each capacity's max value to our array so we can use them
      // when calculating all the remaining capacities
      maxValuesAtCapacities[currentCapacity] = currentMaxValue;
    }
  
    return maxValuesAtCapacities[weightCapacity];
  }
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'one cake';
  let actual = maxDuffelBagValue([{ weight: 2, value: 1 }], 9);
  let expected = 4;
  assertEqual(actual, expected, desc);
  
  desc = 'two cakes';
  actual = maxDuffelBagValue([
    { weight: 4, value: 4 },
    { weight: 5, value: 5}], 9);
  expected = 9;
  assertEqual(actual, expected, desc);
  
  desc = 'only take less valuable cake';
  actual = maxDuffelBagValue([
    { weight: 4, value: 4 },
    { weight: 5, value: 5 }], 12);
  expected = 12;
  assertEqual(actual, expected, desc);
  
  desc = 'lots of cakes';
  actual = maxDuffelBagValue([
    { weight: 2, value: 3 },
    { weight: 3, value: 6 },
    { weight: 5, value: 1 },
    { weight: 6, value: 1 },
    { weight: 7, value: 1 },
    { weight: 8, value: 1 }], 7);
  expected = 12;
  assertEqual(actual, expected, desc);
  
  desc = 'value to weight ratio is not optimal';
  actual = maxDuffelBagValue([
    { weight: 51, value: 52 },
    { weight: 50, value: 50 }], 100);
  expected = 100;
  assertEqual(actual, expected, desc);
  
  desc = 'zero capacity';
  actual = maxDuffelBagValue([{ weight: 1, value: 2 }], 0);
  expected = 0;
  assertEqual(actual, expected, desc);
  
  desc = 'cake with zero value and weight';
  actual = maxDuffelBagValue([
    { weight: 0, value: 0 },
    { weight: 2, value: 1 }], 7);
  expected = 3;
  assertEqual(actual, expected, desc);
  
  desc = 'cake with non-zero value and zero weight';
  actual = maxDuffelBagValue([{ weight: 0, value: 5 }], 5);
  assertEqual(isFinite(actual), false, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }