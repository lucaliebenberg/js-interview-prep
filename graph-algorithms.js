// Graph Algorithms

// 1. Dijkstra's Algorithm
// Dijkstra's algorithm is used to find the shortest path between two nodes in a weighted graph.
// It works by maintaining a set of visited nodes and a set of unvisited nodes.
// At each step, it selects the node with the minimum distance from the start node and relaxes all the adjacent edges.

function dijkstra(graph, startNode) {
  const distances = {};
  const visited = {};
  const unvisited = new Set(Object.keys(graph));
  unvisited.delete(startNode);

  for (let node in graph) {
    distances[node] = Infinity;
  }

  distances[startNode] = 0;

  while (unvisited.size > 0) {
    let currentNode = null;
    let minDistance = Infinity;
    for (let node of unvisited) {
      if (distances[node] < minDistance) {
        currentNode = node;
        minDistance = distances[node];
      }
    }

    for (let neighbor in graph[currentNode]) {
      let distance = graph[currentNode][neighbor];
      if (distances[currentNode] + distance < distances[neighbor]) {
        distances[neighbor] = distances[currentNode] + distance;
      }
    }

    visited[currentNode] = true;
    unvisited.delete(currentNode);
  }

  return distances;
}

// 2. Minimum Spanning Tree (MST)
// The minimum spanning tree (MST) is used to find the smallest subset of edges in a connected, weighted graph that connects all the vertices.
// Kruskal's algorithm is one way to find the MST.

