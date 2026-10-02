import './styles/main.scss';
import { createApp } from './js/components/app.js';
import { preloadImages } from './js/utils/preloadImages.js';

preloadImages().then(() => {
  console.log('All images loaded');
});

document.body.append(createApp());
