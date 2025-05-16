import React, { useState, useEffect, useRef } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const galleryRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: 'Portfolio',
      year: '2024',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000',
      description: 'Mon site portfolio codé en React',
    },
    {
      id: 2,
      name: 'CONTACT',
      year: '5min',
      image:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000',
      description: 'Prototype de génèration avec IA',
    },
    {
      id: 3,
      name: 'Skeve',
      year: '2024',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000',
      description: 'Site web d&apos;un restaurant',
    },
    {
      id: 4,
      name: 'Luminance',
      year: '2023',
      image:
        'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000',
      description: '',
    },
    {
      id: 5,
      name: 'Echo',
      year: '2022',
      image:
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000',
      description: '',
    },
  ];

  // Handle mouse events for dragging effect
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle navigation to specific slide
  const navigateToSlide = (index) => {
    setActiveIndex(index);
    if (galleryRef.current) {
      const itemWidth =
        galleryRef.current.querySelector('.project-card').offsetWidth;
      galleryRef.current.scrollTo({
        left: itemWidth * (index - 1),
        behavior: 'smooth',
      });
    }
  };

  // Auto-rotate gallery
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = activeIndex === projects.length ? 1 : activeIndex + 1;
      navigateToSlide(newIndex);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, projects.length]);

  return (
    <section className="projects-section" id="portfolio">
      <div className="gallery-header">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">parceque une image vaut mille mots</p>
      </div>

      <div className="gallery-container">
        <div
          className="gallery-carousel"
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${
                activeIndex === index + 1 ? 'active' : ''
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${
                  (index + 1 - activeIndex) * 30
                }deg) translateZ(${
                  Math.abs(index + 1 - activeIndex) * -100
                }px)`,
                opacity: 1 - Math.abs(index + 1 - activeIndex) * 0.2,
                zIndex: projects.length - Math.abs(index + 1 - activeIndex),
              }}
              onClick={() => navigateToSlide(index + 1)}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <div className="project-overlay">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-year">{project.year}</span>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-navigation">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${activeIndex === index + 1 ? 'active' : ''}`}
              onClick={() => navigateToSlide(index + 1)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
