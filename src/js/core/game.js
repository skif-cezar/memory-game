import { shuffle } from '../utils/shuffle';
import { revealCard } from '../utils/revealCard';
import { hideCard } from '../utils/hideCard';

const CARD_TYPES = ['c3po', 'chewbacca', 'vader', 'death-star', 'lightsaber', 'r2d2', 'stormtrooper', 'yoda'];

export const createGame = ({ onWin, onStatsUpdate } = {}) => {
  let moves = 0;
  let matchedPairs = 0;
  let flippedCards = [];
  let isBoardLocked = false;

  const cardsMap = new Map();

  const notifyStats = () => {
    if (typeof onStatsUpdate === 'function') {
      onStatsUpdate({ moves, matchedPairs });
    }
  };

  const generateCardsData = () => {
    cardsMap.clear();
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    isBoardLocked = false;

    notifyStats();

    const pairs = [...CARD_TYPES, ...CARD_TYPES];
    const shuffled = shuffle(pairs);

    return shuffled.map((type, index) => {
      const id = `card-${index}`;
      cardsMap.set(id, type);

      return {
        id,
        attributes: {
          'aria-label': 'Card star wars',
          'aria-pressed': 'false',
        },
      };
    });
  };

  const handleCardClick = (cardElement) => {
    if (isBoardLocked || cardElement.getAttribute('aria-pressed') === 'true' || cardElement.disabled) {
      return;
    }

    // Open card in DOM onclick
    const cardId = cardElement.id;
    const cardType = cardsMap.get(cardId);

    revealCard(cardElement, cardType);
    flippedCards.push(cardElement);

    // If 2 cards are turned over, we check
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      moves += 1;

      // Hide types from Map
      const firstType = cardsMap.get(firstCard.id);
      const secondType = cardsMap.get(secondCard.id);
      const isMatch = firstType === secondType;

      if (isMatch) {
        // Coincidence
        firstCard.disabled = true;
        secondCard.disabled = true;
        flippedCards = [];
        matchedPairs += 1;

        notifyStats();

        if (matchedPairs === CARD_TYPES.length) {
          setTimeout(() => {
            if (typeof onWin === 'function') {
              onWin(moves);
            }
          }, 700);
        }
      } else {
        notifyStats();

        // No match — we lock the board and flip them back over after 1 second.
        isBoardLocked = true;

        setTimeout(() => {
          hideCard(firstCard, firstType);
          hideCard(secondCard, secondType);
          flippedCards = [];
          isBoardLocked = false;
        }, 1000);
      }
    }
  };

  return {
    generateCardsData,
    handleCardClick,
    resetGame: generateCardsData,
  };
};
