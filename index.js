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

  buildTree(array, start, end) {
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
}

// Sample input array
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Create tree instance
let node = new Tree(arr);

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
prettyPrint(node.root);
