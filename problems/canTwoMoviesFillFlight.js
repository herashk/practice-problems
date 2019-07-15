function canTwoMoviesFillFlight(movieLengths, flightLength) {
  // Determine if two movie runtimes add up to the flight length
  // flightLength = integer
  // movieLengths = array of integers
  // returns true if two numbers inside movieLengths add up to flightLength
  
  // example [3,6,1], 5 (false)


  const moviesSeen = [];
  for (let i = 0; i < movieLengths.length; i++) {
      const currentMovie = movieLengths[i];
      const matchingMovie = flightLength - movieLengths[i];

      if (moviesSeen.includes(matchingMovie)) {
          return true;
      } else {
          moviesSeen.push(currentMovie);
      }
  }
  return false;
}


// What if we wanted the movie lengths to sum to something close to the flight length (say, within 20 minutes)?
// What if we wanted to fill the flight length as nicely as possible with any number of movies (not just 2)?
// What if we knew that movieLengths was sorted? Could we save some space and/or time?






// Tests

let desc = 'short flight';
let actual = canTwoMoviesFillFlight([2, 4], 1);
let expected = false;
assertEquals(actual, expected, desc);

desc = 'long flight';
actual = canTwoMoviesFillFlight([2, 4], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'one movie half flight length';
actual = canTwoMoviesFillFlight([3, 8], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'two movies half flight length';
actual = canTwoMoviesFillFlight([3, 8, 3], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'lots of possible pairs';
actual = canTwoMoviesFillFlight([1, 2, 3, 4, 5, 6], 7);
expected = true;
assertEquals(actual, expected, desc);

desc = 'not using first movie';
actual = canTwoMoviesFillFlight([4, 3, 2], 5);
expected = true;
assertEquals(actual, expected, desc);

desc = 'only one movie';
actual = canTwoMoviesFillFlight([6], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'no movies';
actual = canTwoMoviesFillFlight([], 2);
expected = false;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}