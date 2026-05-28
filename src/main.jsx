import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import logo from "../assets/aria-logo-transparent.png";
import studioWide from "../assets/studio-wide.jpg";
import barbaraReformer from "../assets/barbara-reformer.jpg";
import reformerWide from "../assets/reformer-moment-wide.jpg";
import reformerDetail from "../assets/reformer-detail.jpg";

const WHATSAPP_URL = "https://wa.me/393335249707";

const navItems = [
  ["Studio", "studio"],
  ["Metodo", "metodo"],
  ["Percorsi", "percorsi"],
  ["Orari", "orari"],
  ["Contatti", "contatti"],
];

const lessons = [
  ["Reformer", "Controllo, sostegno e forza profonda."],
  ["Matwork", "Respiro, postura e movimento libero."],
  ["Individuale", "Un percorso cucito sul tuo corpo."],
  ["Piccoli gruppi", "Poche persone, attenzione costante."],
];

const benefits = ["Postura", "Respiro", "Mobilita", "Forza", "Equilibrio", "Calma"];

const schedule = [
  ["Lun - Ven", "Su appuntamento"],
  ["Sabato", "Mattina su richiesta"],
  ["Prima lezione", "Consulenza e prova"],
];

const prices = [
  ["Lezione singola", "Su richiesta"],
  ["Pacchetti", "Disponibili"],
  ["Personal", "Su appuntamento"],
];

const reviews = [
  ["Ogni lezione e precisa, calma, mai impersonale.", "Marta"],
  ["Uno spazio curato dove il corpo si alleggerisce.", "Giulia"],
  ["Barbara segue davvero la persona, non solo l'esercizio.", "Elena"],
];

