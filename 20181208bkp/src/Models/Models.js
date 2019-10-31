// eslint-disable-next-line
import React, { Component } from 'react';

const rowCount = 15;
const colCount = 15;
const Speed = 299;

const CellContent = {
    Empty:0,
    Food:1,
    Snake:2
};

const Direction = {Up: 1, Right: 2, Down: 3, Left: 4 , Non: 5};

class SnakeCell{

    constructor(x,y,next){
       this.X = x;
       this.Y = y;
       this.Next = next;
   }
}

class CommandsQueue {
    constructor(){
        this.queue = [];
        this.len = 2;
    }

    Set(dir){
        if(this.queue.length > this.len - 1){
            this.queue.shift();
        }
        this.queue.push(dir);
    }

    Get(){
        if(this.queue.length > 0)
            return this.queue.shift();
        else
            return null;
    }

    Peek(){
        if(this.queue.length > 0)
            return this.queue[0];
        
        return null;
    }
}

const Snake = {
    isRunning: false,
    dir: Direction.Left,
    tail: null,
    head: null,
    commandQueue: new CommandsQueue()
}

class BoardCell{
    
    constructor(x,y){
        this.X = x;
        this.Y = y;
        this.content = CellContent.Empty;
    }
    
    Show(){
        //return <div className='cell'>{this.Y + '/' + this.X }</div>;
        let contentCss = "";
        switch (this.content){
            case CellContent.Snake:
                contentCss = "cell-snake";
                break;
            case CellContent.Food:
                contentCss = "cell-food";
                break;
            default:
                break;
        } 
        return <div key={this.X.toString() + this.Y.toString()} className={'cell ' + contentCss}></div>;
    }
}

const ScrambledCells = [];
export  { CellContent, Snake, Direction, rowCount, colCount, Speed, SnakeCell, BoardCell, ScrambledCells};