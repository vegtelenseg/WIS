const stores = require('../Shared/stores.json');
const STATUS_SUCCESS = 200;
const STATUS_REDIRECT = 300;
const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
});
function getProduct(query, callback) {
  return fetch(`api/food?q=${query}`, headers)
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
}

function findStore(query, callback) {
  return fetch(`api/find-store?q=${query.name}`, headers)
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
}

const getSuggestionValue = suggestion => suggestion.name;
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  return inputValue.length === 0 ? [] : stores.filter(store =>
    store.name.toLowerCase().includes(inputValue) ||
    store.location.toLowerCase().includes(inputValue)
  );
};
function onChange(eventRaiser, { newValue }) {
  this.setState({
    value: newValue
  });
};
function onSuggestionsFetchRequested({ value }){
  this.setState({
    suggestions: getSuggestions(value)
  });
};
function onSuggestionsClearRequested() {
  this.setState({
    suggestions: []
  });
};

function validateQuery(query) {
  console.log(query.name + " " + query.location);
  query = query.name; // Might need to search by location
  if (typeof query !== undefined && query !== null) {
    query = query.replace(/[ ]{1,}/g, ' ').trim();
    if (query.length > 0) {
      return true;
    }
  }
  return false;
}

function checkStatus(response) {
  if (response.status >= STATUS_SUCCESS && response.status < STATUS_REDIRECT) {
    return response;
  }
  throwError(response);
}

function parseJSON(response) {
  return response.json();
}

function throwError(response) {
  const error = new Error(`HTTP Error ${response.statusText} ${response.status}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

const Utility = { getProduct, findStore, getSuggestionValue, onChange,
                  onSuggestionsFetchRequested, onSuggestionsClearRequested,
                  validateQuery};
export default Utility;
