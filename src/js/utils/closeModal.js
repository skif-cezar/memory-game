/**
 * Hide modal
 */
export const closeModal = (modalElement) => {
  if (modalElement.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  modalElement.setAttribute('inert', '');
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.classList.remove('modal--open');
};
