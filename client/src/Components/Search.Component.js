import React, { Component } from 'react';
import '../Generated-CSS/Search.css';
import Utility from './Utility';
import 'whatwg-fetch';

const MATCHING_ITEM_LIMIT = 25;

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      inputVal: ''
    }
  }
  keystrokeEventListener(eventRaiser) {
    this.setState({
      inputVal: eventRaiser.target.value
    });
  }
  returnKeyEventListener(eventRaiser){
    if (eventRaiser.key === 'Enter') {
      let query = eventRaiser.target.value;
      this.validateQueryAndSearch(query);
    }
  }
  validateQueryAndSearch(query) {
    if (typeof query !== undefined && query !== null) {
      query = query.replace(/[ ]{1,}/g, ' ').trim();
      if (query.length > 0) {
        this.searchEngine(query);
      }
    }
  }
  searchEngine(query) {
    console.log("About to search for: " + query);
    Utility.search(query, (foods) => {
      console.log("The found foods are: " + JSON.stringify(foods));
      this.setState({
        foods: foods.slice(0, MATCHING_ITEM_LIMIT)
      });
    });
  }
  render() {
    const { foods } = this.state;
    const foodRows = foods.map((food, idx) => {
      return(
        <div className="food-parent" key={idx} onClick={() => this.props.onFoodClick(idx)}>
          <div className="food-container">
            <div className="food-item">
              <div>
                {food}
              </div>
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
          <div>{foodRows}</div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
