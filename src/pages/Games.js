import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

const Games = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, clicked, tooSoon
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [bestTime, setBestTime] = useState(() => {
        const saved = localStorage.getItem('bestReactionTime');
        return saved ? parseInt(saved) : null;
    });
    const [attempts, setAttempts] = useState([]);
    const timeoutRef = useRef(null);

    // Loading screen timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const startGame = useCallback(() => {
        setGameState('waiting');
        setReactionTime(null);

        // Random delay between 1-4 seconds
        const delay = Math.random() * 3000 + 1000;
        timeoutRef.current = setTimeout(() => {
            setGameState('ready');
            setStartTime(Date.now());
        }, delay);
    }, []);

    const handleClick = useCallback(() => {
        if (gameState === 'idle') {
            startGame();
        } else if (gameState === 'waiting') {
            // Clicked too soon
            clearTimeout(timeoutRef.current);
            setGameState('tooSoon');
        } else if (gameState === 'ready') {
            const time = Date.now() - startTime;
            setReactionTime(time);
            setAttempts(prev => [...prev.slice(-4), time]); // Keep last 5
            setGameState('clicked');

            if (!bestTime || time < bestTime) {
                setBestTime(time);
                localStorage.setItem('bestReactionTime', time.toString());
            }
        } else if (gameState === 'tooSoon' || gameState === 'clicked') {
            startGame();
        }
    }, [gameState, startTime, bestTime, startGame]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const getBackgroundColor = () => {
        switch (gameState) {
            case 'waiting': return 'linear-gradient(135deg, #8B0000 0%, #4a0000 100%)';
            case 'ready': return 'linear-gradient(135deg, #228B22 0%, #0a4a0a 100%)';
            case 'tooSoon': return 'linear-gradient(135deg, #FF4500 0%, #8B2500 100%)';
            case 'clicked': return 'linear-gradient(135deg, #1E90FF 0%, #0a3a6a 100%)';
            default: return 'linear-gradient(135deg, #333 0%, #111 100%)';
        }
    };

    const getMessage = () => {
        switch (gameState) {
            case 'idle': return { title: 'Reaction Test', sub: 'Tap or click to start' };
            case 'waiting': return { title: 'Wait for green...', sub: "Don't click yet!" };
            case 'ready': return { title: 'CLICK NOW!', sub: '' };
            case 'tooSoon': return { title: 'Too soon!', sub: 'Tap to try again' };
            case 'clicked': return {
                title: `${reactionTime} ms`,
                sub: reactionTime < 200 ? 'Incredible!' : reactionTime < 250 ? 'Fast!' : reactionTime < 300 ? 'Good!' : 'Tap to try again'
            };
            default: return { title: '', sub: '' };
        }
    };

    const { title, sub } = getMessage();
    const avgTime = attempts.length > 0 ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : null;

    // Loading Screen
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 'clamp(2rem, 8vw, 4rem)',
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '0.1em'
                    }}
                >
                    LOADING
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        ...
                    </motion.span>
                </motion.div>
                <motion.div
                    style={{
                        width: '200px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        marginTop: '2rem',
                        overflow: 'hidden'
                    }}
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                            borderRadius: '2px'
                        }}
                    />
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className={cx('page-transition', 'container')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scaleX: 0 }}
            style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '2rem', background: '#000' }}
        >
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Mini Games
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                    Test your reflexes and compete!
                </p>
            </header>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0 1rem'
            }}>
                {/* Game Box */}
                <div
                    onClick={handleClick}
                    onTouchEnd={(e) => { e.preventDefault(); handleClick(); }}
                    style={{
                        background: getBackgroundColor(),
                        width: '100%',
                        maxWidth: '500px',
                        height: '300px',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        transition: 'background 0.3s ease, transform 0.1s ease',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                    }}
                >
                    <div style={{
                        fontSize: gameState === 'clicked' ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(1.5rem, 5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'center',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        {title}
                    </div>
                    <div style={{
                        fontSize: gameState === 'ready' ? '4rem' : '1.2rem',
                        color: 'rgba(255,255,255,0.9)',
                        marginTop: '0.5rem',
                        textAlign: 'center'
                    }}>
                        {sub}
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        flex: 1,
                        minWidth: '120px'
                    }}>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            Best Time
                        </div>
                        <div style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 700 }}>
                            {bestTime ? `${bestTime} ms` : '---'}
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        flex: 1,
                        minWidth: '120px'
                    }}>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            Average
                        </div>
                        <div style={{ color: '#60a5fa', fontSize: '1.5rem', fontWeight: 700 }}>
                            {avgTime ? `${avgTime} ms` : '---'}
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        flex: 1,
                        minWidth: '120px'
                    }}>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                            Attempts
                        </div>
                        <div style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 700 }}>
                            {attempts.length}
                        </div>
                    </div>
                </div>

                {/* Recent attempts */}
                {attempts.length > 0 && (
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {attempts.map((time, i) => (
                            <span key={i} style={{
                                background: time === bestTime ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: time === bestTime ? '#4ade80' : 'rgba(255,255,255,0.6)',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                border: time === bestTime ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid transparent'
                            }}>
                                {time}ms
                            </span>
                        ))}
                    </div>
                )}

                {/* Instructions */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    maxWidth: '500px',
                    width: '100%'
                }}>
                    <h3 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.1rem' }}>How to Play</h3>
                    <ol style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                        <li>Tap the box to start</li>
                        <li>Wait for it to turn <span style={{ color: '#4ade80' }}>GREEN</span></li>
                        <li>Tap as fast as you can!</li>
                        <li>Beat your best time</li>
                    </ol>
                </div>
            </div>
        </motion.div>
    );
};

export default Games;
