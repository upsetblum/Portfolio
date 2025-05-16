import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Contact = () => {
  const { registerElement, scrollY } = useScrollAnimation();
  const parallaxBgRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // null, 'success', or 'error'

  // Register elements for scroll animations
  useEffect(() => {
    if (formRef.current) {
      registerElement('contactForm', formRef.current);
    }
  }, [registerElement, formRef]);

  // Parallax scrolling effect
  useEffect(() => {
    if (parallaxBgRef.current) {
      const translateY = scrollY * 0.1; // Adjust the value for speed
      parallaxBgRef.current.style.transform = `translateY(-${translateY}px)`;
    }
  }, [scrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // EmailJS credentials
    const serviceId = 'service_0zc8xd8';
    const templateId = 'template_tdomylo';
    const publicKey = 'FPCkGu0b3Z8M5m9e7';

    // Using sendForm instead of send for direct form submission
    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then((result) => {
        console.log('Success!', result.text);
        setFormStatus('success');
        e.target.reset(); // Clear form fields
      })
      .catch((error) => {
        console.error('Failed...', error);
        setFormStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="contact-section" id="contact">
      {/* Parallax background */}
      <div className="contact-parallax-bg" ref={parallaxBgRef}></div>

      <div className="contact-wrapper">
        <div className="contact-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Travailons ensemble sur votre projet
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form
              className="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="from_name">Nom</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Your message"
                  className="form-textarea"
                  rows="5"
                ></textarea>
              </div>

              {formStatus === 'success' && (
                <div className="form-status success">
                  Message envoyé avec succès ! Je vous recontacterai bientôt.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-status error">
                  Echec de l'envoi du message. Veuillez réessayer ou envoyez moi
                  un email directement.
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <span className="button-glow"></span>
              </button>
            </form>
          </div>

          <div className="contact-image-container">
            <div className="contact-image">
              {/* Image background will be added via CSS */}
              <div className="neon-circle"></div>
              <div className="neon-circle-outer"></div>
              <div className="neon-dots">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="neon-dot"
                    style={{
                      transform: `rotate(${index * 30}deg) translateY(-45px)`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
