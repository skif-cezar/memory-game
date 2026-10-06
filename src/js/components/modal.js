import { closeModal } from '../utils/modalManager.js';

export const createModal = ({
  text = '',
  classNames = ['modal'],
  bodyContent = null,
  actionsContent = [],
  attributesDialog = {},
  attributesModal = {},
} = {}) => {
  const modal = document.createElement('div');
  modal.classList.add(...classNames);

  modal.inert = true;
  modal.setAttribute('aria-hidden', 'true');

  Object.entries(attributesModal).forEach(([key, value]) => {
    modal.setAttribute(key, value);
  });

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal__dialog');
  modalDialog.setAttribute('role', 'dialog');
  modalDialog.setAttribute('tabindex', '-1');

  Object.entries(attributesDialog).forEach(([key, value]) => {
    modalDialog.setAttribute(key, value);
  });

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = text;

  const body = document.createElement('div');
  body.classList.add('modal__body');

  const actions = document.createElement('div');
  actions.classList.add('modal__actions');

  if (bodyContent) {
    if (Array.isArray(bodyContent)) {
      body.append(...bodyContent);
    } else {
      body.append(bodyContent);
    }
  }

  if (actionsContent) {
    if (Array.isArray(actionsContent)) {
      actions.append(...actionsContent);
    } else {
      actions.append(actionsContent);
    }
  }

  modalDialog.append(title, body, actions);
  modal.append(modalDialog);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  return modal;
};
