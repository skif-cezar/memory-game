export const createCard = ({
  id,
  type = 'button',
  classNames = ['card'],
  attributes = {},
  value = '',
} = {}) => {
  const card = document.createElement('button');
  card.type = type;

  if (id) {
    card.id = id;
  }

  card.classList.add(...classNames);

  if (value) {
    card.dataset.value = value;
  }

  Object.entries(attributes).forEach(([key, val]) => {
    card.setAttribute(key, val);
  });

  const inner = document.createElement('span');
  inner.classList.add('card__inner');

  const back = document.createElement('span');
  back.classList.add('card__face', 'card__face--back');
  back.setAttribute('aria-hidden', 'false');

  const front = document.createElement('span');
  front.classList.add('card__face', 'card__face--front');
  front.setAttribute('aria-hidden', 'true');

  inner.append(back, front);
  card.append(inner);

  return card;
};
