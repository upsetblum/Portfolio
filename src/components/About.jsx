import React, { useRef, useEffect } from 'react';
import '../styles/About.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
  const { isVisible, registerElement, scrollY } = useScrollAnimation();

  const experienceSectionRef = useRef(null);
  const stackSectionRef = useRef(null);
  const parallaxBgRef = useRef(null);

  // Register elements for scroll animations
  useEffect(() => {
    registerElement('experienceSection', experienceSectionRef.current);
    registerElement('stackSection', stackSectionRef.current);
  }, [registerElement]);

  // Parallax scrolling effect
  useEffect(() => {
    if (parallaxBgRef.current) {
      const translateY = scrollY * 0.15; // Adjust the value for speed (lower = slower)
      parallaxBgRef.current.style.transform = `translateY(-${translateY}px)`;
    }
  }, [scrollY]);

  return (
    <section className="about-section" id="about">
      {/* Parallax background */}
      <div className="parallax-bg" ref={parallaxBgRef}></div>

      <div className="about-wrapper">
        <div className="about-header">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">quelques mots sur moi</p>
        </div>

        <div className="about-content scroll-reveal scroll-reveal-delay-1">
          <div className="about-image-container">
            <div className="about-image">
              {/* Image will be added via CSS as background */}
              <div className="image-glow"></div>
            </div>
          </div>

          <div className="about-text">
            <h3 className="about-heading">Intro</h3>
            <p className="about-paragraph">
              J&apos;ai 22 ans, j&apos;ai bossé en cuisine pendant mes études,
              et j&apos;y ai découvert une vraie passion. Après un détour par le
              développement web, j&apos;ai envie de revenir là où je me sens
              utile : en cuisine. Travailler en équipe, aller vite, bien faire —
              c&apos;est ce qui me motive. Aujourd&apos;hui, je cherche un poste
              où je peux relever des défis concrets et donner du sens à ce que
              je fais, couteau en main.
            </p>
            <p className="about-paragraph">
              Même quand je ne travaille pas, je suis toujours curieux de
              nouvelles choses à apprendre et à expérimenter. Je continue à
              développer mes compétences en design et en développement Fullstack
              en travaillant sur des projets personnels, en lisant des livres,
              etc.
            </p>
          </div>
        </div>

        <div
          className={`experience-section ${
            isVisible.experienceSection ? 'visible' : ''
          }`}
          ref={experienceSectionRef}
        >
          <h3 className="about-heading">Experiences</h3>

          <div className="experience-grid">
            <div className="experience-item">
              <h4 className="experience-role">Front-End Developer</h4>
              <div className="experience-details">
                <span className="experience-date">2023</span>
                <span className="experience-company">365jours dev</span>
              </div>
            </div>

            <div className="experience-item">
              <h4 className="experience-role">Projet Git</h4>
              <div className="experience-details">
                <span className="experience-date">2024 </span>
                <span className="experience-company">autodidacte</span>
              </div>
            </div>

            <div className="experience-item">
              <h4 className="experience-role">Commis-plongeur</h4>
              <div className="experience-details">
                <span className="experience-date">2023 - aujourd&apos;hui</span>
                <span className="experience-company">
                  Rstaurant Le National
                </span>
              </div>
            </div>

            <div className="experience-item">
              <h4 className="experience-role">Web Developer</h4>
              <div className="experience-details">
                <span className="experience-date">2024 - aujourd&apos;hui</span>
                <span className="experience-company">Freelance</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`stack-section ${isVisible.stackSection ? 'visible' : ''}`}
          ref={stackSectionRef}
        >
          <h3 className="about-heading">Stack</h3>
          <p className="stack-description">
            Quelques Techno que j'utilise au quotidien
          </p>

          <div className="stack-grid">
            <div className="stack-item">React</div>
            <div className="stack-item">Node.js</div>
            <div className="stack-item">TypeScript</div>
            <div className="stack-item">Tailwind CSS</div>
            <div className="stack-item">Next.js</div>
            <div className="stack-item">Convex</div>
          </div>
        </div>
      </div>
      <div className="neon-bg-effect"></div>
    </section>
  );
};

export default About;
