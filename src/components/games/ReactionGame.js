import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';

const ReactionGame = ({ onBack }) => {
    const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, clicked, tooSoon
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [bestTime, setBestTime] = useState(() => {
        const saved = localStorage.getItem('bestReactionTime');
        return saved ? parseInt(saved) : null;
    });
    const [attempts, setAttempts] = useState([]);
    const timeoutRef = useRef(null);

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
            clearTimeout(timeoutRef.current);
            setGameState('tooSoon');
        } else if (gameState === 'ready') {
            const time = Date.now() - startTime;
            setReactionTime(time);
            setAttempts(prev => [...prev.slice(-4), time]);
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
            case 'waiting': return 'rgba(139, 0, 0, 0.4)'; // Dark Red
            case 'ready': return 'rgba(34, 139, 34, 0.6)'; // Green
            case 'tooSoon': return 'rgba(255, 69, 0, 0.4)'; // Orange Red
            case 'clicked': return 'rgba(30, 144, 255, 0.4)'; // Dodger Blue
            default: return 'rgba(255, 255, 255, 0.05)';
        }
    };

    const getBorderColor = () => {
        switch (gameState) {
            case 'waiting': return '#ff0000';
            case 'ready': return '#00ff00';
            case 'tooSoon': return '#ff4500';
            case 'clicked': return '#1e90ff';
            default: return 'rgba(255, 255, 255, 0.2)';
        }
    };

    const getMessage = () => {
        switch (gameState) {
            case 'idle': return { title: 'INITIATE_TEST', sub: '[CLICK_TO_START]' };
            case 'waiting': return { title: 'AWAITING_SIGNAL...', sub: '[DO_NOT_ENGAGE]' };
            case 'ready': return { title: 'ENGAGE!', sub: '' };
            case 'tooSoon': return { title: 'PREMATURE_ACTION', sub: '[RETRY]' };
            case 'clicked': return {
                title: `${reactionTime}ms`,
                sub: reactionTime < 200 ? 'STATUS: GODLIKE' : reactionTime < 300 ? 'STATUS: OPTIMAL' : 'STATUS: ACCEPTABLE'
            };
            default: return { title: '', sub: '' };
        }
    };

    const { title, sub } = getMessage();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f0',
                fontFamily: "'Courier New', monospace"
            }}
        >
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                cursor: 'pointer',
                border: '1px solid #0f0',
                padding: '5px 10px',
                background: 'rgba(0, 255, 0, 0.1)'
            }} onClick={onBack}>
                &lt; ROOT_DIR
            </div>

            <div
                onClick={handleClick}
                style={{
                    background: getBackgroundColor(),
                    border: `2px solid ${getBorderColor()}`,
                    width: '100%',
                    maxWidth: '600px',
                    height: '400px',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: gameState === 'ready' ? '0 0 30px #0f0' : 'none',
                    transition: 'all 0.2s ease'
                }}
            >
                {/* Scanlines Effect */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%',
                    pointerEvents: 'none'
                }} />

                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px currentColor',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {title}
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    opacity: 0.8,
                    letterSpacing: '2px'
                }}>
                    {sub}
                </p>
            </div>

            <div style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '2rem',
                fontSize: '1rem'
            }}>
                <div style={{ border: '1px solid #0f0', padding: '10px 20px' }}>
                    BEST_TIME: {bestTime ? `${bestTime}ms` : '---'}
                </div>
                <div style={{ border: '1px solid #0f0', padding: '10px 20px' }}>
                    ATTEMPTS: {attempts.length}
                </div>
            </div>
        </motion.div>
    );
};

export default ReactionGame;
