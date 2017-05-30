const STATUS_SUCCESS = 200;
const STATUS_REDIRECT = 300;

function search(query, callback) {
  let headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  return fetch(`api/food?q=${query}`, headers)
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
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
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

const Utility = { search };
export default Utility;
