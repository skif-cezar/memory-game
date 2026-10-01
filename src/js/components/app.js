import { createHeader } from './header';
import { createBoard } from './board';
import { createModal } from './modal';
import { createButton } from './button';
import { createWinBody } from './winBody';
import { createLeaderboardTable } from './leaderboardTable.js';

export const createApp = () => {
  // Пример данных таблицы
  const leaderboardData = [
    { place: 1, progress: 13, date: '30.09.2026' },
    { place: 2, progress: 16, date: '01.10.2026' },
    { place: 3, progress: 21, date: '01.10.2026' },
  ];

  const app = document.createElement('div');
  app.classList.add('app');

  const header = createHeader();
  const board = createBoard();
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
  const btnCloseLeaderBoardModal = createButton({
    text: 'Close',
    id: 'btn-close',
    classNames: ['btn--close'],
    attributes: {
      'aria-label': 'Close',
    },
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

  app.append(header);
  app.append(board);
  app.append(winModal);
  app.append(leaderBoardModal);

  return app;
};
