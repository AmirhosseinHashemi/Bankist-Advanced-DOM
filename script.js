'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const navList = document.querySelector('.nav__links');

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
    console.log(true);
    const id = e.target.getAttribute('href');
    console.log(document.querySelector(id));
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
