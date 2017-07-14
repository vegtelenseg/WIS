import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import WatchedFoods  from './WatchedFoods.Component';
import FoundFoods from './FoundFoods.Component';
import '../Generated-CSS/Product-page.css';

const Utility = require('../Shared/scripts/utility.js');

const socket = io.connect('http://localhost:4300');

class ProductComponent extends Component {
constructor() {
  super();
  this.state = {
    watchedFoods: [],
    foundfoods:[],
    inputValue: '',
  }
  this.updateInputValue = this.updateInputValue.bind(this)

}

/**
 * Gets a product specified in the query variable using
 * a service backed by the fetch API
 * @param query : contains the name of the product to be retrieved
**/
getProduct = (query) => {
  if (query !== undefined && query !== null) {
    if (Utility.validateQuery(query)) {
      Utility.findProduct(query, (products) => {
        this.setState({
          foundfoods: products.map((product) => {
            return product;
          })
        });
      });
    }
  }
}

/**
 * Removes any previously selected products off the local storage
 * and updates the state.
 * @param itemIndex : carries the index of the item to be removed
**/
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
 * Captures the current state of the application and stores
 * selected products in local storage
 * @param food : contains the selected product to be stored
**/
watchFood = (product) => {
  localStorage.setItem(product.productId, JSON.stringify(product));
    const newFoods = this.state.watchedFoods.concat(product);
    this.setState({
      watchedFoods: newFoods
    });
}

/**
* Updates, in real-time, the value of the search box if any.
* @param eventRaiser : event trigger object
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
 * Updates the state with previously saved data in local storage.
**/
updateState = () => {
  for (var i = 0; i < localStorage.length; i++) {
    let itemKey = localStorage.key(i),
        item = localStorage.getItem(itemKey),
        parsedItem = JSON.parse(item);
        this.setState({
          watchedFoods: this.state.watchedFoods.push(parsedItem)
        });
  }
}

/**
* Updates, in real-time, the state of the component
* @param dataObject : Up-to-date product information object
* @param food : old product information object to be updated
**/
updateProduct = (dataObject, food) => {
  food.productCheckoutRate = dataObject.productCheckoutRate;
  food.productQty = dataObject.productQty;

  return food;
}

updateWatchedFoods = (dataObject) => {
  this.state.watchedFoods.map((food) => {
    if (food) {
      if (food.productId === dataObject.productId) {
        return this.updateProduct(dataObject, food);
      }
    }
    return true;
  });
}
/**
 * Finds the selected store.
 * Fires a 'product changed' event whenever the database changes.
 * @param store : contains the name of the selected store.
 * @param data : contains the up-to-date snapshot of the modified databse
**/
componentWillMount = () => {
  const store = this.props.location.query;
  if (store !== null && store !== undefined) {
    Utility.findStore(store, (store) => {
      console.log("Found store: " + store)
    });
  //  this.updateState();
    socket.on('product changed', (data) => {
      this.updateWatchedFoods(data.obj)
    this.setState({
      foundfoods: this.state.foundfoods.map((food) => {
        if (food) {
          if (food.productId === data.obj.productId) {
            return this.updateProduct(data.obj, food);
          }
        }
        return food;
      })
    })
  });
}
  else {
    // Go back, no store was selected.
    this.props.history.push('/');
  }
}

componentDidMount = () => {
  return this.updateState();
}

/**
 * Handles the click event of the ENTER key and fires appropriate call-to-action
 * @param eventRaiser : event trigger object
**/
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
          <FoundFoods found={this.state.foundfoods} watcher={this.watchFood}/>
          <WatchedFoods watchedFood={this.state.watchedFoods} unwatchFood={this.unwatchFood}/>
        </div>
    );
  }
}

export default ProductComponent;
