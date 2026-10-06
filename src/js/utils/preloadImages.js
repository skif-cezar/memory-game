const imagesToPreload = [
  '/assets/c-3po-48.png',
  '/assets/card-back-bg.png',
  '/assets/chewbacca-48.png',
  '/assets/darth-vader-48.png',
  '/assets/death-star-48.png',
  '/assets/lightsaber-48.png',
  '/assets/r2-d2-48.png',
  '/assets/stormtrooper-48.png',
  '/assets/yoda-48.png',
  '/assets/yoda.png',
];

export const preloadImages = () => {
  const promises = imagesToPreload.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  return Promise.all(promises);
};
