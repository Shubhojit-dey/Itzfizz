import { useEffect, useRef, useState, forwardRef } from "react"; // Added forwardRef
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "../assets/car.jpg";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef([]);
  const statsRef = useRef([]);
  const overlayRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if refs are available
    if (!headlineRef.current.length || !statsRef.current.length) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([headlineRef.current, statsRef.current], {
        opacity: 0,
        y: 50
      });

      // Headline stagger animation
      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.3
      });

      // Stats animation
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        delay: 0.8
      });

      // Scroll-based animation
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.2,
          rotate: 5,
          filter: "brightness(1.2) blur(2px)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            pin: false,
            anticipatePin: 1
          }
        });
      }

      // Overlay gradient animation
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(59,130,246,0.3) 100%)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      // Parallax effect for headline
      gsap.to(headlineRef.current, {
        y: -100,
        opacity: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      if (window.scrollY < window.innerHeight) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        setMousePosition({ x, y });
        
        // Subtle image movement on mouse move
        gsap.to(imageRef.current, {
          x: x * 2,
          y: y * 2,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headline = "WELCOME ITZFIZZ".split("");

  return (
    <section className="hero" ref={heroRef}>
      {/* Animated gradient overlay */}
      <div className="hero-overlay" ref={overlayRef}></div>
      
      {/* Animated background particles */}
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="hero-content">
        {/* Animated badge */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          ITZFIZZ DIGITAL
        </div>

        {/* Headline with letter spacing */}
        <h1 className="hero-headline">
          {headline.map((char, i) => (
            <span
              key={i}
              className="headline-char"
              ref={(el) => (headlineRef.current[i] = el)}
              style={char === " " ? { width: "2rem" } : {}}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="hero-subheadline">
          Crafting digital experiences that drive results
        </p>

        {/* Statistics */}
        <div className="stats-container">
          <Stat
            value="98%"
            label="Client Satisfaction"
            icon="⭐"
            ref={(el) => (statsRef.current[0] = el)}
          />
          <Stat
            value="150+"
            label="Projects Completed"
            icon="🚀"
            ref={(el) => (statsRef.current[1] = el)}
          />
          <Stat
            value="24/7"
            label="Expert Support"
            icon="⚡"
            ref={(el) => (statsRef.current[2] = el)}
          />
        </div>

        {/* CTA Buttons */}
        <div className="cta-container">
          <button className="cta-primary">
            Get Started
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="cta-secondary">
            Watch Demo
            <svg className="cta-play" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Visual element with mouse position influence */}
      <div 
        className="hero-visual-wrapper"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <div className="visual-glow"></div>
        <img
          ref={imageRef}
          src={car}
          alt="Hero Visual"
          className="hero-visual"
        />
        
        {/* Floating elements */}
        <div className="floating-elements">
          <div className="floating-element html">
            <span>&lt;/&gt;</span>
          </div>
          <div className="floating-element css">
            <span>{'{ }'}</span>
          </div>
          <div className="floating-element js">
            <span>( )</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

// Enhanced Stat component - Fixed with proper forwardRef
const Stat = forwardRef(({ value, label, icon }, ref) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animated counter
    const numericValue = parseInt(value) || 0;
    if (numericValue === 0) return;
    
    const duration = 2000;
    const steps = 50;
    const stepValue = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h2 className="stat-value">
          {count}
          {value.includes('%') && '%'}
          {value.includes('+') && '+'}
        </h2>
        <p className="stat-label">{label}</p>
      </div>
      <div className="stat-glow"></div>
    </div>
  );
});