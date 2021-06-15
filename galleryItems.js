const galleryItems = [
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

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  btnModalClose: document.querySelector('.lightbox__button'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxContentImage: document.querySelector('.lightbox__image'),
};

const galleryItemMarkup = createItemCardsMarkup(galleryItems);

refs.galleryContainer.insertAdjacentHTML('beforeend', galleryItemMarkup);
refs.galleryContainer.addEventListener('click', openModal);
refs.btnModalClose.addEventListener('click', closeModal);
refs.lightboxOverlay.addEventListener('click', onBackdropClick);

function createItemCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `
      <li 
          class="gallery__item">
              <a
                  class="gallery__link"
                  href="${original}"
              >
              <img
                  class="gallery__image"
                  id="${index + 1}"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
              />
              </a>
      </li>`;
    })
    .join('');
};

function getImgAttributes(event) {
  const imgTargetEl = event.target;
  refs.lightboxContentImage.src = `${imgTargetEl.dataset.source}`;
  refs.lightboxContentImage.alt = `${imgTargetEl.alt}`;
  refs.lightboxContentImage.id = `${imgTargetEl.id}`;
}

function removeImgAttributes() {
  refs.lightboxContentImage.removeAttribute("src");
  refs.lightboxContentImage.removeAttribute("alt");
  refs.lightboxContentImage.removeAttribute("id");
};

function openModal(event) {
  event.preventDefault();
  const isImageEl = event.target.classList.contains('gallery__image');
  if (!isImageEl) {
    return;
  }
  refs.lightbox.classList.add('is-open');
  getImgAttributes(event);
  window.addEventListener('keydown', onPressEscKey);
  window.addEventListener('keydown', onLeftRightKey);
};

function closeModal() {
  refs.lightbox.classList.remove('is-open');
  removeImgAttributes();
  window.removeEventListener('keydown', onPressEscKey);
  window.removeEventListener('keydown', onLeftRightKey);
};

function onPressEscKey(event) {
  const EscKeyCode = 'Escape';
  if (event.code === EscKeyCode) {
    closeModal();
  }
};

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
};

function onLeftRightKey(event) {
  const ArrR_KEY_CODE = 'ArrowRight';
  const ArrL_KEY_CODE = 'ArrowLeft';
  const currentId = refs.lightboxContentImage.getAttribute("id");
  if (event.code === ArrR_KEY_CODE) {
    const newId = + currentId + 1;
    changeImageOnPressRight(newId);
  } else if (event.code === ArrL_KEY_CODE) {
    const newId = + currentId - 1;
    changeImageOnPressLeft(newId);
  }
};

function changeImageOnPressRight(argument) {
  if (argument <= galleryItems.length) {
    const nextImg = document.getElementById(`${argument}`);
    const nextSrc = nextImg.getAttribute("data-source");
    refs.lightboxContentImage.id = `${argument}`;
    refs.lightboxContentImage.src = `${nextSrc}`;
  } else {
    const nextImg = document.getElementById(`${argument - galleryItems.length}`);
    const nextSrc = nextImg.getAttribute("data-source");
    refs.lightboxContentImage.id = `${argument - galleryItems.length}`;
    refs.lightboxContentImage.src = `${nextSrc}`;
  }
};

function changeImageOnPressLeft(argument) {
  if (argument >= 1) {
    const nextImg = document.getElementById(`${argument}`);
    const nextSrc = nextImg.getAttribute("data-source");
    refs.lightboxContentImage.id = `${argument}`;
    refs.lightboxContentImage.src = `${nextSrc}`;
  } else {
    const nextImg = document.getElementById(`${argument + galleryItems.length}`);
    const nextSrc = nextImg.getAttribute("data-source");
    refs.lightboxContentImage.id = `${argument + galleryItems.length}`;
    refs.lightboxContentImage.src = `${nextSrc}`;
  }
};