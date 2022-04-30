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
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.counrtyBlock.innerHTML = '';
      refs.counrtyList.innerHTML = '';
    });
}

function createCountriesMarkup(countries) {

  if (countries.length > 1 && countries.length <= 10) {
    refs.counrtyBlock.innerHTML = '';
    const markupList = countries.map(
      country => `<li><div class="country-wrapper">
        <img src=${country.flags.svg} alt=${country.name.common} width="25" height="25" />
        <p class="country-name-small">${country.name.common}</p>
      </div></li>`,
    );
    refs.counrtyList.innerHTML = markupList.join('');
  } else if (countries.length === 1) {
    refs.counrtyList.innerHTML = '';
    const countryLangs = Object.values(countries[0].languages).join(', ');
    console.log(countryLangs);
    let oneCountryMarkup = `<div class="country-wrapper">
        <img src=${countries[0].flags.svg} alt=${countries[0].name.common} width="25" height="25" />
        <p class="country-name">${countries[0].name.common}</p>
      </div>
      <p><b>Capital:</b>  ${countries[0].capital}</p>
      <p><b>Population:</b>  ${countries[0].population}</p>
      <p><b>Lanuguages:</b>  ${countryLangs}</p>`;
    refs.counrtyBlock.innerHTML = oneCountryMarkup;
  } else if (countries.length > 10) {
    refs.counrtyBlock.innerHTML = '';
    refs.counrtyList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

// добавить листенер на инпут с дебаунсом

// сделать отдельную функцию которая будет рисовать интерфейст в зависимости от того сколько пришло элементом (длинна массива) если много - как элементы списка в список если один в див
