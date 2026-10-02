import { createBackground } from './background.js';
import { createHeader } from './header';
import { createBoard } from './board';
import { createModal } from './modal';
import { createButton } from './button';
import { createWinBody } from './winBody';
import { createLeaderboardTable } from './leaderboardTable.js';
import { openModal } from '../utils/openModal.js';
import { closeModal } from '../utils/closeModal.js';
import { getLeaderboard, saveGameResult } from '../utils/leaderboardStorage.js';
import { playWinSound, stopWinSound } from '../utils/winSound.js';

export const createApp = () => {
  const backgroundCanvas = createBackground();

  const app = document.createElement('div');
  app.classList.add('app');

  app.append(backgroundCanvas.element);

  const leaderboardBodyContainer = document.createElement('div');
  let currentTableElement = createLeaderboardTable(getLeaderboard());
  leaderboardBodyContainer.append(currentTableElement);

  const updateLeaderboardUI = () => {
    const freshData = getLeaderboard();
    const newTableElement = createLeaderboardTable(freshData);
    currentTableElement.replaceWith(newTableElement);
    currentTableElement = newTableElement;
  };

  const handleWin = (movesCount) => {
    saveGameResult(movesCount);

    const movesCountElement = winModal.querySelector('.win__count-moves');
    if (movesCountElement) {
      movesCountElement.textContent = movesCount;
    }

    updateLeaderboardUI();
    openModal(winModal);

    playWinSound();
  };

  const handleGameEnd = () => {
    backgroundCanvas.boostSpeed();
  };

  const { element: boardElement, resetBoard } = createBoard({
    onWin: handleWin,
    onGameEnd: handleGameEnd,
  });

  const handleNewGame = () => {
    stopWinSound();
    backgroundCanvas.resetSpeed();
    resetBoard();
  };

  const header = createHeader({
    onNewGame: () => {
      handleNewGame();
    },
    onOpenLeaderboard: () => {
      updateLeaderboardUI();
      openModal(leaderBoardModal);
    },
  });

  // Button New Game inside win modal
  const btnWinNewGame = createButton({
    text: 'New Game',
    id: 'btn-win-new-game',
    attributes: {
      'aria-label': 'Start a new game',
    },
  });

  // Button Close inside win modal
  const btnCloseWinModal = createButton({
    text: 'Close',
    id: 'btn-close-win',
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
    actionsContent: [btnWinNewGame, btnCloseWinModal],
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Win!',
    },
  });

  // Close Win Modal
  btnCloseWinModal.addEventListener('click', () => {
    closeModal(winModal);
  });

  // Restart from Win Modal
  btnWinNewGame.addEventListener('click', () => {
    stopWinSound();
    closeModal(winModal);
    handleNewGame();
  });

  const btnCloseLeaderBoardModal = createButton({
    text: 'Close',
    id: 'btn-close-leaderBoard-modal',
    classNames: ['btn--close'],
    attributes: {
      'aria-label': 'Close',
    },
  });

  btnCloseLeaderBoardModal.addEventListener('click', () => {
    closeModal(leaderBoardModal);
  });

  const leaderBoardModal = createModal({
    text: 'Leaderboard',
    bodyContent: leaderboardBodyContainer,
    actionsContent: [btnCloseLeaderBoardModal],
    attributesModal: {
      'aria-hidden': 'true',
    },
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Leaderboard',
    },
  });

  app.append(header, boardElement, winModal, leaderBoardModal);

  return app;
};
