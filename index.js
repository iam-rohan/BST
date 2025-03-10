class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    let sortedArray = this.sortArray(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  sortArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (value > root.data) {
      root.right = this.insert(value, root.right);
    } else if (value < root.data) {
      root.left = this.insert(value, root.left);
    }

    return root;
  }

  getReplacement(curr) {
    curr = curr.right;
    if (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else {
      if (root.left == null) return root.right;

      if (root.right == null) return root.left;

      let replacement = this.getReplacement(root);
      root.data = replacement.data;
      root.right = this.deleteItem(replacement.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;

    if (value == root.data) {
      return root;
    } else if (value > root.data) {
      root = this.find(value, root.right);
    } else {
      root = this.find(value, root.left);
    }
    return root;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback is required!");
    const queue = [this.root];
    if (this.root === null) return;
    while (queue.length > 0) {
      let curr = queue.shift();

      callback(curr);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required!");
    if (!node) return;

    callback(node);

    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required!");
    if (!node) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required!");
    if (!node) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return 0;

    let leftSubtree = this.height(node.left);
    let rightSubTree = this.height(node.right);

    return Math.max(leftSubtree, rightSubTree) + 1;
  }

  depth(node) {
    if (!node) return -1;

    let isfoundDepth = false;
    let tempValue = this.root;
    let count = 0;

    while (!isfoundDepth) {
      if (node.data == tempValue.data) {
        isfoundDepth = true;
        return count;
      } else if (node.data > tempValue.data) {
        tempValue = tempValue.right;
        count += 1;
      } else {
        tempValue = tempValue.left;
        count += 1;
      }
    }
  }

  isBalanced() {
    return this.checkBalanced(this.root);
  }

  checkBalanced(node) {
    if (node == null) return true; // An empty tree is balanced

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false; // If imbalance found

    return this.checkBalanced(node.left) && this.checkBalanced(node.right);
  }

  rebalance() {
    let newArray = [];
    this.inOrder((node) => newArray.push(node.data));

    this.root = this.buildTree(newArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Print the tree structure

// Sample input array
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Create tree instance
let node = new Tree(arr);

node.insert(14);

node.deleteItem(9);

console.log(node.find(4));

node.insert(7000);
node.insert(8000);
node.insert(325);

prettyPrint(node.root);

let node4 = node.find(4);

console.log(node.depth(node4));

console.log(node.isBalanced());

node.rebalance();

console.log(node.isBalanced());
prettyPrint(node.root);
