export const createModal = ({ text, classNames = ['modal'], attributesDialog = {}, attributesModal = {} }) => {
  const modal = document.createElement('div');
  modal.classList.add(...classNames);

  Object.entries(attributesModal).forEach(([key, value]) => {
    modal.setAttribute(key, value);
  });

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal__dialog');
  modalDialog.setAttribute('role', 'dialog');

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

  /*if (bodyContent) {
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
  }*/

  modalDialog.append(title, body, actions);
  modal.append(modalDialog);

  return modal;
};
