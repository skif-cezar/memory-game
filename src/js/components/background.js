export const createBackground = () => {
  const canvas = document.createElement('canvas');
  canvas.classList.add('bg-canvas');
  const ctx = canvas.getContext('2d');

  // Параметры сцены
  const STARS_COUNT = 3000;
  const SPEED = 1.3;

  // Палитра цветов (в формате RGBA строк для канваса)
  const COLORS = ['#ffffff', '#e0f7fa', '#fffde7', '#bbdefb'];

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let animationFrameId = null;

  // [x, y, z, prevZ] для каждой звезды
  const starData = new Float32Array(STARS_COUNT * 4);
  // [colorIndex] для каждой звезды
  const starColors = new Uint8Array(STARS_COUNT);

  // Сброс / инициализация одной звезды
  function resetStar(index, isInitial = false) {
    const offset = index * 4;

    starData[offset] = (Math.random() - 0.5) * width * 2; // x
    starData[offset + 1] = (Math.random() - 0.5) * height * 2; // y

    // Если это первая инициализация, распределяем z случайно, иначе спавним на максимальной глубине
    const z = isInitial ? Math.random() * width : width;
    starData[offset + 2] = z; // z
    starData[offset + 3] = z; // prevZ

    if (isInitial) {
      starColors[index] = Math.floor(Math.random() * COLORS.length);
    }
  }

  // Изменение размеров холста
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
  }

  // Обновление состояния звезды
  function updateStar(index) {
    const offset = index * 4;

    // prevZ = z
    starData[offset + 3] = starData[offset + 2];
    // z -= SPEED
    starData[offset + 2] -= SPEED;

    // Если звезда за пределами экрана (глубины), пересоздаем её
    if (starData[offset + 2] <= 0) {
      resetStar(index, false);
    }
  }

  // Отрисовка звезды
  function drawStar(index) {
    const offset = index * 4;
    const x = starData[offset];
    const y = starData[offset + 1];
    const z = starData[offset + 2];
    const prevZ = starData[offset + 3];

    // Проекция 3D в 2D (перспектива)
    const sx = (x / z) * width + cx;
    const sy = (y / z) * height + cy;

    // Проверка выхода за границы экрана
    if (sx < 0 || sx > width || sy < 0 || sy > height) return;

    // Прошлая позиция для шлейфа
    const px = (x / prevZ) * width + cx;
    const py = (y / prevZ) * height + cy;

    // Размер звезды
    const radius = Math.max(0.1, (1 - z / width) * 2.5);

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = COLORS[starColors[index]];
    ctx.lineWidth = radius;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Инициализация звездного поля
  function init() {
    resizeCanvas();
    for (let i = 0; i < STARS_COUNT; i++) {
      resetStar(i, true);
    }
  }

  // Главный цикл анимации
  function animate() {
    // Полупрозрачная заливка для создания эффекта размытия / шлейфов
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < STARS_COUNT; i++) {
      updateStar(i);
      drawStar(i);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Обработчик изменения размера окна
  function handleResize() {
    resizeCanvas();
  }

  // Слушатели событий
  window.addEventListener('resize', handleResize);

  // Старт
  init();
  animate();

  return canvas;
};
