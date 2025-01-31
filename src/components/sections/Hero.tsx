'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (titleRef.current && buttonRef.current) {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })

      gsap.from(buttonRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power4.out',
      })

      ScrollTrigger.create({
        trigger: buttonRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (buttonRef.current) {
            buttonRef.current.style.transform = `translateY(${self.progress * 50}px)`
          }
        },
      })
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Видео фон */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Оверлей */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Контент */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 
          ref={titleRef}
          className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-8"
        >
          Изысканная кухня<br />
          <span className="text-accent">в атмосфере роскоши</span>
        </h1>
        
        <button
          ref={buttonRef}
          className="btn-accent gold-glow text-lg md:text-xl"
        >
          Открыть меню
        </button>
      </div>
    </section>
  )
} 