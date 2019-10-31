import React, { Component } from 'react';
import Menu from './menu/Menu';
import Board from './board/Board';
import Game from './Game/Game';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.setScore = this.setScore.bind(this);
    this.game = new Game();

  }

  setScore(value){
    this.game.menu.setScore(value);
  }

  render() {
    return (
      <div className="container">
              
          <div className='container text-center header bg-primary'>
            <h2>Snake</h2>
          </div>
          <Menu ref={instance => {this.game.menu = instance}} start={this.game.start}/>
          <Board ref={instance => {this.game.board = instance}} setscore={this.setScore}></Board>
      </div>
    );
  }
}

export default App;
