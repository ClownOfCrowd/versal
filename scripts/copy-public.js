const fs = require('fs-extra');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const outDir = path.join(process.cwd(), 'out');

async function copyPublicFiles() {
  try {
    // Убедимся, что папка out существует
    await fs.ensureDir(outDir);

    // Копируем все файлы из public в out
    await fs.copy(publicDir, outDir, {
      overwrite: true,
      errorOnExist: false
    });

    console.log('✅ Статические файлы успешно скопированы');
  } catch (error) {
    console.error('❌ Ошибка при копировании файлов:', error);
    process.exit(1);
  }
}

copyPublicFiles(); 