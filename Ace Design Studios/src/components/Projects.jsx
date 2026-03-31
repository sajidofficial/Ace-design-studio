import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    name: 'The Mineral House',
    location: 'Kyoto, Japan',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85&auto=format&fit=crop',
    alt: 'Minimalist concrete house in Kyoto with geometric windows',
  },
  {
    id: '02',
    name: 'Pavilion of Light',
    location: 'Oslo, Norway',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&auto=format&fit=crop',
    alt: 'Glass pavilion with dramatic lighting at dusk in Norway',
  },
  {
    id: '03',
    name: 'Silence Residence',
    location: 'São Paulo, Brazil',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85&auto=format&fit=crop',
    alt: 'Luxury modernist residence with pool in São Paulo',
  },
  {
    id: '04',
    name: 'Torre Negra',
    location: 'Mexico City, Mexico',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=900&q=85&auto=format&fit=crop',
    alt: 'Dark angular tower building in Mexico City skyline',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header fade
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )

      // Cards stagger
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: { amount: 0.55, ease: 'power1.out' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section className="projects" id="projects" ref={sectionRef} aria-label="Projects">
      <div className="section-header" ref={headerRef}>
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">
            Projects &<br />
            Buildings
          </h2>
        </div>
        <span className="section-count">04 Projects</span>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <article
            key={project.id}
            className="project-card"
            ref={addToRefs}
            aria-label={`Project: ${project.name}`}
            id={`project-card-${project.id}`}
          >
            <img
              className="project-card-img"
              src={project.image}
              alt={project.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="project-overlay" aria-hidden="true" />

            <div className="project-info">
              <p className="project-number">{project.id}</p>
              <h3 className="project-name">{project.name}</h3>
              <div className="project-meta">
                <span className="project-location">{project.location}</span>
                <span className="project-year">{project.year}</span>
              </div>
            </div>

            <div className="project-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
