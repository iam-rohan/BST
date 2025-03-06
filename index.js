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
    if (value == root.data) {
      return root;
    } else if (value > root.data) {
      root = this.find(value, root.right);
    } else {
      root = this.find(value, root.left);
    }
    return root;
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

node.insert(14);

node.deleteItem(9);

prettyPrint(node.root);

console.log(node.find(4));
