'use client';

import { useEffect } from 'react';

export default function A11y() {
  useEffect(() => {
    // Добавляем атрибуты доступности к интерактивным элементам
    const addA11yAttributes = () => {
      // Добавляем роли для кнопок без семантического значения
      document.querySelectorAll('div[role="button"]').forEach(button => {
        if (!button.getAttribute('tabindex')) {
          button.setAttribute('tabindex', '0');
        }
      });

      // Добавляем описания для изображений без alt
      document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', 'Декоративное изображение');
      });

      // Улучшаем доступность модальных окон
      document.querySelectorAll('[role="dialog"]').forEach(dialog => {
        if (!dialog.getAttribute('aria-modal')) {
          dialog.setAttribute('aria-modal', 'true');
        }
      });

      // Добавляем метки для полей ввода
      document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
        const label = input.closest('label');
        if (!label) {
          input.setAttribute('aria-label', input.getAttribute('placeholder') || 'Поле ввода');
        }
      });
    };

    // Запускаем улучшение доступности
    addA11yAttributes();

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(addA11yAttributes);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
} 