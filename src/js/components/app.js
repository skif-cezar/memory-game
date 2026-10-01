import { createHeader } from './header';
import { createBoard } from './board';
import { createModal } from './modal';
import { createButton } from './button';
import { createWinBody } from './winBody';

export const createApp = () => {
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
  const btnClose = createButton({
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
    actionsContent: [btnNewGame, btnClose],
    attributesDialog: {
      'aria-modal': 'true',
      'aria-label': 'Win!',
    },
  });
  const leaderBoardModal = createModal({
    text: 'Leaderboard',
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
