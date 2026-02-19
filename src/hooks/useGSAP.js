import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-based deconstruction effects
 * with mobile optimizations
 */
export const useScrollDeconstruct = (containerRef, options = {}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for mobile and reduced motion preference
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return () => window.removeEventListener('resize', checkMobile);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return { isMobile };
};

/**
 * Split text into individual characters for animation
 */
export const splitTextToChars = (text) => {
    return text.split('').map((char, index) => ({
        char: char === ' ' ? '\u00A0' : char,
        index,
    }));
};

/**
 * Create scatter animation for text characters
 */
export const createScatterAnimation = (chars, trigger, isMobile = false) => {
    if (!chars || !trigger) return null;

    // Reduced effect for mobile
    const intensity = isMobile ? 0.3 : 1;

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            toggleActions: 'play reverse play reverse',
        }
    });

    chars.forEach((charEl, index) => {
        const randomX = (Math.random() - 0.5) * 200 * intensity;
        const randomY = (Math.random() - 0.5) * 150 * intensity;
        const randomRotate = (Math.random() - 0.5) * 45 * intensity;
        const randomScale = 0.8 + Math.random() * 0.4;

        timeline.to(charEl, {
            x: randomX,
            y: randomY,
            rotate: randomRotate,
            scale: randomScale,
            opacity: 0.7,
            ease: 'power2.inOut',
            duration: 0.5,
        }, index * 0.02);
    });

    return timeline;
};

/**
 * Create parallax effect for elements
 */
export const createParallaxEffect = (element, speed = 50, trigger = null) => {
    if (!element) return null;

    return gsap.to(element, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
            trigger: trigger || element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
};

export { gsap, ScrollTrigger };
