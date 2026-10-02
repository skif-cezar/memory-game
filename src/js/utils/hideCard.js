/**
 * Hide card face
 */
export const hideCard = (cardElement, cardType) => {
  const frontFace = cardElement.querySelector('.card__face--front');

  if (frontFace && cardType) {
    frontFace.classList.remove(`card__face--${cardType}`);
    cardElement.setAttribute('aria-label', 'Card star wars');
  }
  cardElement.setAttribute('aria-pressed', 'false');
};
