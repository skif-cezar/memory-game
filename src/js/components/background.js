export const createBackground = () => {
  const canvas = document.createElement('canvas');
  canvas.classList.add('bg-canvas');
  const ctx = canvas.getContext('2d');

  // Параметры сцены
  const STARS_COUNT = 3000;
  const BASE_SPEED = 1.3;
  const MAX_SPEED = 25.0; // Максимальная скорость при ускорении

  let currentSpeed = BASE_SPEED;
  let targetSpeed = BASE_SPEED;
  const ACCELERATION_FACTOR = 0.03; // Скорость нарастания (чем больше, тем быстрее разгон)

  // Палитра цветов
  const COLORS = ['#ffffff', '#e0f7fa', '#fffde7', '#bbdefb'];

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let animationFrameId = null;

  const starData = new Float32Array(STARS_COUNT * 4);
  const starColors = new Uint8Array(STARS_COUNT);

  function resetStar(index, isInitial = false) {
    const offset = index * 4;

    starData[offset] = (Math.random() - 0.5) * width * 2;
    starData[offset + 1] = (Math.random() - 0.5) * height * 2;

    const z = isInitial ? Math.random() * width : width;
    starData[offset + 2] = z;
    starData[offset + 3] = z;

    if (isInitial) {
      starColors[index] = Math.floor(Math.random() * COLORS.length);
    }
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
  }

  function updateStar(index) {
    const offset = index * 4;

    starData[offset + 3] = starData[offset + 2];

    // Используем текущую динамическую скорость
    starData[offset + 2] -= currentSpeed;

    if (starData[offset + 2] <= 0) {
      resetStar(index, false);
    }
  }

  function drawStar(index) {
    const offset = index * 4;
    const x = starData[offset];
    const y = starData[offset + 1];
    const z = starData[offset + 2];
    const prevZ = starData[offset + 3];

    const sx = (x / z) * width + cx;
    const sy = (y / z) * height + cy;

    if (sx < 0 || sx > width || sy < 0 || sy > height) return;

    const px = (x / prevZ) * width + cx;
    const py = (y / prevZ) * height + cy;

    const radius = Math.max(0.1, (1 - z / width) * 2.5);

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = COLORS[starColors[index]];
    ctx.lineWidth = radius;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function init() {
    resizeCanvas();
    for (let i = 0; i < STARS_COUNT; i++) {
      resetStar(i, true);
    }
  }

  function animate() {
    // Плавное приближение currentSpeed к targetSpeed (линейная интерполяция)
    currentSpeed += (targetSpeed - currentSpeed) * ACCELERATION_FACTOR;

    // При высокой скорости делаем хвосты звёзд более выраженными за счет уменьшения прозрачности фона
    const bgAlpha = currentSpeed > 5 ? 0.2 : 0.4;
    ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < STARS_COUNT; i++) {
      updateStar(i);
      drawStar(i);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function handleResize() {
    resizeCanvas();
  }

  window.addEventListener('resize', handleResize);

  init();
  animate();

  // Возвращаем объект с DOM-элементом canvas и методами управления скоростью
  return {
    element: canvas,
    boostSpeed: (speed = MAX_SPEED) => {
      targetSpeed = speed;
    },
    resetSpeed: () => {
      targetSpeed = BASE_SPEED;
    },
  };
};
