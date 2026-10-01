export const createButton = ({ text, id, type = 'button', classNames = ['btn'], attributes = {} }) => {
  const button = document.createElement('button');
  button.type = type;
  button.id = id;
  button.classList.add(...classNames);
  button.textContent = text;

  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });

  return button;
};
