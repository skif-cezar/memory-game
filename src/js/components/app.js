import { createBackground } from './background.js';
import { createHeader } from './header';
import { createBoard } from './board';
import { createModal } from './modal';
import { createButton } from './button';
import { createWinBody } from './winBody';
import { createLeaderboardTable } from './leaderboardTable.js';

export const createApp = () => {
  // Пример данных таблицы
  const leaderboardData = [
    { place: 1, moves: 13, date: '30.09.2026' },
    { place: 2, moves: 16, date: '01.10.2026' },
    { place: 3, moves: 21, date: '01.10.2026' },
  ];

  const backgroundCanvas = createBackground();

  const app = document.createElement('div');
  app.classList.add('app');

  const header = createHeader();

  // Show/hide modal
  const openModal = (modalElement) => {
    modalElement.removeAttribute('inert');
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.classList.add('modal--open');
  };

  const closeModal = (modalElement) => {
    if (modalElement.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    modalElement.setAttribute('inert', '');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.classList.remove('modal--open');
  };

  const handleWin = (movesCount) => {
    const movesCountElement = winModal.querySelector('.win__count-moves');
    if (movesCountElement) {
      movesCountElement.textContent = movesCount;
    }
    openModal(winModal);
  };

  //const board = createBoard({ onWin: handleWin });
  const { element: boardElement, resetBoard } = createBoard({ onWin: handleWin });
  const btnNewGame = createButton({
    text: 'New Game',
    id: 'btn-new-game',
    attributes: {
      'aria-label': 'Start a new game',
    },
  });
  const btnCloseWinModal = createButton({
    text: 'Close',
    id: 'btn-close',
    classNames: ['btn--close'],
    attributes: {
      'aria-label': 'Close',
    },
  });
  const winModal = createModal({
    text: 'Win!',
    attributesModal: {
      'aria-hidden': 'true',
    },
    bodyContent: createWinBody(),
    actionsContent: [btnNewGame, btnCloseWinModal],
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Win!',
    },
  });

  // Close
  btnCloseWinModal.addEventListener('click', () => {
    closeModal(winModal);
  });

  // Restart
  btnNewGame.addEventListener('click', () => {
    closeModal(winModal);
    resetBoard();
  });

  const btnCloseLeaderBoardModal = createButton({
    text: 'Close',
    id: 'btn-close',
    classNames: ['btn--close'],
    attributes: {
      'aria-label': 'Close',
    },
  });

  btnCloseLeaderBoardModal.addEventListener('click', () => {
    closeModal(leaderBoardModal);
  });

  const tableElement = createLeaderboardTable(leaderboardData);
  const leaderBoardModal = createModal({
    text: 'Leaderboard',
    bodyContent: tableElement,
    actionsContent: [btnCloseLeaderBoardModal],
    attributesModal: {
      'aria-hidden': 'true',
    },
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Leaderboard',
    },
  });

  app.append(backgroundCanvas, header, boardElement, winModal, leaderBoardModal);

  return app;
};
