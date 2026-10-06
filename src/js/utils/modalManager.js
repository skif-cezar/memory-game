let activeModalsStack = [];

const toggleBodyScroll = (disable) => {
  if (disable) {
    document.body.style.overflow = 'hidden';
  } else if (activeModalsStack.length === 0) {
    document.body.style.overflow = '';
  }
};

const handleGlobalKeyDown = (event) => {
  if (event.key === 'Escape' && activeModalsStack.length > 0) {
    // Закрываем верхнюю активную модалку
    const topModal = activeModalsStack[activeModalsStack.length - 1];
    closeModal(topModal);
  }
};

/**
 * Show modal
 */
export const openModal = (modalElement) => {
  if (!modalElement || modalElement.classList.contains('modal--open')) return;

  modalElement._previouslyFocusedElement = document.activeElement;

  modalElement.inert = false;
  modalElement.setAttribute('aria-hidden', 'false');
  modalElement.classList.add('modal--open');

  activeModalsStack.push(modalElement);
  toggleBodyScroll(true);

  const focusableElement = modalElement.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElement) {
    focusableElement.focus();
  } else {
    const dialog = modalElement.querySelector('.modal__dialog');
    dialog?.focus();
  }

  if (activeModalsStack.length === 1) {
    document.addEventListener('keydown', handleGlobalKeyDown);
  }
};

/**
 * Hide modal
 */
export const closeModal = (modalElement) => {
  if (!modalElement || !modalElement.classList.contains('modal--open')) return;

  modalElement.inert = true;
  modalElement.setAttribute('aria-hidden', 'true');
  modalElement.classList.remove('modal--open');

  activeModalsStack = activeModalsStack.filter((m) => m !== modalElement);
  toggleBodyScroll(false);

  if (modalElement._previouslyFocusedElement && typeof modalElement._previouslyFocusedElement.focus === 'function') {
    modalElement._previouslyFocusedElement.focus();
    modalElement._previouslyFocusedElement = null;
  }

  if (activeModalsStack.length === 0) {
    document.removeEventListener('keydown', handleGlobalKeyDown);
  }
};
