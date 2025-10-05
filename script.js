import { typewriter } from './lib.js';

const INPUT_DATA = [
  {
    get: () => document.querySelector('input[name="eventName"]'),
    text: 'Shell Shocked Music Fest 2024',
  },
  {
    get: () => document.querySelector('input[name="artist"]'),
    text: 'The Groovy Turtles',
  },
  {
    get: () => document.querySelector('input[name="eventLocation"]'),
    text: 'Turtle Bay Amphitheater',
  },
  {
    get: () => document.querySelector('textarea[name="description"]'),
    text: 'Slow down and jam out with us at the Shell Shocked Music Fest! Enjoy a night of toe-tapping tunes, turtle-themed treats, and shell-abrations with The Groovy Turtles.',
  },
];

window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
    e.preventDefault();
    typewriter(INPUT_DATA);
  }
});
