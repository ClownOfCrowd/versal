const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const FAVICON_SIZES = [16, 32, 180, 192, 512];
const SOCIAL_SIZES = {
  'og-image': [1200, 630],
  'twitter-card': [800, 418]
};

async function generateFavicons() {
  try {
    // Создаем директорию для социальных изображений
    await fs.ensureDir(path.join(PUBLIC_DIR, 'images', 'social'));

    // Генерируем фавиконки разных размеров
    for (const size of FAVICON_SIZES) {
      const fileName = size === 180 
        ? 'apple-touch-icon.png'
        : size === 192 
          ? 'android-chrome-192x192.png'
          : size === 512
            ? 'android-chrome-512x512.png'
            : `favicon-${size}x${size}.png`;

      await sharp(LOGO_PATH)
        .resize(size, size)
        .toFile(path.join(PUBLIC_DIR, fileName));
      
      console.log(`✅ Создан файл: ${fileName}`);
    }

    // Генерируем изображения для соцсетей
    for (const [name, [width, height]] of Object.entries(SOCIAL_SIZES)) {
      await sharp(LOGO_PATH)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 26, g: 26, b: 26, alpha: 1 }
        })
        .toFile(path.join(PUBLIC_DIR, 'images', 'social', `${name}.jpg`));
      
      console.log(`✅ Создано изображение для соцсетей: ${name}.jpg`);
    }

    console.log('✅ Все изображения успешно сгенерированы');
  } catch (error) {
    console.error('❌ Ошибка при генерации изображений:', error);
    process.exit(1);
  }
}

generateFavicons(); 