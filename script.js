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
