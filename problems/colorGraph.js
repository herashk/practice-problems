/*  
Given an undirected graph with maximum degree D, find a graph coloring using at most D + 1 colors.
WTF?
degree -> degree of a node is the number of edges connected to the node. Maximum dgree of a graph is the highest degree of all the nodes. 
In a directed graph, nodes have an indegree and an outdegree.
loop -> loop in a graph is an edge where both ends connect to the same node!!

Coloring - assigning colors to nodes in a graph. Legal coloring means no adjacent nodes have the same color. Color can be used literally or could represent some concept or property. For example, if we have a graph where nodes represent university classes and edges connect classes with overlapping students. Colors can be used to present scheduled class exam time. In an illegal coloring, a student can be booked for multiple exams at once.

Edge coloring - not very common. A legal edge coloring means no nodes have two edges with the same color.


How to approach?
If first 2 are neighbors, don't try any combinations where the first 2 colors are the same. What if node is colored one by one?

For graph problems in gneral consider the following edge cases 
-nodes with no edges: won't be a problem here. isolated nodes tend to become a problem during traversal
-cycles: won't be a problem. cycles also tend to cause problems during traversal
-loops: a problem in this case. a node with a loop is adjacent to itself so it can't have the samecolor as itself. so it is impossible to legally color a node with a loop. so throw error here. How can we detect a loop? - if the node is in its own set of neighbors.
*/

class GraphNode {
    constructor(label) {
      this.label = label;
      this.neighbors = new Set();
      this.color = null;
    }
  }
  
  // O(n + M) runtime might not look linear because of the loops. trick is to look at each step and think of things in terms of total number of edges (M) when we can.

  // 1) check if each node appears in its own set of neighbors O(1), so doing it for all nodes is O(n)
  // 2) iterating through node's neighbors/crossing each of graphs M edges twice, O(M) time
  // 3) assigning a color to each node. We stop checking colors as soon as we find one that works. In the worst case, need to check 1 more color than the total num of neighbors. 
  function colorGraph(graph, colors) {
    // trick is knowing that illegalColors and legalColors are redefined each iteration of node inside graph
    // during each iteration, look at the current node's neighbors to figure out what colors are taken. then look at all the colors to see which ones are available. pick the first color that is gree and assign it to the current node.
    graph.forEach(node => {

        if (noe.neighbors.has(node)) {
            throw new Error('legal coloring impossible, node with a loop');
        }

        const illegalColors = new Set();

        //make a set of all colors on the node
        node.neighbors.forEach(neighbor => {
            if (neighbor.color !== null) {
                illegalColors.add(neighbor.color);
            }
        });

        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
      
            if (!illegalColors.has(color)) {
              node.color = color;
              break;
            }
          }

    })
    
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white'];
  
  let graph = [];
  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'line graph');
  
  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'separate graph');
  
  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    graph = [nodeA, nodeB, nodeC];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'triangle graph');
  
  {
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    const nodeE = new GraphNode('E');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeD);
    nodeB.neighbors.add(nodeE);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeC.neighbors.add(nodeE);
    nodeD.neighbors.add(nodeB);
    nodeD.neighbors.add(nodeC);
    nodeD.neighbors.add(nodeE);
    nodeE.neighbors.add(nodeB);
    nodeE.neighbors.add(nodeC);
    nodeE.neighbors.add(nodeD);
    graph = [nodeA, nodeB, nodeC, nodeD, nodeE];
  }
  colorGraph(graph, colors);
  assertEqual(validateGraphColoring(graph), true, 'envelope graph');
  
  {
    const nodeA = new GraphNode('A');
    nodeA.neighbors.add(nodeA);
    graph = [nodeA];
  }
  assertThrows(() => {
    colorGraph(graph, colors);
  }, 'loop graph');
  
  function validateGraphColoring(graph) {
  
    const maxDegree = Math.max(...graph.map(node => node.neighbors.size));
  
    const colorsUsed = new Set();
  
    graph.forEach(node => {
      colorsUsed.add(node.color);
    });
  
    if (colorsUsed.has(null)) {
      return false;
    }
  
    if (colorsUsed.size > maxDegree + 1) {
      return false;
    }
  
    let badEdges = 0;
  
    graph.forEach(node => {
      node.neighbors.forEach(neighbor => {
        if (neighbor.color === node.color) {
          badEdges += 1;
        }
      });
    });
  
    if (badEdges > 0) {
      return false;
    }
  
    return true;
  }
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
  
  function assertThrows(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }