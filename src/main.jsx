import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import logo from "../assets/aria-logo.jpg";
import studioWide from "../assets/studio-wide.jpg";
import barbaraReformer from "../assets/barbara-reformer.jpg";
import reformerWide from "../assets/reformer-moment-wide.jpg";
import reformerDetail from "../assets/reformer-detail.jpg";

const WHATSAPP_URL = "https://wa.me/393335249707";

const navItems = [
  ["Studio", "studio"],
  ["Servizi", "servizi"],
  ["Galleria", "galleria"],
  ["Contatti", "contatti"],
];

const services = [
  {
    title: "Pilates Matwork",
    copy: "Sequenze a corpo libero per ritrovare controllo, mobilita e una postura piu consapevole.",
  },
  {
    title: "Pilates Reformer",
    copy: "Macchina, molle e ritmo: un lavoro preciso per forza profonda, sostegno e fluidita.",
  },
  {
    title: "Lezioni Individuali",
    copy: "Un percorso dedicato, costruito sui bisogni del corpo e sul momento reale della persona.",
  },
  {
    title: "Lezioni di Gruppo",
    copy: "Piccoli gruppi, atmosfera raccolta e correzioni attente senza perdere il respiro della pratica.",
  },
  {
    title: "Percorsi Personalizzati",
    copy: "Programmi progressivi per postura, mobilita, tono muscolare e benessere quotidiano.",
  },
];

const benefits = [
  "Postura",
  "Respirazione",
  "Mobilita",
  "Tono muscolare",
  "Equilibrio",
  "Benessere mentale",
];

