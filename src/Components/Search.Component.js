import React, { Component } from 'react';
import '../Generated-CSS/Search.css';
import 'whatwg-fetch';
import SearchResultsComponent from './SearchResults.Component';

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: ''
    }
  }
  render() {
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
        </div>
      </div>
    );
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
        this.searchEngine(query).then(result => {
          console.log(result);
            return (
              <SearchResultsComponent results={result}/>
            );
          }
        );
      }
    }
  }
  async searchEngine(query) {
      console.log("Inside the search function: " + query);
      return fetch('https://raw.githubusercontent.com/github/fetch/master/package.json')
        .then(function(res) {
          return res.text()
        }).then(function(resBody) {
          return resBody;
        }).catch(function(error) {
          console.log("Did not find anything: " + error);
        })
  }
}

export default SearchComponent;
