"use strict";

const WIDTH = 30;
const HEIGHT = 20;
const OPEN = 0;
const WALL = 1;
const ENEMY = 2;
const CELLSIZE = 20;

function GridGraph(grid,w,h){
    this.nodes = {};
    for (var x = 0; x < w; x++){
        for (var y = 0; y < h; y++){
            if (grid[x][y] == OPEN){
                var node_label = x*w + y;
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
}

var simple = [[1, 1, 1, 1, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 1],
			  [1, 0, 0, 0, 0],
			 ];

var g = new GridGraph(simple, 5, 5);

console.log(g.nodes);