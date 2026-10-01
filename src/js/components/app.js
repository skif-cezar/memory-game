import { createHeader } from './header';
import { createBoard } from './board';
import { createModal } from './modal';

export const createApp = () => {
  const app = document.createElement('div');
  app.classList.add('app');

  const header = createHeader();
  const board = createBoard();
  const winModal = createModal({
    text: 'Win!',
    attributesModal: {
      'aria-hidden': 'true',
    },
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
