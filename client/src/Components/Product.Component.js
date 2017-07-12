import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WatchedFoods  from './WatchedFoods.Component';
import FoundFoods from './FoundFoods.Component';
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
              <div id={food.productId} key={idx} onClick={() => this.watchFood(food)}>
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
    let itemKey = localStorage.key(itemIndex);
    localStorage.removeItem(itemKey);
    this.setState({
      watchedFoods: filteredFoods
    });
   }

  /**
  * Captures the current state and locally persists it.
  * If state is not set, it gracefully ignores this component unmounting
  **/
  watchFood = (food) => {
    localStorage.setItem(food._id, JSON.stringify(food));
      const newFoods = this.state.watchedFoods.concat(food);
      this.setState({
        watchedFoods: newFoods
      });
  }

  /**
  * Updates the value of the search box if any.
  **/
  updateInputValue = (eventRaiser) => {
    eventRaiser.preventDefault();
    let val = eventRaiser.target.value;
    if (val !== undefined && val !== null) {
      this.setState({
        inputValue: eventRaiser.target.value
      });
    }
  }

  /**
  * Finds the seclected store and loads up the previously
  * watched items if there were any, otherwise redirects to
  * the home page.
  **/
  componentWillMount = () => {
    const store = this.props.location.query;
    if (store !== null && store !== undefined) {
      Utility.findStore(store, (store) => {
        console.log("Found store: " + store)
      });
      for (var i = 0; i < localStorage.length; i++) {
        let itemKey = localStorage.key(i),
            item = localStorage.getItem(itemKey),
            parsedItem = JSON.parse(item);
        this.state.watchedFoods.push(parsedItem);
      }
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

    return (
      <div id="product-page">
        <Link to={{pathname: '/'}} id="back-home"><p>switch store</p></Link>
        <input id="text-field"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
          onKeyPress={this.handleEnter}
          placeholder={"Search " + this.props.location.query + "'s products"}
          />
          <FoundFoods found={this.state.foundfoods}/>
          <WatchedFoods watchedFood={this.state.watchedFoods} unwatchFood={this.unwatchFood}/>
      </div>
    );
  }
}

export default ProductComponent;
