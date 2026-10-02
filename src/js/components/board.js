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

  const renderCards = () => {
    boardContainer.replaceChildren();

    // Get free array 16 cards
    const cardsData = game.generateCardsData();

    cardsData.forEach((data) => {
      const card = createCard(data);
      boardContainer.append(card);
    });
  };

  renderCards();

  boardContainer.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card');

    if (cardElement) {
      game.handleCardClick(cardElement);
    }
  });

  const resetBoard = () => {
    renderCards();
  };

  main.append(stats, boardContainer);

  return {
    element: main,
    resetBoard,
  };
};
