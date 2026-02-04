import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll Component
 * Provides smooth scrolling behavior and scroll-triggered animations
 */
const SmoothScroll = ({ children }) => {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Smooth scroll effect using GSAP
            const sections = gsap.utils.toArray('.animate-section');

            sections.forEach((section) => {
                gsap.fromTo(section,
                    {
                        y: 60,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            end: 'top 50%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Stagger animations for list items
            const staggerElements = gsap.utils.toArray('.animate-stagger');
            staggerElements.forEach((container) => {
                const items = container.querySelectorAll('.stagger-item');
                gsap.fromTo(items,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Parallax effect for backgrounds
            const parallaxElements = gsap.utils.toArray('.parallax-bg');
            parallaxElements.forEach((el) => {
                gsap.to(el, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="smooth-scroll-wrapper">
            {children}
        </div>
    );
};

export default SmoothScroll;
