import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import ReactionGame from '../components/games/ReactionGame';
import SequenceGame from '../components/games/SequenceGame';

// Futuristic folder icon
const FolderIcon = ({ color = "#00ff00", label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '100px' }}>
        <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <span style={{
            color: color,
            fontFamily: "'Courier New', monospace",
            fontSize: '12px',
            textAlign: 'center',
            textShadow: `0 0 5px ${color}`
        }}>
            {label}
        </span>
    </div>
);

const Games = () => {
    const [view, setView] = useState('root'); // root, reaction, sequence
    const [isLoading, setIsLoading] = useState(true);

    // Initial load simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => setView('root');

    // Boot screen
    if (isLoading) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#00ff00',
                fontFamily: "'Courier New', monospace",
                zIndex: 9999
            }}>
                <div style={{ width: '300px' }}>
                    <p>&gt; INITIALIZING_SYSTEM...</p>
                    <p>&gt; MOUNTING_DRIVES...</p>
                    <p>&gt; DECRYPTING_GAMES_DIR...</p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.2, ease: "linear" }}
                        style={{ height: '4px', background: '#00ff00', marginTop: '10px' }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '80px', // Navbar space
            background: '#050505',
            color: '#00ff00',
            fontFamily: "'Courier New', monospace",
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Grid Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* CRT Scanline Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 10
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 5, height: 'calc(100vh - 100px)' }}>
                {/* Header Terminal Style */}
                <header style={{
                    borderBottom: '1px solid #00ff00',
                    paddingBottom: '1rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <span style={{ opacity: 0.7 }}>root@footprints:</span>
                        <span style={{ color: '#00ff00' }}>~/games</span>
                        <span style={{ animation: 'blink 1s infinite' }}>$</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                        SYSTEM_STATUS: ONLINE
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {view === 'root' && (
                        <motion.div
                            key="root"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '2rem',
                                padding: '1rem'
                            }}
                        >
                            <motion.div
                                onClick={() => setView('reaction')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FolderIcon label="REACTION_TEST.EXE" />
                            </motion.div>

                            <motion.div
                                onClick={() => setView('sequence')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FolderIcon label="SEQUENCE_MEMORY.SH" />
                            </motion.div>

                            <motion.div style={{ opacity: 0.3, cursor: 'not-allowed' }}>
                                <FolderIcon label="LOCKED_DIR" color="#ff0000" />
                            </motion.div>
                        </motion.div>
                    )}

                    {view === 'reaction' && (
                        <motion.div
                            key="reaction"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ height: '100%' }}
                        >
                            <ReactionGame onBack={handleBack} />
                        </motion.div>
                    )}

                    {view === 'sequence' && (
                        <motion.div
                            key="sequence"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ height: '100%' }}
                        >
                            <SequenceGame onBack={handleBack} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx="true">{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Games;
