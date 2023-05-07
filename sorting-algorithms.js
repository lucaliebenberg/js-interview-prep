// Sorting Algorithms

// 1. Bubble Sort
// Bubble sort is a simple sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order.
// The algorithm compares each pair of adjacent items and swaps them if they are in the wrong order, then it moves to the next pair of adjacent items and continues until no more swaps are needed.

function bubbleSort(array) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - 1; j++) {
      if (array[j] > array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

// 2. Insertion Sort
// Insertion sort is a simple sorting algorithm that works by building a sorted list one item at a time.
// The algorithm takes each element from the input list and inserts it into the correct position in the sorted list.

function insertionSort(array) {
  var length = array.length;
  for (var i = 1; i < length; i++) {
    var temp = array[i];
    var j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
  return array;
}

// 3. Selection Sort
// Selection sort is a simple sorting algorithm that works by repeatedly finding the minimum element from the unsorted part of the array and putting it at the beginning.
// The algorithm maintains two subarrays in a given array, the sorted subarray and the unsorted subarray.

function selectionSort(array) {
  var length = array.length;
  for (var i = 0; i < length - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    var temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }
  return array;
}

// 4. Merge Sort
// Merge sort is a divide and conquer algorithm that works by dividing an array into two halves, sorting each half, and then merging them back together.
// The algorithm is recursive and the base case is an array with one or zero elements.

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  var mid = Math.floor(array.length / 2);
  var left = array.slice(0, mid);
  var right = array.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

// 5. Quick Sort
// Quick sort is a divide and conquer algorithm that works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.
// The sub-arrays are then sorted recursively.

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  var pivot = array[0];
  var left = [];
  var right = [];
  for (var i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

// 6. Heap Sort
// Heap sort is a comparison-based sorting algorithm that works by first building a binary heap from the input array and then repeatedly extracting the maximum element and inserting it into the sorted array.
// The binary heap is a complete binary tree that satisfies the heap property: the key of each node is greater than or equal to the keys of its children.

function heapSort(array) {
  var length = array.length;
  for (var i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(array, length, i);
  }
  for (var j = length - 1; j > 0; j--) {
    var temp = array[0];
    array[0] = array[j];
    array[j] = temp;
    heapify(array, j, 0);
  }
  return array;
}

function heapify(array, length, index) {
  var largest = index;
  var left = 2 * index + 1;
  var right = 2 * index + 2;
  if (left < length && array[left] > array[largest]) {
    largest = left;
  }
  if (right < length && array[right] > array[largest]) {
    largest = right;
  }
  if (largest !== index) {
    var temp = array[index];
    array[index] = array[largest];
    array[largest] = temp;
    heapify(array, length, largest);
  }
}

// 7. Radix Sort
// Radix sort is a non-comparative sorting algorithm that works by grouping the elements by their digits, starting from the least significant digit, and moving up to the most significant digit.
// The algorithm uses a stable sorting algorithm to sort the elements at each digit.

function radixSort(array) {
  var maxLength = getMaxDigits(array);
  for (var i = 0; i < maxLength; i++) {
    var buckets = Array.from({ length: 10 }, () => []);
    for (var j = 0; j < array.length; j++) {
      var digit = getDigit(array[j], i);
      buckets[digit].push(array[j]);
    }
    array = buckets.flat();
  }
  return array;
}

function getMaxDigits(array) {
  var maxLength = 0;
  for (var i = 0; i < array.length; i++) {
    var length = Math.floor(Math.log10(Math.abs(array[i]))) + 1;
    if (length > maxLength) {
      maxLength = length;
    }
  }
  return maxLength;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// 8. Counting Sort
// Counting sort is a non-comparative sorting algorithm that works by counting the number of occurrences of each element in the input array and using that information to determine the final order of the elements.
// The algorithm assumes that the input elements are integers within a specific range.

function countingSort(array) {
  var max = getMax(array);
  var count = Array.from({ length: max + 1 }, () => 0);
  var output = [];
  for (var i = 0; i < array.length; i++) {
    count[array[i]]++;
  }
  for (var j = 0; j < count.length; j++) {
    while (count[j] > 0) {
      output.push(j);
      count[j]--;
    }
  }
  return output;
}

function getMax(array) {
  var max = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
