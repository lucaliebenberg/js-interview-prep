// Basics Algorithms

// 1. Huffman Coding Compression
// Huffman coding is a lossless data compression algorithm that compresses data by assigning variable-length codes to symbols based on their frequency of occurrence in the input.
// The more frequently a symbol occurs, the shorter the code assigned to it. The algorithm constructs a binary tree based on the frequency of occurrence of symbols in the input.
// he tree is traversed to generate the codes. The implementation of Huffman coding in JavaScript involves constructing the binary tree and generating the codes.

class HuffmanNode {
  constructor(symbol, frequency) {
    this.symbol = symbol;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(input) {
  let freq = {};
  for (let i = 0; i < input.length; i++) {
    if (freq[input[i]] == undefined) {
      freq[input[i]] = 1;
    } else {
      freq[input[i]]++;
    }
  }

  let queue = [];
  for (let symbol in freq) {
    queue.push(new HuffmanNode(symbol, freq[symbol]));
  }

  while (queue.length > 1) {
    queue.sort((a, b) => a.frequency - b.frequency);
    let node1 = queue.shift();
    let node2 = queue.shift();
    let mergedNode = new HuffmanNode(null, node1.frequency + node2.frequency);
    mergedNode.left = node1;
    mergedNode.right = node2;
    queue.push(mergedNode);
  }

  return queue[0];
}

function generateHuffmanCodes(root) {
  let codes = {};
  function traverse(node, code) {
    if (node.symbol) {
      codes[node.symbol] = code;
    } else {
      traverse(node.left, code + "0");
      traverse(node.right, code + "1");
    }
  }
  traverse(root, "");
  return codes;
}

let input = "abracadabra";
let root = buildHuffmanTree(input);
let codes = generateHuffmanCodes(root);
console.log(codes); // { a: '0', b: '10', r: '110', c: '1110', d: '1111' }

// 2. Euclid's algorithm
// Euclid's algorithm is a method for finding the greatest common divisor (GCD) of two numbers.
// The algorithm involves dividing the larger number by the smaller number and taking the remainder.
// Then, the smaller number is divided by the remainder and the process is repeated until the remainder is zero.
// The last non-zero remainder is the GCD of the two numbers.

function gcd(a, b) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

console.log(gcd(48, 18)); // 6

// 3. Union algorithm
// Union algorithm is a method for finding the connected components in a graph.
// The algorithm involves initializing each vertex as a separate component and then merging the components as edges are added to the graph.
// The implementation of Union algorithm in JavaScript involves maintaining an array of components and a function to merge components

class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    if (this.parent[x] != x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let px;
    if (this.find(x) != this.find(y)) {
      this.parent[this.find(x)] = this.find(y);
    }
  }
}

let uf = new UnionFind(6);
uf.union(0, 1);
uf.union(2, 3);
uf.union(4, 5);
uf.union(1, 3);
console.log(uf.parent); // [ 1, 3, 3, 3, 5, 5 ]

// 4. LZW compression
// LZW compression is a lossless data compression algorithm that compresses data by replacing substrings with codes.
// The algorithm maintains a dictionary of all possible substrings and their corresponding codes.
// The algorithm reads the input data one character at a time and searches for the longest substring that is already in the dictionary.
// If the substring is found, it is replaced by its code and the search continues with the next character.
// If the substring is not found, it is added to the dictionary with a new code and the search continues with the next character.
// The implementation of LZW compression in JavaScript involves maintaining a dictionary and a function to compress the data

function compressLZW(input) {
  let dict = {};
  let code = 256;
  for (let i = 0; i < 256; i++) {
    dict[String.fromCharCode(i)] = i;
  }
  let output = [];
  let buffer = "";
  for (let i = 0; i < input.length; i++) {
    let symbol = input[i];
    let str = buffer + symbol;
    if (dict[str] != undefined) {
      buffer = str;
    } else {
      output.push(dict[buffer]);
      dict[str] = code++;
      buffer = symbol;
    }
  }
  output.push(dict[buffer]);
  return output;
}

let input2 = "ababcbababaaaaaa";
let compressed = compressLZW(input2);
console.log(compressed); // [ 97, 98, 256, 99, 257, 259, 97, 260 ]

// 5. Hash algorithms
// Hash algorithms are used to generate fixed-length values (hashes) from arbitrary-length data.
// Hash algorithms are used for a variety of purposes, such as data integrity verification, password storage, and digital signatures.
// The most common hash algorithms are MD5, SHA-1, SHA-256, and SHA-512.
// The implementation of hash algorithms in JavaScript involves importing the hash algorithm library and calling the appropriate function to generate the hash

// Note: For security purposes, it is recommended to use a secure hash algorithm like SHA-256 or SHA-512 for password storage and digital signatures.

const crypto = require("crypto");

function hashMD5(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

function hashSHA256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

console.log(hashMD5("hello world")); // 5eb63bbbe01eeed093cb22bb8f5acdc3
console.log(hashSHA256("hello world")); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
