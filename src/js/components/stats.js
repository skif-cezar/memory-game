import { createStatsItem } from './statsItem';

export const createStats = () => {
  const stats = document.createElement('section');
  stats.classList.add('stats');

  const movesItem = createStatsItem({
    textLabel: 'Moves',
    textValue: '0',
  });

  const pairsFoundItem = createStatsItem({
    textLabel: 'Pairs found',
    textValue: '0/8',
  });

  const movesValueEl = movesItem.querySelector('.stats__value');
  const pairsValueEl = pairsFoundItem.querySelector('.stats__value');

  stats.append(movesItem, pairsFoundItem);

  return {
    element: stats,
    updateMoves: (moves) => {
      if (movesValueEl) movesValueEl.textContent = moves;
    },
    updatePairs: (pairs, total = 8) => {
      if (pairsValueEl) pairsValueEl.textContent = `${pairs}/${total}`;
    },
    resetStats: () => {
      if (movesValueEl) movesValueEl.textContent = '0';
      if (pairsValueEl) pairsValueEl.textContent = '0/8';
    },
  };
};
