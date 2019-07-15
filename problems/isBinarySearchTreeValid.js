/*
Write a function to check that a binary tree ↴ is a valid binary search tree. 

- confirm that a node is in a valid place relative to its ancestors. If every node passes this test, the whole tree is a valid BST
- in BST, there are two rules to make a node "correct" 1) if that node is in the ancestor's left subtree, it must be less than the ancestor. 2) if a node is in the ancestor's right subtree, it must be greater than the ancestor.

iterate through BST, keep track of ancestors for each node and check whether the node should be greater than or less than each of them.

instead of keeping all ancestor values, we can keep track of a lowerBound and upperBound that the node's value must fit inside

anything to the left should be smaller than treeRoot so the upperBound is treeRoot
anything to the right should be bigger thatn root so lowerBound is treeRoot

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
  
  function isBinarySearchTree(treeRoot) {
  
    // instead of keeping track of every ancestor, just check the largest number it must be greater than (lowerBound) and the smallest number it must be less than (upperBound)
    const nodesStack = [];
    nodesStack.push({
        node: treeRoot,
        lowerBound: -Infinity,
        upperBound: +Infinity
    });

    while (nodesStack.length) {
        const { node, lowerBound, upperBound } = nodesStack.pop();

        // if node is invalid, return false right away
        if (node.value <= lowerBound || node.value >= upperBound) {
            return false;
        }

        if (node.left) {
            nodesStack.push({
                node: node.left,
                lowerBound,
                upperBound: node.value

            });
        }
        if (node.right) {
            nodesStack.push({
                node: node.right,
                lowerBound: node.value,
                upperBound
            })
        }
    }
    return true;
  }

  
  
  
  // Tests
  
  let desc = 'valid full tree';
  let treeRoot = new BinaryTreeNode(50);
  let leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  let rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  rightNode.insertRight(80);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);
  
  desc = 'both subtrees valid';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(20);
  leftNode.insertRight(60);
  rightNode = treeRoot.insertRight(80);
  rightNode.insertLeft(70);
  rightNode.insertRight(90);
  assertEquals(isBinarySearchTree(treeRoot), false, desc);
  
  desc = 'descending linked list';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(40);
  leftNode = leftNode.insertLeft(30);
  leftNode = leftNode.insertLeft(20);
  leftNode = leftNode.insertLeft(10);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);
  
  desc = 'out of order linked list';
  treeRoot = new BinaryTreeNode(50);
  rightNode = treeRoot.insertRight(70);
  rightNode = rightNode.insertRight(60);
  rightNode = rightNode.insertRight(80);
  assertEquals(isBinarySearchTree(treeRoot), false, desc);
  
  desc = 'one node tree';
  treeRoot = new BinaryTreeNode(50);
  assertEquals(isBinarySearchTree(treeRoot), true, desc);
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }