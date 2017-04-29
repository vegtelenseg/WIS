import React, { Component } from 'react';
import '../Generated-CSS/Search.css';

class SearchComponent extends Component {
  render() {
    return (
      <div id="search-parent">
        <div id="search-container">
          <div id="store-logo-container">
            <div id="store-logo"></div>
          </div>
          <div id="search-field">
            <input type="text" id="text-field" placeholder="Search Spar items here..."/>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
