import React, { Component } from 'react';
import '../Generated-CSS/grid.css';
import io from 'socket.io-client';

var socket = io.connect('http://localhost:4300');
socket.on('product changed', (data) => {
  console.log("Some changes Poi: " + data.id);
});
class FoundFoods extends Component {
    constructor() {
      super();
      this.state = {
        foundfoods: []
      }
    }

    render() {
      return (
        <div className="found-foods">{this.props.found}</div>
    );
  }
}

export default FoundFoods;
