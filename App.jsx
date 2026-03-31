import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import { useCMS } from './src/context/CMSContext'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const { data, loading, error } = useCMS()

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

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
  }, [loading])

  if (loading) {
    return (
      <div className="loader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0a', color: '#c8a96e', fontFamily: 'serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ letterSpacing: '0.4em', fontSize: '1rem', textTransform: 'uppercase' }}>ACE DESIGN STUDIOS</h1>
          <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.7rem', letterSpacing: '0.2em' }}>SECURE CLOUD SYNC...</p>
        </div>
      </div>
    )
  }

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
