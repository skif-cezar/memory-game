import { createStatsItem } from './statsItem';

export const createStats = () => {
  const stats = document.createElement('section');
  stats.classList.add('stats');

  const progressItem = createStatsItem({
    textLabel: 'Progress',
    textValue: '2',
  });

  const pairsFoundItem = createStatsItem({
    textLabel: 'Pairs found',
    textValue: '0',
  });

  stats.append(progressItem, pairsFoundItem);

  return stats;
};
