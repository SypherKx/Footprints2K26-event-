import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FootprintsLogo from "../media/footprints-font.webp";
import Logo2K26 from "../media/2k26-stylized.png";
import PsitLogo from "../media/psit-logo-new.png";
import HeroVideoMp4 from "../media/new-background-compressed.mp4";
import HeroVideoWebM from "../media/new-background.webm";
import HeroPoster from "../media/video-poster.jpg";
import "./ThankYouOverlay.scss";

/* ── floating particle canvas ── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -Math.random() * 1.5 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() > 0.6 ? 340 : 30;
        this.life = 1;
        this.decay = Math.random() * 0.002 + 0.001;
      }
      update() {
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.y += this.speedY;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity * this.life})`;
        ctx.fill();
      }
    }

    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ty-particles" />;
};

/* ── main overlay ── */
const ThankYouOverlay = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShowContent(true), 500);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const riseUp = {
    hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <div className="ty-overlay">
      {/* Background video — same as hero */}
      <div className="ty-video-wrap">
        <video
          autoPlay muted loop playsInline preload="auto"
          poster={HeroPoster}
          className="ty-video"
        >
          <source src={HeroVideoWebM} type="video/webm" />
          <source src={HeroVideoMp4} type="video/mp4" />
        </video>
        <div className="ty-video-overlay" />
      </div>

      <ParticleCanvas />

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="ty-content"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* PSIT logo */}
            <motion.img
              src={PsitLogo} alt="PSIT" className="ty-psit" variants={scaleIn}
            />

            {/* Footprints logo */}
            <motion.img
              src={FootprintsLogo} alt="Footprints"
              className="ty-fp-logo" variants={riseUp}
            />

            {/* 2K26 mark */}
            <motion.img
              src={Logo2K26} alt="2K26"
              className="ty-mark" variants={riseUp}
            />

            {/* THE curtain line */}
            <motion.div className="ty-line" variants={riseUp} />

            {/* THANK YOU — massive, raw */}
            <motion.h1 className="ty-title" variants={riseUp}>
              Thank You
            </motion.h1>

            {/* The message */}
            <motion.p className="ty-msg" variants={riseUp}>
              For making <strong>FOOTPRINTS 2K26</strong> an unforgettable chapter.<br />
              Every cheer, every sprint, every moment — you made it legendary.
            </motion.p>

            {/* 2K27 — huge, raw, no box */}
            <motion.div className="ty-next" variants={riseUp}>
              <span className="ty-next__pre">We'll be back in</span>
              <motion.span
                className="ty-next__year"
                animate={{
                  textShadow: [
                    "0 0 40px rgba(201,122,144,0.3)",
                    "0 0 80px rgba(201,122,144,0.5)",
                    "0 0 40px rgba(201,122,144,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                2K27
              </motion.span>
              <span className="ty-next__tag">Bigger &middot; Bolder &middot; Unstoppable</span>
            </motion.div>

            {/* footer */}
            <motion.p className="ty-copy" variants={riseUp}>
              © FOOTPRINTS &middot; PSIT Kanpur
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThankYouOverlay;
