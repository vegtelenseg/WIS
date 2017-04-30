import React, { Component } from 'react';

class SearchResultsComponent extends Component {
  render() {
    return (
      <div id="search-results-parent">
        <div id="search-results-container"></div>
        <div id="search-results">
          <p>{this.props.results}</p>
        </div>
      </div>
    );
  }
}

export default SearchResultsComponent;
