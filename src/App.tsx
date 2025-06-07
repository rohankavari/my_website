import React, { useRef, useEffect, useState } from 'react';
import styles from './App.module.css';

const NAV_ITEMS = [
  { label: 'Hey', refName: 'heroRef' },
  { label: 'Work', refName: 'workRef' },
  { label: 'Chat', refName: 'chatRef' },
];

const App = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('Hey');

  // Use IntersectionObserver for reliable nav highlight
  useEffect(() => {
    const sections = [
      { ref: heroRef, label: 'Hey' },
      { ref: workRef, label: 'Work' },
      { ref: chatRef, label: 'Chat' },
    ];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    };
    let prevRatio = 0;
    let currentActive = 'Hey';
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let visibleLabel = currentActive;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleLabel = entry.target.getAttribute('data-label') || visibleLabel;
        }
      });
      if (visibleLabel !== currentActive) {
        currentActive = visibleLabel;
        setActive(visibleLabel);
      }
    };
    const observer = new window.IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(section => {
      if (section.ref.current) {
        section.ref.current.setAttribute('data-label', section.label);
        observer.observe(section.ref.current);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  // Nav click scroll
  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.background}>
      <nav className={styles.navbarFixed}>
        <div className={styles.navButtons}>
          {NAV_ITEMS.map((item, idx) => (
            <span
              key={item.label}
              className={active === item.label ? styles.active : ''}
              onClick={() => handleNavClick(eval(item.refName))}
              style={{ cursor: 'pointer' }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </nav>
      <div className={styles.snapContainer}>
        <section ref={heroRef} className={styles.snapSection}>
          <main className={styles.mainContent}>
            <p className={styles.subtitle}>
              Namaste! Meet your AI-augmented web designer who treats ChatGPT like an unpaid intern with infinite patience.
            </p>
            <h1 className={styles.heroText}>Rohan Kavari</h1>
          </main>
        </section>
        <section ref={workRef} className={styles.snapSection}>
          <div className={styles.sectionContent}>
            <div className={styles.workCard}>
              <img
                className={styles.workPortrait}
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=600&h=800&q=80"
                alt="Portrait of Rohan Kavari"
              />
              <div className={styles.workTagline}>
                I'm a web designer who creates kickass websites with less effort than it takes to microwave popcorn. Hire me before I get replaced by my own code!
              </div>
            </div>
          </div>
        </section>
        <section ref={chatRef} className={styles.snapSection}>
          <div className={styles.sectionContent}>
            <div className={styles.chatCard}>
              <div className={styles.chatIcons}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${styles.chatIcon} ${styles.tiltLeft}`} title="LinkedIn">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#0077B5"/><path d="M10.666 13.333h2.667v8H10.666v-8zm1.333-4a1.333 1.333 0 110 2.667 1.333 1.333 0 010-2.667zm3.334 4h2.56v1.093h.037c.356-.675 1.226-1.387 2.523-1.387 2.7 0 3.2 1.776 3.2 4.084v4.21h-2.667v-3.733c0-.89-.016-2.034-1.24-2.034-1.24 0-1.427.968-1.427 1.967v3.8h-2.666v-8z" fill="#fff"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${styles.chatIcon} ${styles.tiltRight}`} title="Instagram">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#E1306C"/><path d="M16 12.267A3.733 3.733 0 1016 19.733a3.733 3.733 0 000-7.466zm0 6.133a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zm4.8-6.267a.867.867 0 11-1.733 0 .867.867 0 011.733 0zm2.467.88c-.055-1.17-.32-2.206-1.17-3.056-.85-.85-1.886-1.115-3.056-1.17-1.205-.069-4.82-.069-6.025 0-1.17.055-2.206.32-3.056 1.17-.85.85-1.115 1.886-1.17 3.056-.069 1.205-.069 4.82 0 6.025.055 1.17.32 2.206 1.17 3.056.85.85 1.886 1.115 3.056 1.17 1.205.069 4.82.069 6.025 0 1.17-.055 2.206-.32 3.056-1.17.85-.85 1.115-1.886 1.17-3.056.069-1.205.069-4.82 0-6.025zm-2.133 7.32a2.733 2.733 0 01-1.54 1.54c-1.067.423-3.6.326-4.594.326-.994 0-3.527.097-4.594-.326a2.733 2.733 0 01-1.54-1.54c-.423-1.067-.326-3.6-.326-4.594 0-.994-.097-3.527.326-4.594a2.733 2.733 0 011.54-1.54c1.067-.423 3.6-.326 4.594-.326.994 0 3.527-.097 4.594.326a2.733 2.733 0 011.54 1.54c.423 1.067.326 3.6.326 4.594 0 .994.097 3.527-.326 4.594z" fill="#fff"/></svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${styles.chatIcon} ${styles.tiltLeft}`} title="GitHub">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#181717"/><path d="M16 7.333c-4.6 0-8.333 3.733-8.333 8.333 0 3.683 2.393 6.8 5.713 7.9.417.08.567-.18.567-.4v-1.4c-2.32.5-2.807-1.12-2.807-1.12-.38-.967-.927-1.227-.927-1.227-.76-.52.06-.513.06-.513.84.06 1.28.86 1.28.86.747 1.28 1.96.91 2.44.697.073-.54.293-.91.533-1.12-1.853-.21-3.8-.927-3.8-4.127 0-.913.327-1.66.86-2.247-.087-.21-.373-1.06.08-2.213 0 0 .7-.227 2.293.86a7.98 7.98 0 012.087-.28c.707.003 1.42.095 2.087.28 1.593-1.087 2.293-.86 2.293-.86.453 1.153.167 2.003.08 2.213.533.587.86 1.334.86 2.247 0 3.207-1.947 3.913-3.8 4.12.3.26.567.773.567 1.56v2.313c0 .22.15.48.573.4C21.94 22.467 24.333 19.35 24.333 15.667c0-4.6-3.733-8.334-8.333-8.334z" fill="#fff"/></svg>
                </a>
                <a href="mailto:someone@example.com" className={`${styles.chatIcon} ${styles.tiltRight}`} title="Gmail">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#EA4335"/><path d="M23.333 10.667v10.666c0 .733-.6 1.334-1.333 1.334H10c-.733 0-1.333-.6-1.333-1.334V10.667c0-.733.6-1.334 1.333-1.334h12c.733 0 1.333.6 1.333 1.334zm-1.333 0l-6 4.667-6-4.667V21.333c0 .367.3.667.667.667h10.666c.367 0 .667-.3.667-.667V10.667z" fill="#fff"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App; 