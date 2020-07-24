import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Hi extends Component {
  state = {
    hello: 'helloㅋㅋ',
  };

  render() {
    return (
      <div>
        {this.state.hello}
        <div>
          <Link to="/data">go to Data</Link>
        </div>
      </div>
    );
  }
}

export default Hi;
