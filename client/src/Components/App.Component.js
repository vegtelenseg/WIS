import React, { Component } from 'react';
import SearchComponent from './Search.Component.js';
import '../Generated-CSS/grid.css';
import io from 'socket.io-client';

var socket = io.connect('http://localhost:4300');
socket.on('news', (data) => {
  console.log("Some changes Poi: " + data.hello);

});
class AppComponent extends Component {
    constructor() {
      super();
      this.state = {

      }
    }

    render() {
      return (
        <div id="app-body">
          <SearchComponent/>
        </div>
    );
  }
}

export default AppComponent;
