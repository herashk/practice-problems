/*  

BT ---------------------------------------------------------
When BTs are perfect they have 2 properties:
1) number of total nodes on each level doubles as you move down the tree
2) number of nodes on the last level is equal to the sum of the number of nodes on all other levels. That means about half o the nodes are on the last level

if height of tree is h, to get all number of nodes is 2^(h - 1) => ex h = 5, total num is 16

GRAPH ------------------------------------------------------
Strength of Graphs - repesenting links
Weakness of Graphs - scaling challenges. Most graph algos are n log n or slower. 

Directed vs Undirected
Cyclic vs Acyclic
Weighted vs Unweighted
Legal Coloring -> graph coloring is when you assign colors sto each node in a graph. A legal coloring means no adjacent nodes have the same color.

Graph representation
- Edge list: list of all edges in the graph => const graph = [[0, 1], [1, 2], [1, 3], [2, 3]];
- Adjacency list: a list where the index represents the node and the value at that index is a list of the node's neighbors
  const graph = [
  [1],
  [0, 2, 3],
  [1, 3],
  [1, 2],
  ]; 
- Adjacency matrix: a matrix of 0s and 1s indicating whether node x coneects to node y (0 means no 1 means yes) 
const graph = [
  [0, 1, 0, 0],
  [1, 0, 1, 1],
  [0, 1, 0, 1],
  [0, 1, 1, 0],
];

Since node 3 has edges to nodes 1 and 2, graph[3][1] and graph[3][2] have value 1.

BFS vs DFS
- BFS on a binary tree generally requires more memory than a DFS
- DFS can easily be implemented with recursion

1) is there a path between two nodes in an undirected graph?
- run DFS or DFS

2) what's the shortest path between two nodes in undirected, unweighted graph?
- run BFS from one node and backtrack/retrace steps once you reach the second. BFS always find sthe shortest path assuming the graph is undirected and unweighted. DFS doe snot always find the shortest path

3) can undirectd graph be colored with two colors? 
- run BFS, assining colors as nodes are visited. Abort if you need to assign a node a color different from the one it was assigned earlier

4) does undirected graph have a cycle?
- run BFS, keeping track of number of times each node is visited. If a node is ever visited twice, then there is a cycle

These advanced graph algorithms pop up occasionally:
Dijkstra's Algorithm: Finds the shortest path from one node to all other nodes in a weighted graph.
Topological Sort: Arranges the nodes in a directed, acyclic graph in a special order based on incoming edges.
Minimum Spanning Tree: Finds the cheapest set of edges needed to reach all nodes in a weighted graph.
*/