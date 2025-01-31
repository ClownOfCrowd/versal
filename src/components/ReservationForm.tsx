'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

export default function ReservationForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log({ date, time, guests, name, phone, comment });
  };

  const timeSlots = [
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const inputClasses = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:bg-black/30";
  const labelClasses = "block text-gray-200 text-sm font-medium font-lora mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Дата */}
        <div>
          <label className={labelClasses}>
            Дата посещения
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            locale={ru}
            placeholderText="Выберите дату"
            className={inputClasses}
          />
        </div>

        {/* Время */}
        <div>
          <label className={labelClasses}>
            Время
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClasses}
          >
            <option value="" className="bg-gray-900">Выберите время</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} className="bg-gray-900">
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Количество гостей */}
        <div>
          <label className={labelClasses}>
            Количество гостей
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={inputClasses}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num} className="bg-gray-900">
                {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
              </option>
            ))}
          </select>
        </div>

        {/* Имя */}
        <div>
          <label className={labelClasses}>
            Ваше имя
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            className={inputClasses}
          />
        </div>

        {/* Телефон */}
        <div className="md:col-span-2">
          <label className={labelClasses}>
            Номер телефона
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={inputClasses}
          />
        </div>

        {/* Комментарий */}
        <div className="md:col-span-2">
          <label className={labelClasses}>
            Особые пожелания
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Напишите ваши пожелания или предпочтения"
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn-primary px-12 py-4 text-lg font-medium"
        >
          Забронировать столик
        </motion.button>
      </div>
    </form>
  );
} 