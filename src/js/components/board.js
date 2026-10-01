import { createStats } from './stats.js';

export const createBoard = () => {
  const main = document.createElement('main');
  main.classList.add('app__main');

  const stats = createStats();

  main.append(stats);

  return main;
};
