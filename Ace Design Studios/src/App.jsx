import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' })
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.09
      followerY += (mouseY - followerY) * 0.09
      gsap.set(follower, { x: followerX, y: followerY })
      requestAnimationFrame(animateFollower)
    }

    window.addEventListener('mousemove', onMouseMove)
    animateFollower()

    // Grow cursor on interactive elements
    const onEnter = () => {
      gsap.to(follower, { scale: 2.2, opacity: 0.7, duration: 0.35 })
      gsap.to(cursor, { scale: 0.4, duration: 0.25 })
    }
    const onLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.35 })
      gsap.to(cursor, { scale: 1, duration: 0.25 })
    }

    const interactives = document.querySelectorAll('a, button, .project-card')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div className="app">
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-follower" ref={followerRef} aria-hidden="true" />

      {/* Film grain noise */}
      <div className="noise" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
