import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WatchedFoods  from './WatchedFoods.Component';
import '../Generated-CSS/Product-page.css';

const Utility = require('../Shared/scripts/utility.js');

class ProductComponent extends Component {
  constructor() {
    super();
    this.state = {
      watchedFoods: [],
      foundfoods: [],
      inputValue: '',
    }
    this.updateInputValue = this.updateInputValue.bind(this)
  }
  getProduct = (query) => {
    if (query !== undefined && query !== null) {
      if (Utility.validateQuery(query)) {
        Utility.findProduct(query, (foods) => {
          this.setState({
            foundfoods: foods.map((food, idx) => {
            return (
              <div key={idx} onClick={() => this.watchFood(food)}>
                <h2>Item: {food.productName}</h2>
                <h4>Brand: {food.productBrand}</h4>
                <p>{food.productBestBefore}</p>
                <p>In Stock: {food.productQty}</p>
                <p>{food.productCheckoutRate} items bought every hour</p>
              </div>
                );
              }
            )
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
    Utility.findStore(store, (store) => {
      console.log("Found store: " + store)
    });
    if (store !== null && store !== undefined) {
      for (var i = 0; i < localStorage.length; i++) {
        this.state.watchedFoods.push(localStorage.getItem(localStorage.key(i)));
        console.log("Got by key " + JSON.stringify(localStorage.getItem(localStorage.key(i))));
      }
      return true;
    }
    else {
      // Go back, no store was selected.
      this.props.history.push('/');
    }
  }
  componentWillUnmount = () => {
    if (this.state.watchedFoods) {
      console.log('Watched foods ' + this.state.watchedFoods);
      this.state.watchedFoods.forEach((food) => {
        localStorage.setItem(JSON.stringify(food._id), food);
      })
    }
  }
  handleEnter = (eventRaiser) => {
    if (eventRaiser.key === 'Enter') {
      this.getProduct(this.state.inputValue);
    }
  }
  render() {

    return (
      <div id="product-page">
        <Link to={{pathname: '/'}} id="back-home"><p>switch store</p></Link>
        <input id="text-field"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
          onKeyPress={this.handleEnter}
          placeholder={"Search " + this.props.location.query + "'s products"}
          />
          <div id="found-foods">{this.state.foundfoods}</div>
          <WatchedFoods watchedFood={this.state.watchedFoods} unwatchFood={this.unwatchFood}/>
      </div>
    );
  }
}

export default ProductComponent;
