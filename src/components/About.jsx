import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = innerRef.current.children

      gsap.fromTo(
        children,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef} aria-label="About the studio">
      <div className="about-inner" ref={innerRef}>
        <p className="about-eyebrow">Our Practice</p>

        <h2 className="about-title">
          Architecture is an<br />
          <em>act of conviction</em>
        </h2>

        <p className="about-text">
          FORMA is a multidisciplinary architecture studio operating at the intersection
          of form, materiality, and lived experience. We believe that buildings are not
          objects—they are instruments of culture. Founded by a collective of architects
          and spatial thinkers, we work across scales and typologies to create spaces
          that endure.
        </p>

        <a href="#contact" className="btn-primary" id="about-cta" style={{ display: 'inline-block' }}>
          Start a Conversation
        </a>

        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-number">24</div>
            <div className="stat-label">Projects Built</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-label">Awards Won</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">14</div>
            <div className="stat-label">Years of Practice</div>
          </div>
        </div>
      </div>
    </section>
  )
}
