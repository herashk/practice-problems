/* Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).
A tree is "superbalanced" if the difference between the depths of any two leaf nodes is no greater than one.
leaf node is a tree node with no children. It is the "end" of a path to the bottom, from the root.

definition implies that we'll have to comopare the epths of all possible pairs of leaves. But let's simplify
- difference between min leaf depth and max leaf depth is 1 or less
- there are at most two distinct leaf depths and they are at most 1 apart

what to choose between BFS and DFS? - we want to use a traversal that hits leaves as quickly as possible - DFS!
iterate through the tree, keep track of depth
when leaf is found, add its depth to an array of depths, if we have NOT seen that depth already
each time a leaf with new depth is found, there are 2 ways that the tree might be unbalanced 1) more than 2 different leaf depths 2) exactly 2 leaf depths and they are morethan 1 apart

O(n) time and space. For time the worst case is tree is balanced and we have to iterate over all n nodes. For space, we have two ds to watch - depths and nodes. Since depths will never hodl more than 3, it can be O(1). But since we are doing a DFS, nodes will hold at most d nodes where d is the depth of the tree, making space cost O(d). In worst case, tree is a straight line of right children from the root where every node in that line also has a left. Traversal will walk down the right children line adding a left child to nodes at each step. When traversal hits the rightmost node, nodes will hodl half of the n total nodes in the tree. Since half n is O(n), worst case space cost is O(n);

BFS uses a queue and DFS uses a stack (hence the popping from the back)
*/

class BinaryTreeNode {
    constructor(value) {
      this.value = value;
      this.left  = null;
      this.right = null;
    }
  
    insertLeft(value) {
      this.left = new BinaryTreeNode(value);
      return this.left;
    }
  
    insertRight(value) {
      this.right = new BinaryTreeNode(value);
      return this.right;
    }
  }
  
  function isBalanced(treeRoot) {
  
    if (!treeRoot) return true;
    const depths = [];
    const nodes = [[treeRoot, 0]];

    while (nodes.length) {
        // if we found a node
        const nodeAndDepth = nodes.pop();
        const node = nodeAndDepth[0];
        const depth = nodeAndDepth[1];

        if (!node.left && !node.right) {
            if (depths.indexOf(depth) === -1) {
                depths.push(depth);
            }

            if (depths.length > 2 ||
                (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
                    return false;
                }
        } else {
            if (node.right) {
                nodes.push([node.right, depth + 1]);
            }
            if (node.left) {
                nodes.push([node.left, depth + 1]);
            }
        }
    }
    return true;
  }




// Tests

let desc = 'full tree';
let treeRoot = new BinaryTreeNode(5);
let leftNode = treeRoot.insertLeft(8);
leftNode.insertLeft(1);
leftNode.insertRight(2);
let rightNode = treeRoot.insertRight(6);
rightNode.insertLeft(3);
rightNode.insertRight(4);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'both leaves at the same depth';
treeRoot = new BinaryTreeNode(3);
leftNode = treeRoot.insertLeft(4);
leftNode.insertLeft(1);
rightNode = treeRoot.insertRight(6);
rightNode.insertRight(9);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'leaf heights differ by one';
treeRoot = new BinaryTreeNode(6);
leftNode = treeRoot.insertLeft(1);
rightNode = treeRoot.insertRight(0);
rightNode.insertRight(7);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'leaf heights differ by two';
treeRoot = new BinaryTreeNode(6);
leftNode = treeRoot.insertLeft(1);
rightNode = treeRoot.insertRight(0);
rightNode.insertRight(7).insertRight(8);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'three leaves total';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(5);
rightNode = treeRoot.insertRight(9);
rightNode.insertLeft(8);
rightNode.insertRight(5);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'both subtrees superbalanced';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(5);
rightNode = treeRoot.insertRight(9);
rightNode.insertLeft(8).insertLeft(7);
rightNode.insertRight(5);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'both subtrees superbalanced two';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(2);
leftNode.insertLeft(3);
leftNode.insertRight(7).insertRight(8);
treeRoot.insertRight(4).insertRight(5).insertRight(6).insertRight(9);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'only one node';
treeRoot = new BinaryTreeNode(1);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'linked list tree';
treeRoot = new BinaryTreeNode(1);
treeRoot.insertRight(2).insertRight(3).insertRight(4);
assertEquals(isBalanced(treeRoot), true, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
  
  