import React, { Component } from 'react';
import SearchComponent from './Search.Component.js';
import SelectStoreComponent from './SelectStore.Component';
import '../Generated-CSS/App.css';
var mockProducts = require('../Shared/generated.json');
//    app = require('../Shared/app.json');

class AppComponent extends Component {
    constructor() {
      super();
      this.state = {
        products: mockProducts
      }
    }
    render() {
      return (
        <div id="app-body">
          <SearchComponent/>
          <SelectStoreComponent/>
        </div>
    );
  }
}

export default AppComponent;
