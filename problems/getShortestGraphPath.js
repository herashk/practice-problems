/*
You wrote a trendy new messaging app, MeshMessage, to get around flaky cell phone coverage.

Instead of routing texts through cell towers, your app sends messages via the phones of nearby users, passing each message along from one phone to the next until it reaches the intended recipient. (Don't worry—the messages are encrypted while they're in transit.)

Some friends have been using your service, and they're complaining that it takes a long time for messages to get delivered. After some preliminary debugging, you suspect messages might not be taking the most direct route from the sender to the recipient.

Given information about active users on the network, find the shortest route for a message from one user (the sender) to another (the recipient). Return an array of users that make up this route. (there might be more than one. Return any for now)

Your network information takes the form of an object where keys are usernames and values are arrays of other users nearby:

  const network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
  ...
};

For the network above, a message from Jayden to Adam should have this route:

  ['Jayden', 'Amelia', 'Adam']
 */

class Queue {
    constructor() {
      this.queue = [];
      this.size = 0;
    }
  
    enqueue(item) {
      this.queue.unshift(item);
      this.size += 1;
    }
  
    dequeue() {
      this.size -= 1;
      return this.queue.pop();
    }
  }
  
/*  
  there are 2 steps - 1) BFS 2) use result of BFS to backtrack and find shortest path
*/
  function getPath(graph, startNode, endNode) {
    // during BFS, keep track of how each node is reached and after reaching end node, use the object to backtrack from the recipient to the sender
   
       if (!graph[startNode]) {
           throw new Error('start node does not exist');
       }
       if (!graph[endNode]) {
           throw new Error('end node does not exist');
       }
   
       const queue = []
       queue.push(startNode);
   
       const visited = {}
       visited[startNode] = null;
   
       while(queue.length) {
           const current = queue.shift();
   
           if (current === endNode) {
             console.log('reached end')
               const shortestPath = [];
               let currentNode = endNode;
   
               while(currentNode !== null) {
                   shortestPath.push(currentNode);
                   currentNode = visited[currentNode];
                   console.log('shorted', shortestPath)
               }
               return shortestPath.reverse();
           }
   
           graph[current].forEach(neighbor => {
               if (!visited.hasOwnProperty(neighbor)) {
                   queue.push(neighbor);
                   visited[neighbor] = current;
               }
           })
           console.log('visited', visited);
       }
       // here, we found no end node so there is no path from start to end
       return null;
   }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  const graph = {
    'a': ['b', 'c', 'd'],
    'b': ['a', 'd'],
    'c': ['a', 'e'],
    'd': ['a', 'b'],
    'e': ['c'],
    'f': ['g'],
    'g': ['f']
  };
  
  let desc = 'two hop path 1';
  let actual = getPath(graph, 'a', 'e');
  let expected = ['a', 'c', 'e'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'two hop path 2';
  actual = getPath(graph, 'd', 'c');
  expected = ['d', 'a', 'c'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'one hop path 1';
  actual = getPath(graph, 'a', 'c');
  expected = ['a', 'c'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'one hop path 2';
  actual = getPath(graph, 'f', 'g');
  expected = ['f', 'g'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'one hop path 3';
  actual = getPath(graph, 'g', 'f');
  expected = ['g', 'f'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'zero hop path';
  actual = getPath(graph, 'a', 'a');
  expected = ['a'];
  assertDeepEqual(actual, expected, desc);
  
  desc = 'no path';
  actual = getPath(graph, 'a', 'f');
  expected = null;
  assertDeepEqual(actual, expected, desc);
  
  desc = 'start node not present';
  assertThrowsError(() => {
    getPath(graph, 'h', 'a');
  }, desc);
  
  desc = 'end node not present';
  assertThrowsError(() => {
    getPath(graph, 'a', 'h');
  }, desc);
  
  function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
      console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
    } else {
      console.log(`${desc} ... PASS`);
    }
  }
  
  function assertThrowsError(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }