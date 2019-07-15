// write a function find the 2nd largest element in a BST
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
  
  // O(h) time
  function findSecondLargest(treeRoot) {
    // first find the largest element by going to the rightmost place
    // if there's a right child, step down to that child
    // 2nd largest isn't necessarily the parent of the largest
    // 2nd largest is the parent of the largest IF the largest does NOT have a left subtree. Need to handle the case where the largest has a left subtree
    // so the second largest when largest has a left subtree  === largest item in the subtree

    // we are lat largest and largest has a left subtree so 2nd largest is the largest value in the subtree
    if (treeRoot.left && !treeRoot.right) {
        return findSecondLargest(treeRoot.left);
    }

    // largest has no left subtree so 2nd largest must be current node
    if (treeRoot.right && !treeRoot.right.left && !treeRoot.right.left) {
        return treeRoot.value
    }

    // otherwise step right
    return findSecondLargest(treeRoot.right);
  };

  // O(h) time and constant space
  function findSecondLargest(treeRoot) {
      let current = treeRoot;
      while (current) {
          if (current.left && !current.right) {
              return findSecondLargest(current.left);
          }

          if (current.right && !current.right.left && !current.right.right) {
              return current.value;
          }
          current = current.value;
      }
  };

  findSecondLargestNode() {
    if (!this.root) {
        return undefined;
    }
    let count = 0;
    let found;

    function helper(node) {
        if (count >= 2 || node === null) { // base case
            return;
        }
        helper(node.right);
        count++;
        if (count === 2) {
            found = node;
            console.log('current', node.value);
        }
        helper(node.left);
    }
    helper(this.root);
    return found;
}

  function findLargest(rootNode) {
    let current = rootNode;
    while (current) {
      if (!current.right) return current.value;
      current = current.right;
    }
  }
  
  
  function findlargest(root) {
      if (root.right) {
          return findlargest(root.right);
      }
      return root.value;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'full tree';
  let treeRoot = new BinaryTreeNode(50);
  let leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  let rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  rightNode.insertRight(80);
  assertEquals(findSecondLargest(treeRoot), 70, desc);
  
  desc = 'largest has a left child';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  rightNode.insertLeft(60);
  assertEquals(findSecondLargest(treeRoot), 60, desc);
  
  desc = 'largest has a left subtree';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  leftNode = rightNode.insertLeft(60);
  leftNode.insertRight(65);
  leftNode = leftNode.insertLeft(55);
  leftNode.insertRight(58);
  assertEquals(findSecondLargest(treeRoot), 65, desc);
  
  desc = 'second largest is root node';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(30);
  leftNode.insertLeft(10);
  leftNode.insertRight(40);
  rightNode = treeRoot.insertRight(70);
  assertEquals(findSecondLargest(treeRoot), 50, desc);
  
  desc = 'descending linked list';
  treeRoot = new BinaryTreeNode(50);
  leftNode = treeRoot.insertLeft(40);
  leftNode = leftNode.insertLeft(30);
  leftNode = leftNode.insertLeft(20);
  leftNode = leftNode.insertLeft(10);
  assertEquals(findSecondLargest(treeRoot), 40, desc);
  
  desc = 'ascending linked list';
  treeRoot = new BinaryTreeNode(50);
  rightNode = treeRoot.insertRight(60);
  rightNode = rightNode.insertRight(70);
  rightNode = rightNode.insertRight(80);
  assertEquals(findSecondLargest(treeRoot), 70, desc);
  
  desc = 'one node tree';
  treeRoot = new BinaryTreeNode(50);
  assertThrowsError(() => findSecondLargest(treeRoot), desc);
  
  desc = 'when tree is empty';
  treeRoot = null;
  assertThrowsError(() => findSecondLargest(treeRoot), desc);
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
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