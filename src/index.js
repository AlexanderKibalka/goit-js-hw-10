import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { selector, catInfo, loader, error } = ref;

loader.classList.remove('is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let slimSelect;

fetchBreeds()
  .then(breeds => {
    const markup = breeds.map(({id, name}) => `<option value="${id}">${name}</option>`)
      selector.innerHTML = markup;
      selector.classList.toggle('is-hidden');
      loader.classList.toggle('is-hidden');
      new SlimSelect({
        select: selector,
      });
    })
  .catch(error => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      position: 'center-top',
      width: '100%',
      useIcon: false,
    });
    console.log(error);
  });

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  catInfo.innerHTML = '';
  loader.classList.remove('is-hidden');
  selector.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      selector.classList.remove('is-hidden');
      catInfo.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `
      <img src="${url}" alt="${breeds[0].name}" width="400"/>
       <div class="box">
       <h1>${breeds[0].name}</h1>
       <p>${breeds[0].description}</p>
       <p>Характер: ${breeds[0].temperament}</p>
       </div>`;
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  loader.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}


