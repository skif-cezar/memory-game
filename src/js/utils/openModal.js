/**
 * Show modal
 */
export const openModal = (modalElement) => {
  modalElement.removeAttribute('inert');
  modalElement.setAttribute('aria-hidden', 'false');
  modalElement.classList.add('modal--open');
};
