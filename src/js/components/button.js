export const createButton = ({ text, id, type = 'button', classNames = [], attributes = {} }) => {
  const button = document.createElement('button');
  button.type = type;
  button.classList.add('btn', ...classNames);
  button.textContent = text;

  if (id) {
    button.id = id;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });

  return button;
};
