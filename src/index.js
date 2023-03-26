import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import Axios from 'axios';

const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const input = document.querySelector('.search-form__input');
const submitBtn = document.querySelector('.search-form__btn');

loadBtn.style.display = 'none';

async function renderGalleryByName(page) {
  const API_KEY = '34700780-6518b738595d403a93012b466';
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(input.value.trim()) +
    '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40' +
    '&page=' +
    `${page}`;

  if (input.value === '') {
    Notiflix.Notify.info('Please type image name.');
    loadBtn.style.display = 'none';
  } else
    try {
      const response = await Axios.get(`${URL}`);
      const hits = response.data.hits;
      if (hits.length < 40 > 0) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadBtn.style.display = 'none';
      } else {
        loadBtn.style.display = 'flex';
      }
      const hitsImages = hits
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) =>
            `<div class="gallery__photo-card">
        <a class="gallery__photo-card__img--large" href=${largeImageURL}>
        <img class="gallery__photo-card__img--small" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="gallery__photo-card__info">
        <p class="gallery__photo-card__info-item">
        <b>Likes</b> ${likes}
        </p>
        <p class="gallery__photo-card__info-item">
        <b>Views</b> ${views}
        </p>
        <p class="gallery__photo-card__info-item">
        <b>Comments</b> ${comments}
        </p>
        <p class="gallery__photo-card__info-item">
        <b>Downloads</b> ${downloads}
        </p>
        </div>
        </div>`
        )
        .join('');

      gallery.insertAdjacentHTML('beforeend', hitsImages);

      const galleryLightbox = new SimpleLightbox('.gallery a');

      if (response.data.totalHits !== 0 && `${page}` === '1') {
        Notiflix.Notify.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );
      } else if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (`${page}` !== '1') {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.error(error);
    }
}

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
