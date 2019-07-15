// write a recursive function for generating all permutations of an input string. Return them as a set.
function getPermutations(string) {
    
    // base case is when the string's length is less or equal to 1
    if (string.length <= 1) {
        return new Set([string]);
    }

    const exceptLast = string.slice(0, -1);
    const lastChar = string[string.length - 1];

    const permutationsExceptLast = getPermutations(exceptLast);
    console.log('permuations except last', permutationsExceptLast)

    const set = new Set();
    permutationsExceptLast.forEach(permutationsExceptLast => {
        for (let pos = 0; pos <= exceptLast.length; pos++) {
            const permutation = permutationsExceptLast.slice(0, pos) + lastChar + permutationsExceptLast.slice(pos);
            set.add(permutation);
            console.log('set', set);
        }

    })
    return set;
    
    
}

