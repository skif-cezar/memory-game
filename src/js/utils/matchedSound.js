import matchedSound from '/sounds/matched.mp3';

const matchedAudio = new Audio(matchedSound);

export const playMatchedSound = () => {
  matchedAudio.currentTime = 0;
  matchedAudio.play().catch((error) => {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      console.warn('Unable to play audio:', error);
    }
  });
};

export const stopMatchedSound = () => {
  matchedAudio.pause();
  matchedAudio.currentTime = 0;
};