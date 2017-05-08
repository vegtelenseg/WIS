import React, { Component } from 'react';
import '../Generated-CSS/Search.css';
import Utility from './Utility';
import 'whatwg-fetch';

const MATCHING_ITEM_LIMIT = 25;
const SINGLE_SPACE = ' ';
const EMPTY= '';
const ENTER= 'Enter';

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      inputVal: EMPTY
    }
  }
  keystrokeEventListener(eventRaiser) {
    this.setState({
      inputVal: eventRaiser.target.value
    });
  }
  returnKeyEventListener(eventRaiser){
    console.log(eventRaiser.key);
    if (eventRaiser.key === ENTER) {
      let query = eventRaiser.target.value;
      this.validateQueryAndSearch(query);
    }
  }
  validateQueryAndSearch(query) {
    if (typeof query !== undefined && query !== null) {
      query = query.replace(/[ ]{1,}/g, SINGLE_SPACE).trim();
      if (query.length > 0) {
        this.searchEngine(query);
      }
    }
  }
  searchEngine(query) {
    Utility.search(query, (foods) => {
      this.setState({
        foods: foods.slice(0, MATCHING_ITEM_LIMIT)
      });
    });
  }
  render() {
    const { foods } = this.state;
    const foodRows = foods.map((food, idx) => {
      return(
        <div className="food-parent"
          key={idx}
          onClick={() => this.props.onFoodClick(food)}>
          <div className="food-container">
            <div className="food-item">
              <span>Product Name: {food.productName}<br/></span>
              <span>Quantity: {food.productQty} left<br/></span>
              <span>Best Before: {food.productBestBefore}<br/></span>
              <span>Price: R {food.price}<br/></span>
              <span>Checkout Rate: {food.productCheckoutRate} per hour</span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div id="search-parent">
        <div id="search-container">
          <div id="store-logo-container">
            <div id="store-logo"></div>
          </div>
          <div id="search-field">
            <input type="text" id="text-field"
                  value={this.state.inputVal}
                  onKeyPress={this.returnKeyEventListener.bind(this)}
                  onChange={this.keystrokeEventListener.bind(this)}
                  placeholder="Search Spar items here..."
            />
          </div>
          <div id="food-row">{foodRows}</div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
