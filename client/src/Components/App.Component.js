import React, { Component } from 'react';
import SearchComponent from './Search.Component.js';
import '../Generated-CSS/grid.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4300');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
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
