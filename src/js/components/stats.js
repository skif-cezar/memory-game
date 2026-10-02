import { createStatsItem } from './statsItem';

export const createStats = () => {
  const stats = document.createElement('section');
  stats.classList.add('stats');

  const movesItem = createStatsItem({
    textLabel: 'Moves',
    textValue: '2',
  });

  const pairsFoundItem = createStatsItem({
    textLabel: 'Pairs found',
    textValue: '0',
  });

  stats.append(movesItem, pairsFoundItem);

  return stats;
};
