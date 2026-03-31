import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90&auto=format&fit=crop'

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      // Hero image: zoom out from slightly enlarged state
      tl.fromTo(
        imgRef.current,
        { scale: 1.18, opacity: 0 },
        { scale: 1.12, opacity: 1, duration: 1.8, ease: 'power2.out' },
        0,
      )

      // Content fade up
      tl.to(
        contentRef.current,
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        0.55,
      )

      // Subtle parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={sectionRef} id="hero" aria-label="Hero">
      <img
        ref={imgRef}
        className="hero-bg"
        src={HERO_IMAGE}
        alt="Architectural space — monumental building interior with geometric lines"
        loading="eager"
        fetchpriority="high"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <p className="hero-eyebrow">Est. 2012 — Worldwide</p>
        <h1 className="hero-title">
          Space<br />
          <em>as</em><br />
          Language
        </h1>
        <p className="hero-subtitle">
          We design buildings that speak — where structure becomes narrative and
          silence becomes form.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary" id="hero-cta-projects">
            View Work
          </a>
          <a href="#about" className="btn-ghost" id="hero-cta-about">
            Our Philosophy
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