function useReveal() {
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
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <Studio />
        <Method />
        <Lessons />
        <ScheduleAndPrices />
        <Benefits />
        <Gallery />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function Header({ scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="A.R.I.A Studio Pilates">
        <img src={logo} alt="" />
        <span>A.R.I.A</span>
      </a>
      <nav className="nav-links" aria-label="Navigazione principale">
        {navItems.map(([label, target]) => (
          <a key={target} href={`#${target}`}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href={WHATSAPP_URL}>
        Prenota su WhatsApp
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
      <a className="button button-dark" href={WHATSAPP_URL} onClick={() => setOpen(false)}>
        Prenota su WhatsApp
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <p className="kicker">Studio Pilates di Barbara</p>
        <h1 id="hero-title">Pilates, respiro, equilibrio.</h1>
        <p>Uno studio curato dove il movimento torna essenziale, preciso e naturale.</p>
        <div className="hero-actions">
          <a className="button button-dark" href={WHATSAPP_URL}>
            Prenota la tua prima lezione
          </a>
          <a className="button button-light" href="#studio">
            Scopri lo studio
          </a>
        </div>
      </div>
      <div className="hero-image reveal" aria-label="Sala Reformer A.R.I.A Studio Pilates">
        <img src={studioWide} alt="" fetchPriority="high" />
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="studio section" id="studio">
      <div className="section-copy reveal">
        <p className="kicker">Lo studio</p>
        <h2>Uno spazio quieto, luminoso, personale.</h2>
        <p>Barbara accompagna ogni lezione con attenzione al corpo, al respiro e alla qualita del gesto.</p>
        <a className="text-link" href={WHATSAPP_URL}>
          Prenota una lezione
        </a>
      </div>
      <figure className="studio-photo reveal">
        <img src={barbaraReformer} alt="Barbara nello studio A.R.I.A Pilates" loading="lazy" decoding="async" />
      </figure>
    </section>
  );
}

function Method() {
  return (
    <section className="method section" id="metodo">
      <div className="method-image reveal">
        <img src={reformerWide} alt="Esercizio Pilates su Reformer" loading="lazy" decoding="async" />
      </div>
      <div className="section-copy reveal">
        <p className="kicker">Il metodo</p>
        <h2>Movimento preciso, mai forzato.</h2>
        <p>Ogni percorso parte dall'ascolto: postura, mobilita e tono crescono con gradualita.</p>
      </div>
    </section>
  );
}

function Lessons() {
  return (
    <section className="lessons section" id="percorsi">
      <div className="section-heading reveal">
        <p className="kicker">Lezioni e percorsi</p>
        <h2>Scegli il ritmo giusto.</h2>
      </div>
      <div className="lesson-grid">
        {lessons.map(([title, text], index) => (
          <article className="lesson-card reveal" key={title} style={{ "--delay": `${index * 70}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <a className="button button-dark reveal" href={WHATSAPP_URL}>
        Prenota su WhatsApp
      </a>
    </section>
  );
}

function ScheduleAndPrices() {
  return (
    <section className="schedule section" id="orari" aria-labelledby="schedule-title">
      <div className="section-copy reveal">
        <p className="kicker">Orari e tariffe</p>
        <h2 id="schedule-title">Chiarezza prima di iniziare.</h2>
        <p>Disponibilita e percorso vengono definiti dopo un primo contatto, in base al tuo obiettivo.</p>
      </div>
      <div className="info-panels">
        <InfoPanel title="Orari" rows={schedule} />
        <InfoPanel title="Tariffe" rows={prices} />
      </div>
    </section>
  );
}

function InfoPanel({ title, rows }) {
  return (
    <article className="info-panel reveal">
      <h3>{title}</h3>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Benefits() {
  return (
    <section className="benefits section">
      <div className="section-copy reveal">
        <p className="kicker">Benefici</p>
        <h2>Un corpo piu presente.</h2>
        <p>Piccoli cambiamenti, percepiti nella postura e nel modo in cui ti muovi ogni giorno.</p>
      </div>
      <div className="benefit-list">
        {benefits.map((benefit) => (
          <span className="reveal" key={benefit}>
            {benefit}
          </span>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery section" id="galleria">
      <div className="section-heading reveal">
        <p className="kicker">Atmosfera</p>
        <h2>Luce, cura, movimento.</h2>
      </div>
      <div className="gallery-grid">
        <figure className="gallery-item large reveal">
          <img src={studioWide} alt="Sala Reformer luminosa" loading="lazy" decoding="async" />
        </figure>
        <figure className="gallery-item reveal">
          <img src={reformerDetail} alt="Dettaglio pratica Pilates su Reformer" loading="lazy" decoding="async" />
        </figure>
        <figure className="gallery-item reveal">
          <img src={reformerWide} alt="Movimento elegante su Reformer" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews section" aria-labelledby="reviews-title">
      <div className="section-heading reveal">
        <p className="kicker">Recensioni</p>
        <h2 id="reviews-title">Esperienze leggere, reali.</h2>
      </div>
      <div className="review-grid">
        {reviews.map(([quote, name], index) => (
          <blockquote className="review-card reveal" key={name} style={{ "--delay": `${index * 80}ms` }}>
            <p>"{quote}"</p>
            <cite>{name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <img src={logo} alt="" aria-hidden="true" />
      <div className="reveal">
        <p className="kicker">Primo contatto</p>
        <h2>Inizia con calma.</h2>
        <p>Scrivi a Barbara per disponibilita e percorso piu adatto.</p>
      </div>
      <a className="button button-sage reveal" href={WHATSAPP_URL}>
        Prenota la tua prima lezione
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contatti">
      <div className="footer-brand">
        <img src={logo} alt="" />
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
        <a href="https://www.instagram.com/a.r.i.a_studio_pilates/">Instagram</a>
        <a href="https://www.facebook.com/aria.pilates.barbara/">Facebook</a>
      </div>
      <div>
        <h3>Studio</h3>
        <p>Riceve su appuntamento.</p>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={WHATSAPP_URL} aria-label="Prenota su WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16.02 3.3A12.62 12.62 0 0 0 5.3 22.6L3.7 28.5l6.04-1.58A12.6 12.6 0 1 0 16.02 3.3Zm0 22.96c-2 0-3.84-.58-5.42-1.58l-.38-.24-3.58.94.96-3.49-.25-.4a10.28 10.28 0 1 1 8.67 4.77Zm5.64-7.7c-.31-.16-1.83-.9-2.12-1-.28-.1-.49-.16-.7.16-.2.3-.8.99-.98 1.2-.18.2-.36.23-.67.07-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58 0 1.52 1.1 2.99 1.26 3.2.15.2 2.18 3.33 5.28 4.67.74.32 1.31.51 1.76.65.74.24 1.42.2 1.95.12.6-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
      </svg>
    </a>
  );
}

createRoot(document.getElementById("root")).render(<App />);
