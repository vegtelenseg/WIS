const stores = require('../json-data/stores.json');
const validator = require('./validators');

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function findStore(query, callback) {
  console.log("In Utility: " + query);
  if (typeof query !== undefined && query !== null) {
    return fetch(`api/find-store?q=${query}`, headers)
      .then(validator.checkStatus)
      .then(validator.parseJSON)
      .then(callback);
    }
}

export function findProduct(query, callback) {
  return fetch(`api/food?q=${query}`, headers)
    .then(validator.checkStatus)
    .then(validator.parseJSON)
    .then(callback);
}

export const getSuggestionValue = suggestion => suggestion.name;

export function getSuggestions(value) {
  if (value !== undefined && value !== null) {
    let inputValue = value.trim().toLowerCase();
    return inputValue.length === 0 ? [] : stores.filter(store =>
      store.name.toLowerCase().includes(inputValue) ||
      store.location.toLowerCase().includes(inputValue)
    );
  }
}
export function onKeyPressEventListener(eventRaiser, { newValue }) {
  this.setState({
    value: newValue
  });
};
export function fetchSuggestions({ value }){
  this.setState({
    suggestions: getSuggestions(value)
  });
};
export function clearSuggestions() {
  this.setState({
    suggestions: []
  });
};

export function validateQuery(query) {
  if (query !== undefined && query !== null) {
    query = query.replace(/[ ]{1,}/g, ' ').trim();
    if (query.length > 0) {
      return true;
    }
  }
  return false;
}
