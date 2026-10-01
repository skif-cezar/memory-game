import { createHeader } from './header';
import { createBoard } from './board';

export const createApp = () => {
  const app = document.createElement('div');
  app.classList.add('app');
  
  const header = createHeader();
  const board = createBoard();


  app.append(header);
  app.append(board);

  return app;
};
