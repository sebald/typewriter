import { typewriter } from './lib.js';

const INPUT_DATA = [
  // Text input example
  {
    get: () => document.querySelector('input[name="eventName"]'),
    text: 'Shell Shocked Music Fest 2024',
  },

  // Text input example
  {
    get: () => document.querySelector('input[name="artist"]'),
    text: 'The Groovy Turtles',
  },

  // Select dropdown example
  {
    get: () => document.querySelector('select[name="eventType"]'),
    select: 'festival',
  },

  // Text input example
  {
    get: () => document.querySelector('input[name="eventLocation"]'),
    text: 'Turtle Bay Amphitheater',
  },

  // Checkbox example - enable
  {
    get: () => document.querySelector('input[name="musicProvided"]'),
    check: true,
  },

  // Checkbox example - disable (if there was another checkbox)
  {
    get: () => document.querySelector('input[name="outdoorVenue"]'),
    check: false,
  },

  // Textarea example
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
