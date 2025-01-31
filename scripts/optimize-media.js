const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(process.cwd(), 'public', 'images');
const outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');

// Создаем директорию для оптимизированных изображений, если её нет
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Функция для оптимизации изображения
async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1920, null, { // максимальная ширина 1920px
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 80 }) // конвертируем в WebP с качеством 80%
      .toFile(outputPath);
    
    console.log(`✅ Оптимизировано: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Ошибка при оптимизации ${path.basename(inputPath)}:`, error);
  }
}

// Рекурсивный обход директории
function processDirectory(directory) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const inputPath = path.join(directory, item);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      processDirectory(inputPath);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const relativePath = path.relative(imageDir, directory);
        const outputSubDir = path.join(outputDir, relativePath);
        
        if (!fs.existsSync(outputSubDir)) {
          fs.mkdirSync(outputSubDir, { recursive: true });
        }

        const outputPath = path.join(
          outputSubDir,
          `${path.basename(item, ext)}.webp`
        );
        
        optimizeImage(inputPath, outputPath);
      }
    }
  });
}

console.log('🚀 Начинаем оптимизацию изображений...');
processDirectory(imageDir); 