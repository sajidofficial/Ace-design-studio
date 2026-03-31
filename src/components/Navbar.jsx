import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Practice', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.4,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav className="navbar" ref={navRef} role="navigation" aria-label="Main navigation">
      <a href="#" className="navbar-logo" aria-label="FORMA home">
        FOR<span>M</span>A
      </a>

      <ul className="navbar-nav">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} id={`nav-${link.label.toLowerCase()}`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="navbar-cta" id="nav-cta">
        Get in Touch
      </a>
    </nav>
  )
}
