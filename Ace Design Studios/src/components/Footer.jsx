const FOOTER_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo" id="contact">
      <div className="footer-logo">FORMA</div>

      <p className="footer-copy">
        &copy; {year} FORMA Architecture Studio. All rights reserved.
      </p>

      <ul className="footer-links">
        {FOOTER_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              id={`footer-link-${link.label.toLowerCase()}`}
              aria-label={`Visit our ${link.label} profile`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
