const BASE_URL = 'https://restcountries.com/v3.1/';

export class FetchDataCountries {
  constructor() {}

  fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(countries => {
        return countries;
      })
      .catch(error => console.log(`This is class catched error: ${error}`));
  }
}
