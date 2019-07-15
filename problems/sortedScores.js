// Write a function that takes:

// an array of unsortedScores
// the highestPossibleScore in the game
// and returns a sorted array of scores in less than O(n log n) time.

// For example:

// const unsortedScores = [37, 89, 41, 65, 91, 53];
// const HIGHEST_POSSIBLE_SCORE = 100;

// sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
// returns [91, 89, 65, 53, 41, 37]


function sortScores(unorderedScores, highestPossibleScore) {
    const scores = new Array(highestPossibleScore + 1).fill(0);
    unorderedScores.forEach((score) => {
        scores[score];
    });

    const sorted = [];
    for (let i = highestPossibleScore; i >= 0; i--) {
        const count = scores[i]; // will be 0 initially
        for (let i = 0; i < count; i++) {
            sorted.push(score);
        }
    }
    return sorted;
}