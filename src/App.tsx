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
              Namaste! Meet your AI-augmented AI Engineer who treats ChatGPT like an unpaid intern with infinite patience.
            </p>
            <h1 className={styles.heroText}>Rohan Kavari</h1>
          </main>
        </section>
        <section ref={workRef} className={styles.snapSection}>
          <div className={styles.sectionContent}>
            <div className={styles.workGrid}>
              <a
                href="https://github.com/rohankavari/code_explained"
                target="_blank"
                rel="noopener noreferrer"
                title="Code Explainer Extension"
                className={styles.workSquare}
              >
                <img
                  className={styles.workImage}
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Nature Image 1"
                />
                <h3 className={styles.workTitle}>Code Explainer Extension</h3>
              </a>
              <div className={styles.workSquare}>
                <img
                  className={styles.workImage}
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Nature Image 2"
                />
                <h3 className={styles.workTitle}>Personal Language Tutor</h3>
              </div>
            </div>
          </div>
        </section>
        <section ref={chatRef} className={styles.snapSection}>
          <div className={styles.sectionContent}>
            <div className={styles.chatCard}>
              <div className={styles.chatIcons}>
                <a href="https://www.linkedin.com/in/rohan-kavari-9a31a1180/" target="_blank" rel="noopener noreferrer" className={`${styles.chatIcon} ${styles.tiltLeft}`} title="LinkedIn">
                  <img src="/icons/linkedin.png" alt="LinkedIn" className={styles.iconImg} />
                </a>
                <a href="https://github.com/rohankavari" target="_blank" rel="noopener noreferrer" className={`${styles.chatIcon} ${styles.tiltRight}`} title="GitHub">
                  <img src="/icons/github.png" alt="GitHub" className={styles.iconImg} />
                </a>
                <a href="mailto:rohankavari@gmail.com" className={`${styles.chatIcon} ${styles.tiltLeft}`} title="Gmail">
                  <img src="/icons/gmail.webp" alt="Gmail" className={styles.iconImg} />
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