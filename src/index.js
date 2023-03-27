import {
  gallery,
  loadBtn,
  input,
  infinityBtn,
  infinityScroll,
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

document.addEventListener('DOMContentLoaded', function (e) {
  document.addEventListener('scroll', function (e) {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 200;
    if (
      infinityBtn.checked === true &&
      gallery.children.length % 10 === 0 &&
      currentScroll + modifier > documentHeight
    ) {
      page += 1;
      renderGalleryByName(page);
    }
  });
});

infinityBtn.addEventListener('click', () => {
  infinityScroll();
  if (gallery.children.length % 10 !== 0) {
    loadBtn.style.display = 'none';
  }
});

loadBtn.addEventListener('click', e => {
  e.preventDefault();
  page += 1;
  renderGalleryByName(page);
});
