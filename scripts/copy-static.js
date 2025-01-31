const fs = require('fs-extra');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const outDir = path.join(process.cwd(), 'out');
const nextDir = path.join(process.cwd(), '.next');

async function copyStaticFiles() {
  try {
    // Убедимся, что папки существуют
    await fs.ensureDir(outDir);
    
    // Копируем файлы из public в out
    await fs.copy(publicDir, outDir, {
      overwrite: true,
      filter: (src) => {
        // Исключаем системные файлы
        return !src.includes('.DS_Store') && !src.includes('Thumbs.db');
      }
    });

    // Копируем статические файлы из .next в out
    if (await fs.pathExists(path.join(nextDir, 'static'))) {
      await fs.copy(
        path.join(nextDir, 'static'),
        path.join(outDir, '_next', 'static'),
        { overwrite: true }
      );
    }

    console.log('✅ Статические файлы успешно скопированы');
  } catch (error) {
    console.error('❌ Ошибка при копировании файлов:', error);
    process.exit(1);
  }
}

copyStaticFiles(); 