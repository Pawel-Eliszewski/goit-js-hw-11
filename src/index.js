import {
  gallery,
  loadBtn,
  input,
  renderGalleryByName,
} from './js/renderGalleryByName';

const submitBtn = document.querySelector('.search-form__btn');

loadBtn.style.display = 'none';

let page = 1;

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  if (input.value !== 0) {
    gallery.innerHTML = '';
    loadBtn.style.display = 'none';
    page = 1;
  }
  renderGalleryByName(page);
});

loadBtn.addEventListener('click', e => {
  e.preventDefault();
  page += 1;
  renderGalleryByName(page);
});
