import { createButton } from './button.js';

export const createHeader = ({ onNewGame, onOpenLeaderboard } = {}) => {
  const header = document.createElement('header');
  header.classList.add('header');

  const container = document.createElement('div');
  container.classList.add('header__container');

  const title = document.createElement('h1');
  title.classList.add('header__title');
  title.textContent = 'Star Wars Memory Game';

  const nav = document.createElement('nav');
  nav.classList.add('header__nav');
  nav.setAttribute('aria-label', 'Game controls');

  const btnNewGame = createButton({
    text: 'New Game',
    id: 'btn-header-new-game',
    attributes: {
      'aria-label': 'Start a new game',
    },
  });

  const btnLeaderboard = createButton({
    text: 'Leaderboard',
    id: 'btn-header-leaderboard',
    attributes: {
      'aria-haspopup': 'dialog',
      'aria-controls': 'modal-leaderboard',
      'aria-label': 'Open Leaderboard',
    },
  });

  if (onNewGame) {
    btnNewGame.addEventListener('click', onNewGame);
  }

  if (onOpenLeaderboard) {
    btnLeaderboard.addEventListener('click', onOpenLeaderboard);
  }

  nav.append(btnNewGame, btnLeaderboard);
  container.append(title, nav);
  header.append(container);

  return header;
};
