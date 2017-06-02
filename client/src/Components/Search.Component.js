import React, { Component } from 'react';
import '../Generated-CSS/Search.css';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';

const Utility = require('../Shared/scripts/utility.js');

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getStore(query) {
    if (Utility.validateQuery(query.name)) {
      Utility.findStore(query, (store) => {
        console.log("Found store: " + store);
      });
    }
  }
  renderSuggestion(suggestion){
    if (suggestion !== undefined && suggestion !== null) {
      return (
        <Link to={{pathname: '/products', query: suggestion.name}} id="suggestions">
          <div className="store-name">
            {suggestion.name}
          </div>
          <div className="store-location">
            {suggestion.location}
          </div>
        </Link>
      );
    }
  }
  handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log("Enter pushed: \n" + location.href);
      location.href += 'products';
    }
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for a store',
      value,
      onChange: Utility.onKeyPressEventListener.bind(this),
      onKeyPress: this.handleEnter,
      id:"text-field"
    };
    return (
      <Autosuggest
        highlightFirstSuggestion={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={Utility.fetchSuggestions.bind(this)}
        onSuggestionsClearRequested={Utility.clearSuggestions.bind(this)}
        getSuggestionValue={Utility.getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps}
      />
    );
  }
}
export default SearchComponent;
