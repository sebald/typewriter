import { typewriter } from './lib.js';

const INPUT_DATA = [
  // Text input example
  {
    get: () => document.querySelector('input[name="eventName"]'),
    type: 'text',
    value: 'Shell Shocked Music Fest 2024',
  },

  // Text input example
  {
    get: () => document.querySelector('input[name="artist"]'),
    type: 'text',
    value: 'The Groovy Turtles',
  },

  // Select dropdown example
  {
    get: () => document.querySelector('select[name="eventType"]'),
    type: 'select',
    value: 'festival',
  },

  // Text input example
  {
    get: () => document.querySelector('input[name="eventLocation"]'),
    type: 'text',
    value: 'Turtle Bay Amphitheater',
  },

  // Checkbox example - enable
  {
    get: () => document.querySelector('input[name="musicProvided"]'),
    type: 'check',
    value: true,
  },

  // Checkbox example - disable
  {
    get: () => document.querySelector('input[name="outdoorVenue"]'),
    type: 'check',
    value: false,
  },

  // Textarea example
  {
    get: () => document.querySelector('textarea[name="description"]'),
    type: 'text',
    value:
      'Slow down and jam out with us at the Shell Shocked Music Fest! Enjoy a night of toe-tapping tunes, turtle-themed treats, and shell-abrations with The Groovy Turtles.',
  },
];

window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
    e.preventDefault();
    typewriter(INPUT_DATA);
  }
});
