// Searching Algorithms

// 1. Linear search
// To implement a linear search algorithm in JavaScript, we can use a for loop to iterate through the array or list of elements until the desired element is found.

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the target element
    }
  }
  return -1; // Return -1 if the target element is not found
}

// 2. Binary search
// To implement a binary search algorithm in JavaScript, we can use a while loop to repeatedly divide the array in half until the desired element is found.

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Return the index of the target element
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // Return -1 if the target element is not found
}

// 3. Depth-first search (DFS):
// To implement a depth-first search algorithm in JavaScript, we can use recursion to traverse the graph or tree data structure.

function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// 4. Breadth-first search (BFS):
// To implement a breadth-first search algorithm in JavaScript, we can use a queue to traverse the graph or tree data structure

function bfs(graph, start) {
  let queue = [start];
  let visited = new Set();
  visited.add(start);
  while (queue.length > 0) {
    let vertex = queue.shift();
    console.log(vertex);
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// 5. Hash table search:
// To implement a hash table search algorithm in JavaScript, we can use an object to store the key-value pairs

class HashTable {
  constructor() {
    this.table = {};
  }

  hash(key) {
    // Calculate the hash value of the key
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) + hash + key.charCodeAt(i);
      hash &= hash;
    }
    return hash;
  }

  put(key, value) {
    // Store the key-value pair in the hash table
    let hashValue = this.hash(key);
    this.table[hashValue] = value;
  }

  get(key) {
    // Retrieve the value associated with the key from the hash table
    let hashValue = this.hash(key);
    return this.table[hashValue];
  }

  remove(key) {
    // Remove the key-value pair from the hash table
    let hashValue = this.hash(key);
    delete this.table[hashValue];
  }
}

// 6. Trie search:
// In JavaScript, a trie can be implemented using objects or arrays.
// Each node in the trie represents a letter in a string, and the edges represent the transition from one letter to the next.
// The root node represents the empty string, and each child node represents a letter in the string.
// To implement trie search, we start at the root node and traverse the trie based on the characters in the search string.
// If the string is found in the trie, we return the value associated with the last node in the string. Otherwise, the search fails.

class TrieNode {
  constructor() {
    this.children = {};
    this.value = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(key, value) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      let char = key[i];
      if (!(char in node.children)) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.value = value;
  }

  search(key) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      let char = key[i];
      if (!(char in node.children)) {
        return null;
      }
      node = node.children[char];
    }
    return node.value;
  }
}

// Example usage
const trie = new Trie();
trie.insert("apple", 42);
trie.insert("banana", 21);
console.log(trie.search("apple")); // Output: 42
console.log(trie.search("orange")); // Output: null

// 7. Jump search:
// In JavaScript, jump search can be implemented using a loop and a fixed jump size.
// We start at the first element and jump forward by a fixed amount until we find an element that is greater than or equal to the target element.
// We then perform a linear search on the subarray that contains the target element.

function jumpSearch(arr, x) {
  const n = arr.length;
  const jump = Math.floor(Math.sqrt(n));
  let left = 0;
  let right = 0;

  while (right < n && arr[right] < x) {
    left = right;
    right += jump;
  }

  const end = Math.min(right, n);

  for (let i = left; i < end; i++) {
    if (arr[i] === x) {
      return i;
    }
  }

  return -1;
}

// Example usage:
const arr2 = [1, 3, 5, 7, 9];
console.log(jumpSearch(arr2, 5)); // Output: 2
console.log(jumpSearch(arr2, 6)); // Output: -1

// 8. Interpolation search:
// This algorithm is also used to search for an element in a sorted array.
// The algorithm works by estimating the position of the desired element based on the values of the endpoints of the search range and the value of the element being searched for.
// It then performs a binary search on the estimated position. The time complexity of interpolation search is O(log log n) on average, but it can be as bad as O(n) in the worst case.

// Explanation:
// The interpolation search algorithm is similar to the binary search algorithm, but instead of always dividing the array in half, it estimates the position of the desired element based on its value and the values of the endpoints of the search range.
// Specifically, it uses the formula (x - arr[left]) / (arr[right] - arr[left]) * (right - left) + left to estimate the position of the desired element x in the sorted array arr. If the estimated position is out of range or if the estimated element is not equal to x, it adjusts the search range and repeats the estimation. Otherwise, it returns the position of the desired element.

function interpolationSearch(arr, x) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right && x >= arr[left] && x <= arr[right]) {
    const pos = Math.floor(
      ((x - arr[left]) / (arr[right] - arr[left])) * (right - left) + left
    );

    if (arr[pos] === x) {
      return pos;
    }

    if (arr[pos] < x) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }

  return -1;
}

// Example usage:
const arr = [1, 3, 5, 7, 9];
