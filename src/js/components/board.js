import { createStats } from './stats.js';
import { createCard } from './card.js';
import { createGame } from '../core/game.js';

export const createBoard = ({ onWin } = {}) => {
  const main = document.createElement('main');
  main.classList.add('app__main');

  const boardContainer = document.createElement('section');
  boardContainer.classList.add('board');

  const stats = createStats();
  const game = createGame({ onWin });

  // Get data for 16 cards
  const cardsData = game.generateCardsData();

  // Render cards
  cardsData.forEach((data) => {
    const card = createCard(data);
    boardContainer.append(card);
  });

  boardContainer.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card');

    if (cardElement) {
      game.handleCardClick(cardElement);
    }
  });

  main.append(stats, boardContainer);

  return main;
};
