import React, { Component } from 'react';
import '../Generated-CSS/Search.css';
import Autosuggest from 'react-autosuggest';

const Utility = require('../Shared/scripts/utility.js');

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getProduct(query){
    if (Utility.validateQuery(query)) {
      Utility.findProduct(query, (foods) => {
        this.setState({
          foods: foods.slice(0, 25)
        });
      });
    }
  }
  getStore(query) {
    console.log("In search Component getStore: " + query.name);
    if (Utility.validateQuery(query)) {
      Utility.findStore(query, (store) => {
        console.log("Found store: " + store);
      });
    }
  }
  renderSuggestion(suggestion){
    if (typeof suggestion !== undefined && suggestion !== null) {
      return (
        <div id="suggestions" onClick={() => this.getStore(suggestion)}>
          <div className="store-name">
            {suggestion.name}
          </div>
          <div className="store-location">
            {suggestion.location}
          </div>
        </div>
      );
    }
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for a store',
      value,
      onChange: Utility.onKeyPressEventListener.bind(this),
      id:"text-field"
    };
    return (
      <Autosuggest
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
