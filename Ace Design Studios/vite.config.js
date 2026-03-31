import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
gsap.fromTo('.testimonial-card',
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonials',
      start: 'top 80%'
    }
  }
);