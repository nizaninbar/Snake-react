//import React, {Component} from 'react';
import * as Models from '../Models/Models';
//import Board from '..//board/Board';
//import Menu from '..//menu/Menu';

let score = 0;

class Game{

    constructor(){
        this.tick = this.tick.bind(this);
        this.initCellArray = this.initCellArray.bind(this);
        this.setFoodOnArray = this.setFoodOnArray.bind(this);
        this.start = this.start.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.scramble = this.scramble.bind(this);
        this.win = this.win.bind(this);
    }

    keyDown(e){
        let lastDir = Models.Snake.commandQueue.Peek();
        switch(e.code){
            case 'ArrowUp':
                if(lastDir){
                    if(lastDir !== Models.Direction.Up){
                        Models.Snake.commandQueue.Set(Models.Direction.Up);
                    }
                }
                else{
                    if(Models.Snake.dir !== Models.Direction.Down)
                        Models.Snake.commandQueue.Set(Models.Direction.Up);
                }
                break;
            case 'ArrowRight':
                if(lastDir){
                    if(lastDir !== Models.Direction.Up){
                        Models.Snake.commandQueue.Set(Models.Direction.Right);
                    }
                }
                else{
                    if(Models.Snake.dir !== Models.Direction.Left)
                        Models.Snake.commandQueue.Set(Models.Direction.Right);
                }
                break;
            case 'ArrowDown':
                if(lastDir){
                    if(lastDir !== Models.Direction.Up){
                        Models.Snake.commandQueue.Set(Models.Direction.Down);
                    }
                }
                else{
                    if(Models.Snake.dir !== Models.Direction.Up)
                        Models.Snake.commandQueue.Set(Models.Direction.Down);
                }
                break;
            case 'ArrowLeft':
                if(lastDir){
                    if(lastDir !== Models.Direction.Up){
                        Models.Snake.commandQueue.Set(Models.Direction.Left);
                    }
                }
                else{
                    if(Models.Snake.dir !== Models.Direction.Right)
                        Models.Snake.commandQueue.Set(Models.Direction.Left);
                }
                break; 
            case 'Space':
            break;

            default:
            
            break;
        }
    }

    start(){
        if(Models.Snake.isRunning) return;
        Models.Snake.commandQueue.Clear();
        let c = this.initCellArray();
        score = 0;
        this.menu.setScore(0);
        this.menu.setMessage("Good Luck!");
        this.scramble();
        c = this.setFoodOnArray(c);
        window.addEventListener('keydown', this.keyDown);
        this.board.setCells(c);
        
        Models.Snake.isRunning = true;  
        Models.Snake.commandQueue.Set(Models.Direction.Left);
        setTimeout(() => {
            this.tick(Models.Snake.tail);
        }, 890); 
    }

    scramble(){
        Models.ScrambledCells.length = 0;
        let i = 0;
        let j = 0;
        for(i = 0; i < Models.colCount; i++){
            for(j = 0; j < Models.rowCount; j++){
                Models.ScrambledCells.push({x:i,y:j});
            }
        }
        //console.log(Models.ScrambledCells);

        let cnt = 0;
        let r = 0;
        let tmp = {};

        for( cnt = 0; cnt < Models.ScrambledCells.length; cnt++ ){
           r = Math.random();
           r = Math.round(r * (Models.ScrambledCells.length -1));
           
           tmp =  {x: Models.ScrambledCells[cnt].x, y: Models.ScrambledCells[cnt].y};
           Models.ScrambledCells[cnt] = {x: Models.ScrambledCells[r].x, y: Models.ScrambledCells[r].y};
           Models.ScrambledCells[r] = tmp;
        }
    }

    win(){
        Models.Snake.isRunning = false;
        this.menu.setScore(score + 1 );
        //alert("You win !!!");
        this.menu.setMessage("You win !!!");
    }

    setFoodOnArray(arr){
        
        let tmp = arr;
        let x = Math.random();
        let i = Math.round(x * (Models.ScrambledCells.length -1));
        let startPoint = i;
        let next = {};
        
        do{
            if (i > Models.ScrambledCells.length -1)
                i = 0;

            next = Models.ScrambledCells[i];
            
            i++;
            if(startPoint === i){
                this.win();
                return null;
            }
        }while(tmp[next.y][next.x].content === Models.CellContent.Snake);
        tmp[next.y][next.x].content = Models.CellContent.Food;
        return tmp;
    }

    initCellArray(){
        let arr = [];
        let i,j;

        for(i = 0; i < Models.rowCount;i++){
            arr.push([]);
            for(j=0 ; j < Models.colCount; j++){
                arr[i].push(new Models.BoardCell(j,i));
            }
        }

        let x = Math.round(Models.colCount/2);
        let y = Math.round(Models.rowCount/2);

        Models.Snake.tail = new Models.SnakeCell(y,x);

        Models.Snake.tail.next = Models.Snake.tail;
        Models.Snake.head = new Models.SnakeCell(Models.Snake.tail.X,Models.Snake.tail.Y);

        Models.Snake.head.next = Models.Snake.tail.next;

        arr[y][x].content = Models.CellContent.Snake;
        return arr;
    }

    tick(c){

        if(!Models.Snake.isRunning){
            return;
        }

        let newDir = Models.Snake.commandQueue.Get();

        if(newDir){
            Models.Snake.dir = newDir;
        }
            
        switch (Models.Snake.dir){
            case Models.Direction.Up:
                Models.Snake.head.Y--;
            break;
            case Models.Direction.Right:
                Models.Snake.head.X ++;   
            break;
            case Models.Direction.Down:
                Models.Snake.head.Y++;
            break;
            case Models.Direction.Left:
                Models.Snake.head.X--;
            break;

            default :

            break;
        }

        let tmpCells = this.board.getCells();
        
        if(Models.Snake.head.X < 0 
            || Models.Snake.head.Y < 0 
            || Models.Snake.head.X + 1 > Models.colCount 
            || Models.Snake.head.Y + 1 > Models.rowCount){
                //alert("end of board");
                this.menu.setMessage('Opps! End of board');
                Models.Snake.isRunning = false;
                return ;
        }

        if(tmpCells[Models.Snake.head.Y][Models.Snake.head.X].content === Models.CellContent.Snake){
            //alert("Boom!");
            this.menu.setMessage('Self bite, Better luck next time');
            Models.Snake.isRunning = false;
            return;
        }
        
        
        if(tmpCells[Models.Snake.head.Y][Models.Snake.head.X].content === Models.CellContent.Food){
            let newCell = new Models.SnakeCell();
            newCell.X = c.X;
            newCell.Y = c.Y;
            newCell.next = c.next;
            c.next = newCell;
            tmpCells[Models.Snake.head.Y][Models.Snake.head.X].content = Models.CellContent.Snake;
            tmpCells = this.setFoodOnArray(tmpCells);
            if(!tmpCells )
                return;
            score++;
            this.menu.setScore(score);
        }
        else{
            tmpCells[c.Y][c.X].content = Models.CellContent.Empty;
        }

        c.X = Models.Snake.head.X;
        c.Y = Models.Snake.head.Y;
        
        tmpCells[c.Y][c.X].content = Models.CellContent.Snake;
        this.board.setCells( tmpCells);

        if(Models.Snake.isRunning){
            setTimeout(() => {
                this.tick(c.next);
            }, Models.Speed);
        }
    }

}

//Game.prototype.board = null;
//Game.prototype.menu = null;

export default Game;