function kruskalMST(graph) {
  const edges = [];
  for (let node in graph) {
    for (let neighbor in graph[node]) {
      edges.push([node, neighbor, graph[node][neighbor]]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const parent = {};
  for (let node in graph) {
    parent[node] = node;
  }

  function find(node) {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  }

  function union(node1, node2) {
    parent[find(node1)] = find(node2);
  }

  const mst = {};
  for (let edge of edges) {
    let [node1, node2, weight] = edge;
    if (find(node1) !== find(node2)) {
      union(node1, node2);
      if (!mst[node1]) {
        mst[node1] = {};
      }
      if (!mst[node2]) {
        mst[node2] = {};
      }
      mst[node1][node2] = weight;
      mst[node2][node1] = weight;
    }
  }

  return mst;
}

// 3. Topological Sort
// A topological sort is used to find a linear ordering of the vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering.
// This can be used to determine the order in which to perform a series of dependent tasks.

function topologicalSort(graph) {}

// 4. Strongly Connected Components (SCCs)
// A strongly connected component (SCC) is a subset of vertices in a directed graph such that every vertex in the subset is reachable from every other vertex in the subset.
// The Kosaraju's algorithm is one way to find the SCCs.

function kosarajuSCC(graph) {
  const visited = {};
  const stack = [];

  function dfs1(node) {
    visited[node] = true;

    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs1(neighbor);
      }
    }

    stack.push(node);
  }

  for (let node in graph) {
    if (!visited[node]) {
      dfs1(node);
    }
  }

  const reverseGraph = {};
  for (let node in graph) {
    for (let neighbor of graph[node]) {
      if (!reverseGraph[neighbor]) {
        reverseGraph[neighbor] = new Set();
      }
      reverseGraph[neighbor].add(node);
    }
  }

  const sccs = [];

  visited = {};

  function dfs2(node, scc) {
    visited[node] = true;
    scc.add(node);

    for (let neighbor of reverseGraph[node]) {
      if (!visited[neighbor]) {
        dfs2(neighbor, scc);
      }
    }
  }

  while (stack.length > 0) {
    let node = stack.pop();
    if (!visited[node]) {
      let scc = new Set();
      dfs2(node, scc);
      sccs.push(scc);
    }
  }

  return sccs;
}

// 5. Maximum Flow
// The maximum flow problem is a network optimization problem that involves finding the maximum flow from a source node to a sink node in a flow network.
// The Ford-Fulkerson algorithm is one way to solve this problem.

function fordFulkerson(graph, source, sink) {
  function bfs(parent) {
    const visited = {};
    const queue = [source];
    visited[source] = true;

    while (queue.length > 0) {
      let node = queue.shift();

      for (let neighbor in graph[node]) {
        if (!visited[neighbor] && graph[node][neighbor] > 0) {
          visited[neighbor] = true;
          parent[neighbor] = node;
          queue.push(neighbor);
        }
      }
    }

    return visited[sink];
  }

  let maxFlow = 0;
  let parent = {};

  for (let node in graph) {
    parent[node] = null;
  }

  while (bfs(parent)) {
    let pathFlow = Infinity;
    for (let node = sink; node !== source; node = parent[node]) {
      let parent_node = parent[node];
      pathFlow = Math.min(pathFlow, graph[parent_node][node]);
    }

    for (let node = sink; node !== source; node = parent[node]) {
      let parent_node = parent[node];
      graph[parent_node][node] -= pathFlow;
      graph[node][parent_node] += pathFlow;
    }

    maxFlow += pathFlow;
  }

  return maxFlow;
}

// 6. Kruskal's Algorithm
// Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted undirected graph.

function kruskalMST(graph) {
  const edges = [];
  for (let node in graph) {
    for (let neighbor in graph[node]) {
      edges.push([node, neighbor, graph[node][neighbor]]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const mst = [];
  const parents = {};

  function find(node) {
    if (parents[node] === node) {
      return node;
    }
    return find(parents[node]);
  }

  function union(node1, node2) {
    let root1 = find(node1);
    let root2 = find(node2);
    parents[root1] = root2;
  }

  for (let node in graph) {
    parents[node] = node;
  }

  for (let edge of edges) {
    let node1 = edge[0];
    let node2 = edge[1];
    let weight = edge[2];

    if (find(node1) !== find(node2)) {
      mst.push(edge);
      union(node1, node2);
    }
  }

  return mst;
}

// 7. Bellman-Ford Algorithm
// The Bellman-Ford algorithm is a single-source shortest path algorithm that works for graphs with negative edge weights (unlike Dijkstra's algorithm).

function bellmanFord(graph, start) {
  const distances = {};
  const predecessors = {};

  for (let node in graph) {
    distances[node] = Infinity;
    predecessors[node] = null;
  }

  distances[start] = 0;

  for (let i = 1; i < Object.keys(graph).length; i++) {
    for (let node in graph) {
      for (let neighbor in graph[node]) {
        let weight = graph[node][neighbor];
        if (distances[node] + weight < distances[neighbor]) {
          distances[neighbor] = distances[node] + weight;
          predecessors[neighbor] = node;
        }
      }
    }
  }

  for (let node in graph) {
    for (let neighbor in graph[node]) {
      let weight = graph[node][neighbor];
      if (distances[node] + weight < distances[neighbor]) {
        throw new Error("Negative-weight cycle detected");
      }
    }
  }

  return { distances, predecessors };
}

// 8. Floyd-Warshall Algorithm
//   The Floyd-Warshall algorithm is an all-pairs shortest path algorithm that works for graphs with negative edge weights (unlike Dijkstra's algorithm).

function floydWarshall(graph) {
  const dist = {};
  const nodes = Object.keys(graph);

  for (let i = 0; i < nodes.length; i++) {
    let node1 = nodes[i];
    dist[node1] = {};

    for (let j = 0; j < nodes.length; j++) {
      let node2 = nodes[j];
      if (i === j) {
        dist[node1][node2] = 0;
      } else if (graph[node1][node2]) {
        dist[node1][node2] = graph[node1][node2];
      } else {
        dist[node1][node2] = Infinity;
      }
    }
  }

  for (let k = 0; k < nodes.length; k++) {
    let nodeK = nodes[k];
    for (let i = 0; i < nodes.length; i++) {
      let nodeI = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        let nodeJ = nodes[j];
        if (dist[nodeI][nodeK] + dist[nodeK][nodeJ] < dist[nodeI][nodeJ]) {
          dist[nodeI][nodeJ] = dist[nodeI][nodeK] + dist[nodeK][nodeJ];
        }
      }
    }
  }

  return dist;
}

// 9. Flood Fill Algorithm
// The flood fill algorithm is used to fill an enclosed area with a specific color.
// It is often used in image processing

function floodFill(image, sr, sc, newColor) {
  const rows = image.length;
  const cols = image[0].length;
  const startColor = image[sr][sc];
  if (startColor === newColor) {
    return image;
  }

  function dfs(r, c) {
    if (image[r][c] === startColor) {
      image[r][c] = newColor;
      if (r >= 1) {
        dfs(r - 1, c);
      }
      if (r < rows - 1) {
        dfs(r + 1, c);
      }
      if (c >= 1) {
        dfs(r, c - 1);
      }
      if (c < cols - 1) {
        dfs(r, c + 1);
      }
    }
  }

  dfs(sr, sc);

  return image;
}

// 10. Lee Algorithm
// The Lee algorithm is a pathfinding algorithm that finds the shortest path in a maze.

function leeAlgorithm(maze, start, end) {
  const rows = maze.length;
  const cols = maze[0].length;
  const queue = [start];
  const visited = new Set();
  visited.add(start.toString());
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let distance = 0;

  while (queue.length > 0) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [row, col] = queue.shift();
      if (row === end[0] && col === end[1]) {
        return distance;
      }
      for (let [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        if (r < 0 || r >= rows || c < 0 || c >= cols) {
          continue;
        }
        if (maze[r][c] === 0 && !visited.has([r, c].toString())) {
          queue.push([r, c]);
          visited.add([r, c].toString());
        }
      }
    }
    distance++;
  }

  return -1;
}
