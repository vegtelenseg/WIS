import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Generated-CSS/Product-page.css';
var mockProducts = require('../Shared/json-data/generated.json');
import { WatchedFoods } from './WatchedFoods.Component';
//    app = require('../Shared/app.json');
const Utility = require('../Shared/scripts/utility.js');

class ProductComponent extends Component {
  constructor() {
    super();
    this.state = {
      products: mockProducts,
      watchedFoods: [],
      foundfoods: [],
      inputValue: '',
      foods: []
    }
    this.updateInputValue = this.updateInputValue.bind(this)
  }
  getProduct = (query) => {
    console.log("The query " + query);
    if (query !== undefined && query !== null) {
      if (Utility.validateQuery(query)) {
        Utility.findProduct(query, (foods) => {
          this.state.foundfoods = foods.map((food, idx) => {
            return (
              <div key={idx}>
                <h2>{food.productName}</h2>
                <h4>{food.productBrand}</h4>
                <p>{food.productBestBefore}</p>
                <p>{food.productQty}</p>
                <p>{food.productCheckoutRate}</p>
              </div>
            );
          });
          this.setState({
            foods: foods.slice(0, 25)
          });
        });
      }
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
  updateInputValue = (eventRaiser) => {
    eventRaiser.preventDefault();
    let val = eventRaiser.target.value;
    if (val !== undefined && val !== null) {
      this.setState({
        inputValue: eventRaiser.target.value
      });
    }
  }
  componentWillMount = () => {
    const store = this.props.location.query;
    if (store !== null && store !== undefined) {
      return true;
    }
    else {
      // Go back, no store was selected.
      this.props.history.push('/');
    }
  }
  handleEnter = (eventRaiser) => {
    if (eventRaiser.key === 'Enter') {
      this.getProduct(this.state.inputValue);
    }
  }
  render() {
    const { watchedFoods } = this.state;
    return (
      <div id="product-page">
        <Link to={'/'} id="back-home"><p>switch store</p></Link>
        <input id="text-field"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
          onKeyPress={this.handleEnter}
          placeholder={"Search " + this.props.location.query + "'s products"}
          />
          <div id="found-foods">{this.state.foundfoods}</div>
      </div>
    );
  }
}

export default ProductComponent;
