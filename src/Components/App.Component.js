import React, { Component } from 'react';
import NavigationComponent from './Navigation.Component';
import ProductsComponent from './Products.Component';
import '../Generated-CSS/App.css';
var mockProducts = require('../Shared/generated.json'),
    app = require('../Shared/app.json');

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
          <NavigationComponent name={app.APP_NAME}/>
            <ProductsComponent products={this.state.products}/>
        </div>
    );
  }
}

export default AppComponent;
