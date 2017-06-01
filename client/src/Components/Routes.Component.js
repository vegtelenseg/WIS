import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppComponent from './App.Component';
import ProductComponent from './Product.Component';

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={AppComponent}></Route>
          <Route path="/products" component={ProductComponent}></Route>
        </div>
      </Router>
    );
  }
}

export default AppRoutes;
