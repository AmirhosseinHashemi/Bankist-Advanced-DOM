'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const navList = document.querySelector('.nav__links');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');

const nav = document.querySelector('.nav');

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');

const imageTargets = document.querySelectorAll('img[data-src]');

const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

///////// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////// Smooth scrolling
// handle button
btnScrollTo.addEventListener('click', function () {
  // old way:
  // const sectionCoord = sectionOne.getBoundingClientRect();
  // window.scrollTo({
  //   left: sectionCoord.x + window.scrollX,
  //   top: sectionCoord.y + window.scrollY,
  //   behavior: 'smooth',
  // });

  // modern way:
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

// handle navigation links
navList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////// Tabbed components
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkHoverd = e.target;
    const sibling = linkHoverd
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = document.querySelector('.nav__logo');

    sibling.forEach(link => {
      if (link !== linkHoverd) {
        link.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////// Sticky navigation

// old way and bad practice
// const initialCoords = sectionOne.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const navHeight = nav.getBoundingClientRect().height; // or getComputedStyle(nav).height
const stickyNav = function (entries) {
  const [{ isIntersecting: intersecting }] = entries;
  intersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////// Revealing sections
const revealSection = function (entries, observer) {
  const [{ isIntersecting, target }] = entries;
  if (!isIntersecting) return;

  target.classList.remove('section--hidden');
  observer.unobserve(target);
};

const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0.15],
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionsObserver.observe(section);
});

////////// Lazy loading image
const loadImg = function (entries, observer) {
  const [{ isIntersecting, target: image }] = entries;
  if (!isIntersecting) return;

  image.src = image.dataset.src;
  image.addEventListener('load', function () {
    image.classList.remove('lazy-img');
  });
  observer.unobserve(image);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageTargets.forEach(img => imageObserver.observe(img));

////////// Slider
const slider = function () {
  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach((_, i) => {
      const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotsContainer.insertAdjacentHTML('beforeend', dot);
    });
  };

  const orderSlide = function (counter) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - counter) * 100}%)`;
    });
  };

  const activeDot = function (counter) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${counter}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    createDots();
    orderSlide(0);
    activeDot(0);
  };
  init();

  const next = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    orderSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prev = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    orderSlide(currentSlide);
    activeDot(currentSlide);
  };

  btnRight.addEventListener('click', next);
  btnLeft.addEventListener('click', prev);

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      orderSlide(e.target.dataset.slide);
      activeDot(e.target.dataset.slide);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') next();
    e.key === 'ArrowLeft' && prev();
  });
};
slider();
