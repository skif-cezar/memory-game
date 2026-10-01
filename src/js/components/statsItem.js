export const createStatsItem = ({ textLabel, textValue }) => {
  const statsItem = document.createElement('div');
  statsItem.classList.add('stats__item');

  const statsLabel = document.createElement('span');
  statsLabel.classList.add('stats__label');
  statsLabel.textContent = textLabel;

  const statsValue = document.createElement('span');
  statsValue.classList.add('stats__value');
  statsValue.textContent = textValue;

  statsItem.append(statsLabel, statsValue);

  return statsItem;
};