const testimonials = [
  {
    quote: "Con Barbara ho imparato a muovermi con piu calma. Ogni lezione e precisa, mai impersonale.",
    client: "Marta C.",
  },
  {
    quote: "Lo studio ha un'energia rara: entri con tensione, esci con una postura diversa e la mente piu leggera.",
    client: "Giulia R.",
  },
  {
    quote: "Il percorso individuale mi ha aiutata a ritrovare fiducia nel corpo, senza fretta e senza giudizio.",
    client: "Elena P.",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    const onPointer = (event) => setCursor({ x: event.clientX, y: event.clientY });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const cursorStyle = useMemo(
    () => ({ "--cursor-x": `${cursor.x}px`, "--cursor-y": `${cursor.y}px` }),
    [cursor],
  );

  return (
    <div className="site-shell" style={cursorStyle}>
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <Studio />
        <Services />
        <Benefits />
        <Gallery />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Header({ scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="A.R.I.A Studio Pilates">
        <span className="brand-mark">
          <img src={logo} alt="" />
        </span>
        <span>A.R.I.A</span>
      </a>
      <nav className="nav-links" aria-label="Navigazione principale">
        {navItems.map(([label, target]) => (
          <a key={target} href={`#${target}`}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-whatsapp" href={WHATSAPP_URL}>
        Scrivi su WhatsApp
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function MobileMenu({ open, setOpen }) {
  return (
    <div className={`mobile-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
      {navItems.map(([label, target]) => (
        <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>
          {label}
        </a>
      ))}
      <a className="mobile-cta" href={WHATSAPP_URL} onClick={() => setOpen(false)}>
        Scrivi su WhatsApp
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <img src={studioWide} alt="" />
      </div>
      <div className="hero-veil" />
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="kicker reveal">Studio Pilates di Barbara</p>
          <h1 className="reveal">Ritrova equilibrio nel movimento.</h1>
          <p className="hero-text reveal">
            Uno spazio milanese quieto e luminoso dove il Pilates diventa ascolto,
            precisione e presenza. Reformer, Matwork e percorsi costruiti sul corpo.
          </p>
          <div className="hero-actions reveal">
            <a className="button button-dark" href={WHATSAPP_URL}>
              Scrivi su WhatsApp
            </a>
            <a className="button button-line" href="#studio">
              Scopri lo studio
            </a>
          </div>
        </div>
        <figure className="hero-portrait reveal">
          <img src={barbaraReformer} alt="Barbara nello studio Pilates A.R.I.A" />
          <figcaption>Barbara / A.R.I.A Studio Pilates</figcaption>
        </figure>
        <div className="hero-monogram reveal" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="scroll-note" aria-hidden="true">
        <span>Scroll</span>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="studio-section" id="studio">
      <div className="section-index reveal">01 / Filosofia</div>
      <div className="studio-grid">
        <div className="studio-sticky reveal">
          <img src={logo} alt="" />
          <span>Respiro / Equilibrio / Armonia</span>
        </div>
        <div className="studio-copy">
          <p className="kicker reveal">La filosofia</p>
          <h2 className="reveal">Un luogo dove il corpo torna ad ascoltarsi.</h2>
          <p className="large-copy reveal">
            A.R.I.A nasce dall'intenzione di creare uno spazio dove il movimento diventa
            ascolto. Barbara guida ogni lezione con attenzione alla persona, al respiro,
            alla qualita del gesto, non alla quantita.
          </p>
          <div className="keyword-stack reveal">
            <span>RESPIRO</span>
            <span>EQUILIBRIO</span>
            <span>ARMONIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section" id="servizi">
      <div className="services-head">
        <p className="kicker reveal">Servizi</p>
        <h2 className="reveal">Precisione privata, ritmo boutique.</h2>
        <p className="section-copy reveal">
          Pochi elementi, molta attenzione: ogni pratica si adatta al livello, alla storia
          fisica e all'obiettivo della persona.
        </p>
      </div>
      <div className="service-track">
        {services.map((service, index) => (
          <article className="service-card reveal" key={service.title} style={{ "--delay": `${index * 90}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits-section">
      <div className="benefits-intro reveal">
        <p className="kicker">Benefici</p>
        <h2>Il cambiamento si sente prima di vedersi.</h2>
      </div>
      <div className="benefit-grid">
        {benefits.map((benefit, index) => (
          <div className="benefit reveal" key={benefit} style={{ "--delay": `${index * 70}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{benefit}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    ["Studio", studioWide, "Sala luminosa con Reformer e tappetini", "tall"],
    ["Dettaglio", reformerWide, "Esercizio su Reformer nello studio", "wide"],
    ["Momento", reformerDetail, "Pratica Pilates su Reformer", "medium"],
    ["Barbara", barbaraReformer, "Barbara seduta sul Reformer", "square"],
  ];

  return (
    <section className="gallery-section" id="galleria">
      <div className="gallery-heading reveal">
        <p className="kicker">Atmosfera</p>
        <h2>Silenzio, luce, materia.</h2>
      </div>
      <div className="gallery-wall">
        {items.map(([label, image, alt, size], index) => (
          <figure className={`gallery-card ${size} reveal`} key={label} style={{ "--delay": `${index * 110}ms` }}>
            <img src={image} alt={alt} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section">
      <p className="kicker reveal">Testimonianze</p>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <blockquote className="testimonial reveal" key={item.client} style={{ "--delay": `${index * 120}ms` }}>
            <p>"{item.quote}"</p>
            <cite>{item.client}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-logo reveal" aria-hidden="true">
        <img src={logo} alt="" />
      </div>
      <div className="final-copy reveal">
        <p className="kicker">Prenota un primo contatto</p>
        <h2>Inizia il tuo percorso.</h2>
        <p>Scrivi a Barbara per conoscere disponibilita, orari e il percorso piu adatto al tuo momento.</p>
      </div>
      <a className="button button-sage reveal" href={WHATSAPP_URL}>
        Scrivi su WhatsApp
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contatti">
      <div className="footer-brand">
        <span>A.R.I.A</span>
        <p>Studio Pilates di Barbara</p>
      </div>
      <div>
        <h3>Contatti</h3>
        <a href="tel:+393335249707">333 524 9707</a>
        <a href="mailto:a.r.i.a.studiopilatesdibarbara@gmail.com">
          a.r.i.a.studiopilatesdibarbara@gmail.com
        </a>
      </div>
      <div>
        <h3>Social</h3>
        <a href="https://www.instagram.com/a.r.i.a_studio_pilates/">@a.r.i.a_studio_pilates</a>
        <p>A.R.I.A Studio Pilates di Barbara</p>
      </div>
      <div>
        <h3>Orari</h3>
        <p>Lun - Ven su appuntamento</p>
        <p>Sabato mattina su richiesta</p>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={WHATSAPP_URL} aria-label="Scrivi ad A.R.I.A Studio Pilates su WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16.02 3.3A12.62 12.62 0 0 0 5.3 22.6L3.7 28.5l6.04-1.58A12.6 12.6 0 1 0 16.02 3.3Zm0 22.96c-2 0-3.84-.58-5.42-1.58l-.38-.24-3.58.94.96-3.49-.25-.4a10.28 10.28 0 1 1 8.67 4.77Zm5.64-7.7c-.31-.16-1.83-.9-2.12-1-.28-.1-.49-.16-.7.16-.2.3-.8.99-.98 1.2-.18.2-.36.23-.67.07-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58 0 1.52 1.1 2.99 1.26 3.2.15.2 2.18 3.33 5.28 4.67.74.32 1.31.51 1.76.65.74.24 1.42.2 1.95.12.6-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
      </svg>
    </a>
  );
}

createRoot(document.getElementById("root")).render(<App />);
