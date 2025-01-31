'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

interface BookingData {
  date: Date | null
  time: string | null
  guests: number
  name: string
  phone: string
  email: string
  specialRequests: string
}

const timeSlots: TimeSlot[] = [
  { id: 1, time: '12:00', available: true },
  { id: 2, time: '13:00', available: false },
  { id: 3, time: '14:00', available: true },
  { id: 4, time: '18:00', available: true },
  { id: 5, time: '19:00', available: true },
  { id: 6, time: '20:00', available: false },
  { id: 7, time: '21:00', available: true },
]

export default function Booking() {
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    time: null,
    guests: 2,
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Здесь будет интеграция с API бронирования
      await new Promise(resolve => setTimeout(resolve, 1500)) // Имитация запроса
      alert('Бронирование успешно отправлено!')
      setBookingData({
        date: null,
        time: null,
        guests: 2,
        name: '',
        phone: '',
        email: '',
        specialRequests: ''
      })
      setCurrentStep(1)
    } catch (error) {
      alert('Произошла ошибка при бронировании')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-b from-primary to-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Забронировать стол
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${currentStep >= step ? 'text-accent' : 'text-gray-500'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep >= step ? 'border-accent' : 'border-gray-500'}`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-full h-0.5 mx-2 
                    ${currentStep > step ? 'bg-accent' : 'bg-gray-500'}`}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Дата</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent"
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Время</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        className={`p-2 rounded-lg text-center ${
                          slot.available
                            ? bookingData.time === slot.time
                              ? 'bg-accent text-dark'
                              : 'bg-white/10 hover:bg-white/20'
                            : 'bg-gray-500/50 cursor-not-allowed'
                        }`}
                        onClick={() => slot.available && setBookingData(prev => ({ ...prev, time: slot.time }))}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Количество гостей</label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    max="12"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Особые пожелания</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-accent h-32"
                  />
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-playfair text-lg mb-4">Подтверждение бронирования</h4>
                  <div className="space-y-2 text-sm">
                    <p>Дата: {bookingData.date?.toString()}</p>
                    <p>Время: {bookingData.time}</p>
                    <p>Гости: {bookingData.guests}</p>
                    <p>Имя: {bookingData.name}</p>
                    <p>Телефон: {bookingData.phone}</p>
                    <p>Email: {bookingData.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="btn-primary"
                >
                  Назад
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="btn-accent ml-auto"
                >
                  Далее
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-accent ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Забронировать'}
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
} 