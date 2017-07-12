const STATUS_SUCCESS = 200;
const STATUS_REDIRECT = 300;

export function validateQuery(query) {
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

export function checkStatus(response) {
  if (response.status >= STATUS_SUCCESS && response.status < STATUS_REDIRECT) {
    return response;
  }
  throwError(response);
}

export function parseJSON(response) {
  return response.json();
}

function throwError(response) {
  const error = new Error(`${response.statusText}\nReturned status: ${response.status}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}
