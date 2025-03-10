import { Tree } from "./index.js";

// Function to print tree structure in a readable way
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

// Function to generate a random array of given length and range
function generateRandomArray(length, min = 0, max = 100) {
  const randomArray = [15];

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }

  return randomArray;
}

const randomArray = generateRandomArray(15, 1, 100); // Length of 10, values between 1 and 100

const tree = new Tree(randomArray);

console.log("Initial Tree (Unbalanced):");
prettyPrint(tree.root);
console.log("Is the tree balanced?", tree.isBalanced()); // Check balance before rebalancing

// Insert more nodes into the tree
tree.insert(100);
tree.insert(99);
tree.insert(98);
tree.insert(97);
tree.insert(96);
tree.insert(95);

console.log("\nTree after insertions:");
prettyPrint(tree.root);
console.log("Is the tree balanced?", tree.isBalanced()); // Check balance after insertions

// Test the find functionality
const foundNode = tree.find(15);
console.log("\nFind 15:", foundNode ? `Node found: ${foundNode.data}` : "Node not found");

// Delete a node from the tree
tree.deleteItem(15);

console.log("\nTree after deleting 15:");
prettyPrint(tree.root);
console.log("Is the tree balanced?", tree.isBalanced()); // Check balance after deletion

// Rebalance the tree
tree.rebalance();

console.log("\nTree after rebalancing:");
prettyPrint(tree.root);
console.log("Is the tree balanced?", tree.isBalanced()); // Check balance after rebalancing

// Test the depth function
const node4 = tree.find(5);
console.log("\nDepth of node 5:", node4 ? tree.depth(node4) : "Node not found");

// Test the level-order traversal (this will print nodes in level-order)
console.log("\nLevel-order traversal:");
tree.levelOrder((node) => console.log(node.data));
