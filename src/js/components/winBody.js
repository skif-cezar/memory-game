export const createWinBody = () => {
  const win = document.createElement('div');
  win.classList.add('win');

  const image = document.createElement('div');
  image.classList.add('win__image');

  const message = document.createElement('p');
  message.classList.add('win__message');
  message.textContent = 'Matched, all pairs are. May the Force be with you!';

  const moves = document.createElement('p');
  moves.classList.add('win__moves');
  moves.textContent = 'Progress: ';

  const countProgress = document.createElement('span');
  countProgress.classList.add('win__count-progress');
  countProgress.textContent = '20';

  moves.append(countProgress);
  win.append(image, message, moves);

  return win;
};
