"use strict";

const WIDTH = 30;
const HEIGHT = 20;
const OPEN = 0;
const WALL = 1;
const ENEMY = 2;
const CELLSIZE = 20;

function GridGraph(grid,w,h){
    this.nodes = {};
    this.vertexSet = new Set([])
    this.width = w;
    this.height = h;
    for (var x = 0; x < w; x++){
        for (var y = 0; y < h; y++){
            if (grid[x][y] == OPEN){
                var node_label = x*w + y;
                this.vertexSet.add(node_label);
                var edges = [];
                if (x > 0 && grid[x-1][y] == OPEN){
                    edges.push((x-1)*w + y);
                }
                if (x < (w - 1) && grid[x+1][y] == OPEN){
                    edges.push((x+1)*w + y);
                }
                if (y > 0 && grid[x][y-1] == OPEN){
                    edges.push(x*w + y-1);
                }
                if (y < (h - 1) && grid[x][y+1] == OPEN){
                    edges.push(x*w + y+1);
                }
                this.nodes[node_label] = edges;
            }
        }
    }
    this.dfs = function(sx, sy){
        var start = sx*this.width + sy;
        var discovered = {};
        var s = [];
        var path = [];
        s.push(start);
        while (s.length > 0){
            var v = s.pop();
            if (discovered[v] == undefined){
                discovered[v] = true;
                path.push(v);
                var edges = this.nodes[v];
                for (var i = 0; i < edges.length; i++){
                    s.push(edges[i]);
                }
            }
        }
        return path;
    };
    this.astar = function(sx, sy, dx, dy){
        var startNode = sx*this.width + sy;
        var endNode = dx*this.width + dy;
    };
    this.dijkstra = function(sx, sy, dx, dy){
        var source = sx*this.width + sy;
        //var endNode = dx*this.width + dy;
        var q = [];
        var dist = {};
        var prev = {};
        var vertices = Array.from(this.vertexSet);
        var length = function(u, v){
            return 0;
        };
        for (var i = 0; i < vertices.length; i++){
            dist[vertices[i]] = Infinity;
            prev[vertices[i]] = undefined;
            q.push(vertices[i]);
        }
        dist[source] = 0;
        while (q.length > 0){
            // select vertex with minimum distance from q
            var minDist = dist[q[0]];
            var minDistIndex = 0;
            for (var i = 0; i < q.length; i++){
                var v = q[i];
                if (dist[v] < minDist){
                    minDist = dist[v];
                    minDistIndex
                }
            }
            var v = q.splice(minDistIndex, 1)[0];
            var neighbours = this.nodes[v];
            for (var i = 0; i < neighbours.length; i++){
                var u = neighbours[i];
                var alt = dist[u] + 1;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
        return [dist, prev];
    }
}

var simple = [[1, 1, 1, 1, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0],
			 ];

var big = [];
for (var i = 0; i < 25; i++){
    big[i] = [];
    for (var j = 0; j < 25; j++){
        if (i == 0 || j == 0 || i == 24 || j == 24){
            big[i][j] = 1;
        } else {
            if (Math.random() < 0.1){
                big[i][j] = 1;
            } else {
                big[i][j] = 0;
            }
        }
    }
}

var g = new GridGraph(big, 25, 25);

console.log(g.dijkstra(1, 1, 3, 4));
console.log(big);