import './css/styles.css';
import { FetchDataCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

let findCountries = new FetchDataCountries();

const refs = {
  counrtyInput: document.querySelector('#search-box'),
  counrtyList: document.querySelector('.country-list'),
  counrtyBlock: document.querySelector('.country-info'),
};

refs.counrtyInput.addEventListener('input', debounce(onInputFindCountry, DEBOUNCE_DELAY));

function onInputFindCountry(event) {
  findCountries
    .fetchCountries(event.target.value)
    .then(countries => createCountriesMarkup(countries))
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function createCountriesMarkup(countries) {
  // console.log(country);

  if (countries.length > 1 && countries.length <= 10) {
    refs.counrtyBlock.innerHTML = '';
    const markup = countries.map(country => console.log(country.name.official, country.capital));
  } else if (countries.length === 1) {
    refs.counrtyList.innerHTML = '';
    let oneCountryMarkup = `MARKUP FOR ONE COUNTRY!`;
    refs.counrtyBlock.insertAdjacentElement('beforeend', oneCountryMarkup);
  } else if (countries.length > 10) {
    refs.counrtyBlock.innerHTML = '';
    refs.counrtyList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

// добавить листенер на инпут с дебаунсом

// сделать отдельную функцию которая будет рисовать интерфейст в зависимости от того сколько пришло элементом (длинна массива) если много - как элементы списка в список если один в див
