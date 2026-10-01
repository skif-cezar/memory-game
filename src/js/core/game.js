import { shuffle } from '../utils/shuffle';

const CARD_TYPES = ['c3po', 'chewbacca', 'vader', 'death-star', 'lightsaber', 'r2d2', 'stormtrooper', 'yoda'];

export const createGame = () => {
  let flippedCards = [];
  let matchedPairs = 0;
  let isBoardLocked = false;

  const cardsMap = new Map();

  const generateCardsData = () => {
    cardsMap.clear();
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

  // Show card face
  const revealCard = (cardElement) => {
    const cardId = cardElement.id;
    const cardType = cardsMap.get(cardId);
    const frontFace = cardElement.querySelector('.card__face--front');

    if (frontFace && cardType) {
      frontFace.classList.add(`card__face--${cardType}`);
      cardElement.setAttribute('aria-label', `Карточка ${cardType}`);
    }
    cardElement.setAttribute('aria-pressed', 'true');
  };

  // Hide card face
  const hideCard = (cardElement) => {
    const cardId = cardElement.id;
    const cardType = cardsMap.get(cardId);
    const frontFace = cardElement.querySelector('.card__face--front');

    if (frontFace && cardType) {
      frontFace.classList.remove(`card__face--${cardType}`);
      cardElement.setAttribute('aria-label', 'Скрытая карточка');
    }
    cardElement.setAttribute('aria-pressed', 'false');
  };

  const handleCardClick = (cardElement) => {
    if (isBoardLocked || cardElement.getAttribute('aria-pressed') === 'true' || cardElement.disabled) {
      return;
    }

    // Open card in DOM onclick
    revealCard(cardElement);
    flippedCards.push(cardElement);

    // If 2 cards are turned over, we check
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

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

        if (matchedPairs === CARD_TYPES.length) {
          setTimeout(() => alert('логика показа модалки'), 700);
        }
      } else {
        // No match — we lock the board and flip them back over after 1 second.
        isBoardLocked = true;

        setTimeout(() => {
          hideCard(firstCard);
          hideCard(secondCard);
          flippedCards = [];
          isBoardLocked = false;
        }, 1000);
      }
    }
  };

  return {
    generateCardsData,
    handleCardClick,
  };
};
