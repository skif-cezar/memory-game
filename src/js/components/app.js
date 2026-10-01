import { createHeader } from './header';

export const createApp = () => {
  const app = document.createElement('div');
  app.classList.add('app');
  
  const header = createHeader();


  app.append(header);

  return app;
};
