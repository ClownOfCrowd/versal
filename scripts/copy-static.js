const fs = require('fs-extra');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const outDir = path.join(process.cwd(), 'out');
const nextDir = path.join(process.cwd(), '.next');

async function copyStaticFiles() {
  try {
    // Убедимся, что папки существуют
    await fs.ensureDir(outDir);
    await fs.ensureDir(path.join(outDir, 'static'));
    await fs.ensureDir(path.join(outDir, 'images'));
    
    // Копируем все файлы из public в out
    await fs.copy(publicDir, outDir, {
      overwrite: true,
      filter: (src) => {
        // Исключаем системные файлы
        return !src.includes('.DS_Store') && !src.includes('Thumbs.db');
      }
    });

    // Копируем статические файлы из .next, если они есть
    if (await fs.pathExists(path.join(nextDir, 'static'))) {
      await fs.copy(
        path.join(nextDir, 'static'),
        path.join(outDir, 'static'),
        { overwrite: true }
      );
    }

    // Создаем файл _redirects для Netlify
    await fs.writeFile(
      path.join(outDir, '_redirects'),
      `/*    /index.html   200\n`
    );

    console.log('✅ Статические файлы успешно скопированы');
  } catch (error) {
    console.error('❌ Ошибка при копировании файлов:', error);
    process.exit(1);
  }
}

copyStaticFiles(); 