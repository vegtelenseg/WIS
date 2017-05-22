import React, { Component } from 'react';
import Utility from './Utility';
import '../Generated-CSS/Search.css';
import Autosuggest from 'react-autosuggest';

const stores = require('../Shared/stores.json');

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getSuggestionValue = suggestion => suggestion.name;
  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0 ? [] : stores.filter(store =>
      store.name.toLowerCase().includes(inputValue) ||
      store.location.toLowerCase().includes(inputValue)
    );
  };
  onChange(eventRaiser, { newValue }) {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };
  validateQueryAndSearch(query) {
    query = query.name; // Might need to search by location
    if (typeof query !== undefined && query !== null) {
      query = query.replace(/[ ]{1,}/g, ' ').trim();
      if (query.length > 0) {
        this.searchEngine(query);
      }
    }
  }
  searchEngine(query){
    Utility.search(query, (foods) => {
      this.setState({
        foods: foods.slice(0, 25)
      });
    });
  }
  renderSuggestion(suggestion){
    return (
      <div id="autosuggest" onClick={() => this.validateQueryAndSearch(suggestion)}>
        <div className="store-name">
          {suggestion.name}
        </div>
        <div className="store-location">
          {suggestion.location}
        </div>
      </div>
    );
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for a store',
      value,
      onChange: this.onChange.bind(this),
      id:"text-field"
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps}
      />
    );
  }
}
export default SearchComponent;
