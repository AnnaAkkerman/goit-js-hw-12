import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from '../src/img/bi_x-octagon.svg';
import axios from 'axios';

const searchForm = document.querySelector('.js-search-form');
const list = document.querySelector('.gallery');
let spanLoader = document.querySelector('.loader');
let loadBtn;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let perPage = 15;
let totalPages;

const handleSubmit = async e => {
  e.preventDefault();

  const value = e.target.elements.search.value;

  loadBtn = document.querySelector('.loadBtn');
  if (loadBtn) loadBtn.remove();

  if (value !== '') {
    page = 1;
    list.innerHTML = '';

    searchForm.insertAdjacentHTML('afterend', '<span class="loader"></span>');
    spanLoader = document.querySelector('.loader');

    const data = await getPictures(value);
    setTimeout(() => {
      if (spanLoader) spanLoader.remove();
      renderImages(data.hits);

      totalPages = Math.ceil(data.totalHits / perPage);
      if (page < totalPages) {
        addButtonLoad(value);
      } else {
        if (data.hits.length !== 0) {
          iziToast.error({
            position: 'topRight',
            message:
              "We're sorry, but you've reached the end of search results.",
          });
        }
      }
    }, 500);
  }
  searchForm.reset();
};

const getPictures = async value => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42121827-736028e2edd071afefc989558',
      q: `${value}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
};

function renderImages(arr) {
  if (arr.length === 0) {
    return iziToast.show({
      message: `Sorry, there are no images matching<br>your search query. Please try again!`,
      messageColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(239, 64, 64, 1)',
      iconUrl: errorIcon,
      position: 'topRight',
    });
  }
  const markup = imageTemplate(arr);
  list.insertAdjacentHTML('beforeend', markup);
  gallery.on('show.simplelightbox');
  gallery.refresh();
}

function imageTemplate(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <div class="image-container">
                <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="gallery-image"></a>
            </div>
            <div class="gallery-card">
                <p><span class="description">Likes</span>${likes}</p>
                <p><span class="description">Views</span>${views}</p>
                <p><span class="description">Comments</span>${comments}</p>
                <p><span class="description">Downloads</span>${downloads}</p>
            </div>
        </li>`
    )
    .join('');
}

function addButtonLoad(value) {
  list.insertAdjacentHTML(
    'afterend',
    '<button type="button" class="loadBtn">Load more</button>'
  );
  loadBtn = document.querySelector('.loadBtn');

  loadBtn.addEventListener('click', async () => {
    loadBtn.insertAdjacentHTML('beforebegin', '<span class="loader"></span>');
    loadBtn.remove();

    page += 1;

    const data = await getPictures(value);
    setTimeout(() => {
      spanLoader = document.querySelector('.loader');
      if (spanLoader) spanLoader.remove();
      renderImages(data.hits);
      list.parentNode.insertBefore(loadBtn, list.nextSibling);

      if (page >= totalPages) {
        loadBtn.remove();
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      const galleryItem = document.querySelector('.gallery-item:last-child');
      if (galleryItem) {
        const rect = galleryItem.getBoundingClientRect().height;
        window.scrollBy({
          top: rect * 2,
          behavior: 'smooth',
        });
      }
    }, 500);
  });
}

searchForm.addEventListener('submit', handleSubmit);
