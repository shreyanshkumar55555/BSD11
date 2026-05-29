import { useEffect, useMemo, useState } from 'react'
import Chatbot from './Chatbot.jsx'

const CONTACT = {
  phoneTel: '+919696995588',
  phoneDisplay: '9696995588, 8707614880',
  whatsapp: '+91 9696995588',
  whatsappMessage:
    'Hi, I am interested in BSD Express City. Please share project details and pricing.',
  website: 'https://www.bsdprojects.in/plotsinlko/',
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
}

function openGoogleMapsDirections({ originQuery, destinationQuery }) {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  url.searchParams.set('origin', originQuery)
  url.searchParams.set('destination', destinationQuery)
  url.searchParams.set('travelmode', 'driving')
  window.open(url.toString(), '_blank', 'noopener,noreferrer')
}

export default function App() {
  const [activeSection, setActiveSection] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  const navItems = useMemo(
    () => [
      { id: 'hero', label: 'Home' },
      { id: 'transport', label: 'Transportation' },
      { id: 'why', label: 'Connectivity' },
      { id: 'features', label: 'Amenities' },
      { id: 'pricing', label: 'Plot Sizes' },
      { id: 'invest', label: 'Why Invest' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('visible')
        }
      },
      { threshold: 0.12 },
    )

    for (const el of revealEls) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return undefined

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${nav.offsetHeight}px`,
      )
    }

    syncHeaderHeight()
    const observer = new ResizeObserver(syncHeaderHeight)
    observer.observe(nav)
    window.addEventListener('resize', syncHeaderHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeaderHeight)
    }
  }, [navScrolled])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))

    const onScroll = () => {
      const y = window.scrollY
      setNavScrolled(y > 40)

      let current = ''
      for (const s of sections) {
        if (y >= s.offsetTop - 100) current = s.id
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const onDownloadBrief = async () => {
    const { buildBsdProjectBriefPdf } = await import('./briefPdf.js')
    const doc = buildBsdProjectBriefPdf()
    doc.save('bsd-express-city-brief.pdf')
  }

  const mapsOriginQuery = 'BSD Express City, Lucknow'

  return (
    <>
      <nav className={navScrolled ? 'nav-scrolled' : ''}>
        <div className="container nav-inner">
          <button
            type="button"
            className="nav-logo"
            onClick={() => scrollToId('hero')}
          >
            BSD <span>Express City</span>
          </button>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'nav-active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollToId('contact')}>
            Book Site Visit
          </button>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero__media">
          <img
            className="hero__img"
            
           src="\Screenshot 2026-05-29 170623.png"
            alt="BSD Express City — Lucknow Kanpur growth corridor. The future begins here."
            fetchPriority="high"
          />
          <div className="hero__overlay" aria-hidden="True" />
        </div>
        <div className="hero__content container">
          <div className="hero__actions reveal">
            <a href={`tel:${CONTACT.phoneTel}`} className="hero__chip">
              <span className="hero__chip-icon" aria-hidden="true">
                📞
              </span>
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.website}
              className="hero__chip hero__chip--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.bsdprojects.in
            </a>
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToId('contact')}
            >
              Book Your Site Visit
            </button>
          </div>
        </div>
      </section>

      <section id="welcome" className="welcome-section reveal">
        <div className="container">
          <p className="welcome-eyebrow">Welcome to</p>
          <h2 className="welcome-title">
            BSD <span className="accent">Express City</span>
          </h2>
          <p className="welcome-lead">
            <em>
              A visionary destination with seamless connectivity and limitless
              potential.
            </em>
          </p>
          <div className="welcome-grid">
            <article className="welcome-card">
              <h3>The Future Begins Here</h3>
              <p>
                Located near the most demanding junction of the Lucknow–Kanpur
                growth corridor — from open land to booming possibilities, become
                part of tomorrow&apos;s landmark.
              </p>
            </article>
            <article className="welcome-card">
              <h3>Connectivity = Growth</h3>
              <p>
                Just steps from the Lucknow–Kanpur National Highway and the new
                expressway junction. Better connectivity, zyada buyer demand, aur
                tez land value growth.
              </p>
              <ul className="welcome-checks">
                <li>Better connectivity</li>
                <li>Zyada buyer demand</li>
                <li>Tez land value growth</li>
              </ul>
            </article>
            <article className="welcome-card">
              <h3>Why BSD Express City?</h3>
              <p>
                Prime location on the corridor, unmatched highway access, high
                growth potential, and early-stage pricing — invest before
                development boosts prices.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollToId('contact')}
              >
                Book Site Visit
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="momentum" className="momentum-section reveal">
        <div className="container momentum-inner">
          <h2 className="momentum-title">
            Day By Day — <span className="accent">Every Day</span>
          </h2>
          <p className="momentum-sub">The momentum grows…</p>
          <div className="momentum-stats">
            <div className="momentum-stat">More Meetings</div>
            <div className="momentum-stat">More Site Visits</div>
            <div className="momentum-stat">More Blessings</div>
          </div>
          <p className="momentum-thanks">
            Thanks to everyone for your incredible support in making{' '}
            <strong>BSD Express City</strong> the talk of the town!
          </p>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Prime Plots in Lucknow</span>
          <span>✦</span>
          <span>Lucknow–Kanpur NH</span>
          <span>✦</span>
          <span>10 Min From Airport</span>
          <span>✦</span>
          <span>24/7 Security</span>
          <span>✦</span>
          <span>Wide Roads</span>
          <span>✦</span>
          <span>Commercial Complex</span>
          <span>✦</span>
          <span>Cycle Track</span>
          <span>✦</span>
          <span>Pre-Development Pricing</span>
          <span>✦</span>
          <span>Prime Plots in Lucknow</span>
          <span>✦</span>
          <span>Lucknow–Kanpur NH</span>
          <span>✦</span>
          <span>10 Min From Airport</span>
          <span>✦</span>
          <span>24/7 Security</span>
          <span>✦</span>
          <span>Wide Roads</span>
          <span>✦</span>
          <span>Commercial Complex</span>
          <span>✦</span>
          <span>Cycle Track</span>
          <span>✦</span>
          <span>Pre-Development Pricing</span>
          <span>✦</span>
        </div>
      </div>

      <section id="transport" className="transport-section reveal">
        <div className="container">
          <div className="section-tag">Best Transportation</div>
          <h2 className="section-title">
            From <span className="accent">BSD Express City</span>
          </h2>
          <p className="transport-intro">
            Elevated-road connectivity to key hubs across Lucknow — tap any
            destination for live directions on Google Maps.
          </p>
        </div>
      </section>

      <section id="why" className="reveal">
        <div className="container section-inner">
          <div className="why-left">
            <div className="section-tag">Connectivity</div>
            <h2 className="section-title">
              The <span className="accent">Growth</span> Corridor
              <br />
              you can measure
            </h2>
            <p className="why-desc">
              Positioned around the Lucknow–Kanpur corridor with access to key
              transport hubs. Use the live map links to check distances in real time.
            </p>
            <div className="why-grid reveal-stagger">
              <div className="why-card">
                <div className="why-card-icon">🛣️</div>
                <div className="why-card-title">Direct highway access</div>
                <div className="why-card-text">
                  Easy movement across Lucknow–Kanpur routes for daily commuting and business travel.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🚦</div>
                <div className="why-card-title">Multiple approach roads</div>
                <div className="why-card-text">
                  Diversified entry routes help reduce dependency on a single bottleneck.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🌿</div>
                <div className="why-card-title">Planned township layout</div>
                <div className="why-card-text">
                  Wide roads, green belts, and modern utilities designed for predictable growth.
                </div>
              </div>
              <div className="why-card">
                <div className="why-card-icon">🧾</div>
                <div className="why-card-title">Documentation-led process</div>
                <div className="why-card-text">
                  Share your requirement and we&apos;ll guide you through the next steps clearly.
                </div>
              </div>
            </div>
          </div>

          <div className="why-right reveal">
            <div className="location-visual">
              <div className="lv-heading">Connectivity at a Glance</div>
              <ul className="connect-list">
              {[
                {
                  icon: '🚇',
                  name: 'CCS Airport Metro Station',
                  time: '10 MIN',
                  destinationQuery: 'CCS Airport Metro Station, Lucknow',
                },
                {
                  icon: '✈️',
                  name: 'Amausi International Airport',
                  time: '10 MIN',
                  destinationQuery:
                    'Chaudhary Charan Singh International Airport, Lucknow',
                },
                {
                  icon: '🚌',
                  name: 'Alambagh Bus Stand',
                  time: '15 MIN',
                  destinationQuery: 'Alambagh Bus Stand, Lucknow',
                },
                {
                  icon: '🚂',
                  name: 'Charbagh Railway Station',
                  time: '20 MIN',
                  destinationQuery: 'Charbagh Railway Station, Lucknow',
                },
                {
                  icon: '🏨',
                  name: 'Ramada Star Hotel',
                  time: 'Nearby',
                  destinationQuery: 'Ramada Lucknow, Lucknow',
                },
                {
                  icon: '🎡',
                  name: 'Anandi Magic World',
                  time: 'Nearby',
                  destinationQuery: 'Anandi Magic World, Lucknow',
                },
              ].map((item) => (
                <li
                  key={item.name}
                  role="button"
                  tabIndex={0}
                  title="Open live route in Google Maps"
                  onClick={() =>
                    openGoogleMapsDirections({
                      originQuery: mapsOriginQuery,
                      destinationQuery: item.destinationQuery,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      openGoogleMapsDirections({
                        originQuery: mapsOriginQuery,
                        destinationQuery: item.destinationQuery,
                      })
                  }}
                >
                  <div className="connect-icon">{item.icon}</div>
                  <span className="connect-name">{item.name}</span>
                  <span className="connect-time">{item.time}</span>
                </li>
              ))}
              </ul>
              <p className="connect-note">
                Travel times vary by traffic and route. Click any item to see the live distance on maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="amenities-page">
        <div className="amenities-page-inner reveal">
          <h2 className="amenities-page-title">Features &amp; Amenities</h2>
          <p className="amenities-page-sub">BSD Express City</p>
          <img
            className="amenities-page-img"
            src="/amenities.png"
            alt="BSD Express City features: main entry gate, wide roads, commercial complex, 24x7 security, school, hospital, green areas, and cycle track"
            loading="lazy"
          />
          <div className="amenities-page-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToId('contact')}
            >
              Book Your Site Visit
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => scrollToId('pricing')}
            >
              View Plot Sizes
            </button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="reveal testimonials">
        <div className="testimonials-header">
          <div className="section-tag">Customer Stories</div>
          <h2 className="section-title">
            Happy <span className="accent">customers</span>
            <br />
            real experiences
          </h2>
          <p className="testimonials-sub">
            A quick look at what buyers say about the location, support, and
            overall experience.
          </p>
          <div className="testimonials-actions">
            <button className="btn-primary" onClick={onDownloadBrief}>
              Download Project Brief (PDF)
            </button>
            <button className="btn-outline" onClick={() => scrollToId('contact')}>
              Share Your Requirement
            </button>
          </div>
        </div>

        <div className="testimonials-grid reveal reveal-stagger">
          {[
            {
              name: 'Amit Verma',
              note:
                'Great guidance and transparent process. Location connectivity is the biggest plus.',
              videoId: 'jNQXAC9IVRw',
            },
            {
              name: 'Priya Kapoor',
              note:
                'Clear documentation and a well-planned layout. The team was responsive throughout the booking.',
              videoId: 'tgbNymZ7vqY',
            },
            {
              name: 'Rahul Sharma',
              note:
                'Impressed with the planned layout and amenities. Feeling confident about long-term value.',
              videoId: 'oHg5SJYRHA0',
            },
          ].map((t) => (
            <div key={t.name} className="t-card">
              <div className="t-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                  title={`Testimonial - ${t.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="t-body">
                <div className="t-name">{t.name}</div>
                <div className="t-note">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="reveal">
        <div className="pricing-intro">
          <div className="section-tag">Pricing List</div>
          <h2 className="section-title">
            Choose your <span className="accent">ideal</span>
            <br />
            plot size
          </h2>
          <p className="pricing-body">
            We offer a range of plot sizes to suit every requirement — from
            compact residential plots to expansive land parcels. All with
            flexible payment plans and secure land registry.
          </p>
          <div className="pricing-perks">
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>
                Secure land registry with complete legal ownership rights
              </span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>Flexible payment plans tailored to your budget</span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>
                Early-bird pricing — invest before development boosts prices
              </span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>Best area/sector selections available for early investors</span>
            </div>
          </div>
        </div>
        <div className="pricing-table reveal reveal-stagger">
          <div className="pricing-table-title">Available Plot Configurations</div>

          {[
            { area: '1,200 Sq.Ft', meta: 'Residential · Compact' },
            { area: '1,800 Sq.Ft', meta: 'Residential · Standard' },
            { area: '3,000 Sq.Ft', meta: 'Residential · Premium' },
            { area: 'Above 3,000 Sq.Ft', meta: 'Commercial / Villa · Luxury' },
          ].map((row) => (
            <div
              key={row.area}
              className="price-row"
              onClick={() => scrollToId('contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') scrollToId('contact')
              }}
            >
              <div>
                <div className="price-area">{row.area}</div>
                <div className="price-meta">
                  {row.meta}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="price-tag" style={{ color: 'var(--gold)' }}>
                  Enquire for Price
                </div>
                <div className="price-arrow">→</div>
              </div>
            </div>
          ))}

          <div className="pricing-cta">
            <button className="btn-primary" onClick={() => scrollToId('contact')}>
              Get Exclusive Pricing
            </button>
          </div>
        </div>
      </section>

      <section id="invest" className="reveal">
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          Why Invest Now
        </div>
        <h2 className="invest-title">
          Invest{' '}
          <span
            className="accent"
            style={{ color: 'var(--gold)', fontStyle: 'italic' }}
          >
            before development
          </span>{' '}
          &amp; unlock maximum returns
        </h2>
        <p className="invest-sub">
          Once infrastructure is in place, land prices soar. Secure your plot
          today at pre-development pricing and multiply your profits.
        </p>
        <div className="invest-pillars">
          <div className="pillar">
            <div className="pillar-num">01</div>
            <div className="pillar-title">Low Entry, High Returns</div>
            <div className="pillar-text">
              Pre-development prices are a fraction of post-completion values.
              Why pay a premium later when you can invest early?
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-num">02</div>
            <div className="pillar-title">Limited Inventory</div>
            <div className="pillar-text">
              Investors entering at this stage get early-bird pricing and the
              best area/sector selections for maximum gains.
            </div>
          </div>
          <div className="pillar">
            <div className="pillar-num">03</div>
            <div className="pillar-title">Tangible Asset</div>
            <div className="pillar-text">
              Unlike stocks or mutual funds, land offers a solid, appreciating
              asset with complete legal ownership rights.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56 }}>
          <button className="btn-primary" onClick={() => scrollToId('contact')}>
            Book Site Visit Today
          </button>
        </div>
      </section>

      <section id="contact">
        <div className="contact-left reveal">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-title">
            Start your <span className="accent">journey</span>
            <br />
            with us
          </h2>
          <p className="contact-intro">
            Get exclusive project details, pricing, and early-bird offers
            directly. Our team will help you find the perfect plot for your
            needs.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="c-icon">📍</div>
              <div>
                <div className="c-label">Office Address</div>
                <div className="c-value">
                  104, First Floor, JB Metro Height,
                  <br />
                  Near RTO Office &amp; Transport Nagar Metro, Lucknow
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">📞</div>
              <div>
                <div className="c-label">Call / WhatsApp</div>
                <div className="c-value">
                  <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">✉️</div>
              <div>
                <div className="c-label">Email</div>
                <div className="c-value">
                  info@bsdprojects.in
                  <br />
                  contact@bsdprojects.in
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">🌐</div>
              <div>
                <div className="c-label">Website</div>
                <div className="c-value">
                  <a
                    href={CONTACT.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.bsdprojects.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form reveal">
          <div className="form-title">Book a Site Visit</div>
          <div className="form-sub">
            Fill in your details — we&apos;ll reach out with exclusive pricing
            &amp; offers.
          </div>

          {!submitted ? (
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fname">Full Name</label>
                  <input
                    type="text"
                    id="fname"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fmobile">Mobile Number</label>
                  <input
                    type="tel"
                    id="fmobile"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fage">Age</label>
                  <input
                    type="number"
                    id="fage"
                    placeholder="Your age"
                    min="18"
                    max="99"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fcity">City</label>
                  <input
                    type="text"
                    id="fcity"
                    placeholder="Your city"
                    required
                  />
                </div>
                <div className="form-group full">
                  <label htmlFor="fmsg">Message / Query</label>
                  <textarea
                    id="fmsg"
                    placeholder="Any specific requirements or questions?"
                  />
                </div>
                <div className="form-consent">
                  <input type="checkbox" id="fconsent" required />
                  <label htmlFor="fconsent" className="form-consent-label">
                    I consent to receiving RCS, WhatsApp, Email or SMS from BSD
                    Projects &amp; I have reviewed and agree to Terms &amp;
                    Privacy Policy.
                  </label>
                </div>
                <button type="submit" className="btn-submit">
                  Submit Enquiry
                </button>
              </div>
            </form>
          ) : (
            <div
              id="form-success"
              style={{
                marginTop: 20,
                padding: 20,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              ✓ Thank you! Our team will contact you shortly with exclusive
              pricing and offers.
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          BSD <span>Express City</span>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Terms &amp; Conditions
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} BSD Projects. All rights reserved.
        </div>
      </footer>

      <div className="float-actions" aria-label="Quick contact">
        <a
          href={`tel:${CONTACT.phoneTel}`}
          className="float-action float-action--call"
          aria-label="Call us"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
            />
          </svg>
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
          className="float-action float-action--whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </a>
      </div>

      <Chatbot onOpenContact={() => scrollToId('contact')} />
    </>
  )
}

