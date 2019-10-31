import React, {Component} from 'react';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      score:0
    }
  }

  setScore(newScore){
    this.setState({score: newScore});
  }

  render() {
    return (
      <div className="container">
        <div className='navbar navbar-expand bg-secondary'>
          <div className='nav-item'>
            <button className='btn btn-info' onClick={this.props.start}>
              Start
            </button>
          </div>
          <div className='nav-item mx-5'>
            <span className='navbar-text text-white mx-2'>Score:</span>
            <div className='text-white navbar-text mx-2'>{this.state.score.toString()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
