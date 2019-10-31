import React, {Component} from 'react';
import '../snake.css';
//import * as Models from '../Models/Models';
//import {Snake, CommandsQueue} from '../Snake/Snake';

class Board extends Component{
    constructor(props){
        super(props);
        //this.toggleStart = this.toggleStart.bind(this);
        //this.keyDown = this.keyDown.bind(this);
        //this.gameTick = this.gameTick.bind(this);
        this.state = {
            cells:[] 
        };
        //this.snake = new Snake();
    }

    setCells(arr){
        this.setState({cells:arr});
    }

    getCells(){
        return this.state.cells;
    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.keyDown);
    }

    // toggleStart(){
    //     this.snake.isRunning = !this.snake.isRunning;
    //     this.snake.dir = Models.Direction.Left;
    //     if(this.snake.isRunning)
    //         this.gameTick(this.snake.tail);
    // }

    render(){
        
        return <div className="container">
            <br/>
            <div className='cells-table'>
                {this.state.cells.map((item,i) => {
                    return <div key={i} className='cell-row'>{ item.map((cell, i) => {
                            return cell.Show();
                        })}</div>
                    })}
                </div>
            </div>
    }
}

export default Board;