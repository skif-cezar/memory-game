import clickSound from '/sounds/click.mp3';

const clickAudio = new Audio(clickSound);

export const playClickSound = () => {
  clickAudio.currentTime = 0;
  clickAudio.play().catch((error) => {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      console.warn('Unable to play audio:', error);
    }
  });
};

export const stopClickSound = () => {
  clickAudio.pause();
  clickAudio.currentTime = 0;
};