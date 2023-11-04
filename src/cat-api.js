import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_KNg3jkjpr20At6KBE5lMJWksSwiyIIRSaWBdNVCT4m9PByBugBdpl3oG65cXuwqP';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${API_URL}/breeds`)
    .then((response) => {
      if (!response.data) {
        throw new Error('Failed to fetch breeds');
      }
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to fetch breeds: ' + error.message);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${API_URL}/images/search?breed_ids=${breedId}`)
    .then((response) => {
      if (!response.data) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to fetch cat by breed: ' + error.message);
    });
}
