import winSound from '/sounds/march.mp3';

const winAudio = new Audio(winSound);

export const playWinSound = () => {
  winAudio.currentTime = 0;
  winAudio.play().catch((error) => {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      console.warn('Unable to play audio:', error);
    }
  });
};

export const stopWinSound = () => {
  winAudio.pause();
  winAudio.currentTime = 0;
};
