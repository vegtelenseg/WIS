import React, { Component } from 'react';
import SearchComponent from './Search.Component.js';
import SelectStoreComponent from './SelectStore.Component';
import WatchedFoods from './WatchedFoods.Component';
import '../Generated-CSS/grid.css';
var mockProducts = require('../Shared/generated.json');
//    app = require('../Shared/app.json');
class AppComponent extends Component {
    constructor() {
      super();
      this.state = {
        products: mockProducts,
        watchedFoods: []
      }
    }
    unwatchFood = (itemIndex) => {
      const filteredFoods = this.state.watchedFoods.filter(
        (item, idx) => itemIndex !== idx
      );
      this.setState({
        watchedFoods: filteredFoods
      });
    }
    watchFood = (food) => {
        const newFoods = this.state.watchedFoods.concat(food);
        this.setState({
          watchedFoods: newFoods
        });
    }
    render() {
      const { watchedFoods } = this.state;
      return (
        <div id="app-body">
          <WatchedFoods foods={watchedFoods} onFoodClick={this.unwatchFood}/>
          <SearchComponent onFoodClick={this.watchFood}/>
          <SelectStoreComponent/>
        </div>
    );
  }
}

export default AppComponent;
