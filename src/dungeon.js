"use strict";

const WIDTH = 30;
const HEIGHT = 20;
const OPEN = 0;
const WALL = 1;
const ENEMY = 2;
const CELLSIZE = 20;

function Graph(grid,w,h){
    this.width = w;
    this.height = h;
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


function Enemy(x, y, dungeon){
    this.x = x;
    this.y = y;
    this.dungeon = dungeon;
    this.G = new Graph(this.dungeon.grid, this.dungeon.width, this.dungeon.height);
    this.movesList = [];
    this.bfs = function(sx, sy, dx, dy){
        var s = sx*this.width + sy;
        var d = dx*this.height + dy;
    };
    this.dfs = function(){
        var discovered = [];
        var v = this.x * this.dungeon.width + this.y;
        
    }
    
}

function Dungeon(w, h){
    this.width = w;
    this.height = h;
    this.grid = [];
    for (var x = 0; x < w; x++){
        this.grid[x] = [];
        for (var y = 0; y < h; y++){
            this.grid[x][y] = OPEN;
        }
    }
    this.draw = function(){
        for (var x = 0; x < this.width; x++){
            for (var y = 0; y < this.height; y++){
                if (this.grid[x][y] == OPEN){
                    fill(255, 255, 255);
                    rect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE);
                } else if (this.grid[x][y] == WALL){
                    fill(0, 0, 0);
                    rect(x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE);
                }
            }
        }
        fill(0, 0, 255);
        rect(this.enemy.x * CELLSIZE, this.enemy.y * CELLSIZE, CELLSIZE, CELLSIZE);
    };
    this.addWall = function(x, y){
        this.grid[x][y] = WALL;
    };
    
    this.placeEnemy = function(){
        var x = Math.floor(Math.random() * this.width);
        var y = Math.floor(Math.random() * this.height);
        while (this.grid[x][y] !== OPEN){
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        }
        this.enemy = new Enemy(x, y);
    }
}

var c;
var dungeon;
var placeEnemy;

function setup(){
    c = createCanvas(WIDTH * CELLSIZE, HEIGHT * CELLSIZE);
    c.parent("canvasHere");
    dungeon = new Dungeon(WIDTH, HEIGHT);
    dungeon.placeEnemy();
    noStroke();
    placeEnemy = createButton("place enemy randomly");
    placeEnemy.parent("placeEnemy");
    placeEnemy.mousePressed(function(){ dungeon.placeEnemy() });
}

function draw(){
    background(255);
    dungeon.draw();
    if (mouseIsPressed){
        if (mouseX > 0 && mouseX <= WIDTH*CELLSIZE && mouseY > 0 && mouseY <= HEIGHT*CELLSIZE){
            var x = Math.floor((mouseX - CELLSIZE/2) / CELLSIZE);
            var y = Math.floor((mouseY - CELLSIZE/2) / CELLSIZE);
            x = Math.max(0, x);
            y = Math.max(0, y);
            dungeon.addWall(x, y);
        } 
    } else {
      if (mouseX > 0 && mouseX < WIDTH*CELLSIZE && mouseY > 0 && mouseY <= HEIGHT*CELLSIZE) 
            var x = Math.floor((mouseX - CELLSIZE/2) / CELLSIZE);
            var y = Math.floor((mouseY - CELLSIZE/2) / CELLSIZE);
            fill(255, 0, 0);
            rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
    }
}


