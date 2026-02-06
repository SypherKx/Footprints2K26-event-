import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SplitText Component - Splits text into individual characters
 * that scatter on scroll and reform when scrolling back
 */
const SplitText = ({
    children,
    className = '',
    as: Component = 'span',
    disabled = false,
    intensity = 1,
    style = {}
}) => {
    const containerRef = useRef(null);
    const charsRef = useRef([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (disabled || !containerRef.current || charsRef.current.length === 0) return;

        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const chars = charsRef.current.filter(Boolean);
        const effectIntensity = isMobile ? intensity * 0.4 : intensity;

        // Create scatter animation for each character
        chars.forEach((charEl, index) => {
            if (!charEl) return;

            const randomX = (Math.random() - 0.5) * 150 * effectIntensity;
            const randomY = (Math.random() - 0.5) * 100 * effectIntensity;
            const randomRotate = (Math.random() - 0.5) * 30 * effectIntensity;

            gsap.to(charEl, {
                x: randomX,
                y: randomY,
                rotate: randomRotate,
                opacity: 0.4,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    scrub: 1.5,
                    toggleActions: 'play reverse play reverse',
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [disabled, isMobile, intensity]);

    // Convert children to string
    const text = typeof children === 'string' ? children : String(children);

    return (
        <Component
            ref={containerRef}
            className={className}
            style={{
                ...style,
                display: 'inline-flex',
                flexWrap: 'wrap',
                perspective: '1000px',
            }}
        >
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    ref={el => charsRef.current[index] = el}
                    style={{
                        display: 'inline-block',
                        willChange: 'transform, opacity',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </Component>
    );
};

export default SplitText;
