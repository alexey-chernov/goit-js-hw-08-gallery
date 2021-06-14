'use strict'
export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

import pictures from "./galleryItems.js";

const refs = {
  galery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  body: document.querySelector('body'),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
}

const changePicture = (src, alt) => {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
};

const makeGalery = () => {
  let htmlText = '';
  pictures.map(({ preview, original, description }) => {
    htmlText += `<li class="gallery__item">
                <a
                  class="gallery__link"
                  href="${original}"
                >
                  <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                  />
                </a>
              </li>`
  });
  refs.galery.innerHTML = htmlText;
}
makeGalery();

const openModal = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return

  changePicture(e.target.dataset.source, e.target.attributes.alt.nodeValue);
  refs.lightbox.classList.add('is-open');
  refs.body.style.overflow = 'hidden';
}
refs.galery.addEventListener('click', openModal);

const closeModal = e => {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') return
  if (!refs.lightbox.classList.contains('is-open')) return

  changePicture('', '');
  refs.lightbox.classList.remove('is-open');
  refs.body.style.overflow = 'initial';
}
refs.lightbox.addEventListener('click', closeModal);

const showPictureLeftRightKey = (e) => {
  let x = -1;
  pictures.forEach((picture, index, array) => {
    if (picture.original === refs.lightboxImage.src && x === -1) {
      if (e.code === 'ArrowLeft') {
        x = index > 0 ? index - 1 : array.length - 1;
      } else {
        x = index === array.length - 1 ? 0 : index + 1;
      }
      changePicture(array[x].original, array[x].description);
    };
  });
}

document.addEventListener('keydown', (event) => {
  if (!refs.lightbox.classList.contains('is-open')) return

  switch (event.code) {
    case 'Escape':
      closeModal(event);
      break;

    case 'ArrowLeft':
      showPictureLeftRightKey(event);
      break;

    case 'ArrowRight':
      showPictureLeftRightKey(event);
      break;
  }
});
