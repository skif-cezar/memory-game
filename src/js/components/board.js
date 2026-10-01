import { createStats } from './stats.js';
import { createCard } from './card.js';

export const createBoard = () => {
  const main = document.createElement('main');
  main.classList.add('app__main');

  const stats = createStats();
  const card = createCard({
    id: 'tetefefbe',
    attributes: {
      'aria-label': 'Game card',
      'aria-pressed': 'false',
    },
  });

  main.append(stats, card);

  return main;
};
