"use strict";

const WIDTH = 25;
const HEIGHT = 25;
const OPEN = 0;
const WALL = 1;
const ENEMY = 2;
const CELLSIZE = 20;

function dijkstra(sx, sy, dx, dy, grid){
        var source = sx * grid.width + sy;
        var destination = dx * grid.width + dy;
        var q = [];
        var dist = {};
        var prev = {};
        var vertices = Array.from(grid.vertexSet);
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
            var neighbours = grid.nodes[v];
            for (var i = 0; i < neighbours.length; i++){
                var u = neighbours[i];
                var alt = dist[u] + 1;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
        var route = [];
        var p = prev[destination];
        route.push(p);
        while (p != source){
            p = prev[p];
            route.push(p)
        }
        return route
}



function Enemy(x, y, node){
    this.x = x;
    this.y = y;
    this.node = node;
    this.route = [];
    this.move = function(){
        if (this.route.length > 0){
          var p = this.route.pop();
          var px = Math.floor(p / WIDTH);
          var py = p % WIDTH;
          this.x = px;
          this.y = py;
        }
    }
    this.setRoute = function(route){
        this.route = route;
    };
}

function GridGraph(grid,w,h){
    
    this.grid = grid;
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

    var enemyX = Math.floor(Math.random() * WIDTH);
    var enemyY = Math.floor(Math.random() * HEIGHT);
    while (this.grid[enemyX][enemyY] != OPEN){
      enemyX = Math.floor(Math.random() * WIDTH);
      enemyY = Math.floor(Math.random() * HEIGHT);
    }
    this.enemy = new Enemy(enemyX, enemyY);
    this.draw = function(){
        for (var x = 0; x < this.width; x++){
            for (var y = 0; y < this.height; y++){
                if (this.grid[x][y] == OPEN){
                    fill(255, 255, 255);
                    rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
                } else if (this.grid[x][y] == WALL) {
                    fill(10, 10, 10);
                    rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
                }
            }
        }
        fill(255, 0, 0);
        rect(this.enemy.x*CELLSIZE, this.enemy.y*CELLSIZE, CELLSIZE, CELLSIZE);
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
    this.dijkstra = function(sx, sy, dx, dy){
        var source = sx*this.width + sy;
        var destination = dx*this.width + dy;
        var q = [];
        var dist = {};
        var prev = {};
        var vertices = Array.from(this.vertexSet);
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
        var route = [];
        var p = prev[destination];
        route.push(p);
        while (p != source){
            p = prev[p];
            route.push(p)
        }
        return route
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

var gridGraph;
var canvas;
var released;

function setup(){ 
    gridGraph = new GridGraph(big, WIDTH, HEIGHT);
    canvas = createCanvas(WIDTH*CELLSIZE, HEIGHT*CELLSIZE).parent("canvasHere");
    released = true;
}

function draw(){
    gridGraph.draw();
    if (gridGraph.enemy.route.length > 0){
        gridGraph.enemy.move();
    }
    if (mouseIsPressed) { 
      if (released){
        var x = Math.floor(mouseX / CELLSIZE) - 1;
        var y = Math.floor(mouseY / CELLSIZE) - 1;
        var sx = gridGraph.enemy.x;
        var sy = gridGraph.enemy.y;
        var newRoute = dijkstra(sx, sy, x, y, gridGraph);
        gridGraph.enemy.setRoute(newRoute);
        released = false;
      }
    }
    if (! mouseIsPressed) { released = true; }

    fill(0, 255, 0);
    rect((Math.floor(mouseX / CELLSIZE) * CELLSIZE), 
         (Math.floor(mouseY / CELLSIZE) * CELLSIZE),
         CELLSIZE,
         CELLSIZE);
}

gridGraph = new GridGraph(big, WIDTH, HEIGHT);

var sx = Math.floor(Math.random() * WIDTH);
var sy = Math.floor(Math.random() * HEIGHT);
while (gridGraph.grid[sx][sy] != OPEN) {
  sx = Math.floor(Math.random() * WIDTH);
  sy = Math.floor(Math.random() * HEIGHT);
}


var dx = Math.floor(Math.random() * WIDTH);
var dy = Math.floor(Math.random() * HEIGHT);
while (gridGraph.grid[dx][dy] != OPEN) {
  dx = Math.floor(Math.random() * WIDTH);
  dy = Math.floor(Math.random() * HEIGHT);
}

console.log(gridGraph.grid);
console.log(dijkstra(sx, sy, dx, dy, gridGraph));
