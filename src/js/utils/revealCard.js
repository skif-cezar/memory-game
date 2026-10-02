/**
 * Show card face
 */
export const revealCard = (cardElement, cardType) => {
  const frontFace = cardElement.querySelector('.card__face--front');

  if (frontFace && cardType) {
    frontFace.classList.add(`card__face--${cardType}`);
    cardElement.setAttribute('aria-label', `Card ${cardType}`);
  }
  cardElement.setAttribute('aria-pressed', 'true');
};
