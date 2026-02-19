import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const SequenceGame = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShowingSequence, setIsShowingSequence] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('sequenceHighScore')) || 0;
    });
    const [message, setMessage] = useState('PRESS_START');
    const [activeBtn, setActiveBtn] = useState(null); // Which button is currently lit up

    // Grid size 3x3
    const buttons = Array.from({ length: 9 }, (_, i) => i);

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setScore(0);
        setIsPlaying(true);
        setMessage('WATCH_SEQUENCE');
        addToSequence([]);
    };

    const addToSequence = (currentSeq) => {
        const nextBtn = Math.floor(Math.random() * 9);
        const newSeq = [...currentSeq, nextBtn];
        setSequence(newSeq);
        setUserSequence([]);
        setIsShowingSequence(true);
        playSequence(newSeq);
    };

    const playSequence = async (seq) => {
        setMessage('MEMORIZING_PATTERN...');
        // Small delay before starting
        await new Promise(r => setTimeout(r, 500));

        for (let i = 0; i < seq.length; i++) {
            setActiveBtn(seq[i]);
            // Play sound here if possible
            await new Promise(r => setTimeout(r, 600)); // Light up duration
            setActiveBtn(null);
            await new Promise(r => setTimeout(r, 200)); // Gap between lights
        }

        setIsShowingSequence(false);
        setMessage('REPLICATE_PATTERN');
    };

    const handleBtnClick = (index) => {
        if (!isPlaying || isShowingSequence) return;

        // Visual feedback
        setActiveBtn(index);
        setTimeout(() => setActiveBtn(null), 200);

        const newUserSequence = [...userSequence, index];
        setUserSequence(newUserSequence);

        // Check input
        if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
            // Wrong button
            endGame();
            return;
        }

        // Sequence complete?
        if (newUserSequence.length === sequence.length) {
            setScore(prev => prev + 1);
            if (score + 1 > highScore) {
                setHighScore(score + 1);
                localStorage.setItem('sequenceHighScore', (score + 1).toString());
            }
            setMessage('SEQUENCE_ACCEPTED');
            setTimeout(() => {
                addToSequence(sequence);
            }, 1000);
        }
    };

    const endGame = () => {
        setIsPlaying(false);
        setMessage('ACCESS_DENIED // GAME_OVER');
        setSequence([]);
    };

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
                color: '#00ff00',
                fontFamily: "'Courier New', monospace"
            }}
        >
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                cursor: 'pointer',
                border: '1px solid #00ff00',
                padding: '5px 10px',
                background: 'rgba(0, 255, 0, 0.1)'
            }} onClick={onBack}>
                &lt; ROOT_DIR
            </div>

            <h1 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                textShadow: '0 0 10px #00ff00'
            }}>{message}</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                padding: '20px',
                background: 'rgba(0, 20, 0, 0.8)',
                border: '1px solid #00ff00',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)'
            }}>
                {buttons.map((i) => (
                    <motion.button
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBtnClick(i)}
                        style={{
                            width: '80px',
                            height: '80px',
                            background: activeBtn === i
                                ? '#00ff00'
                                : 'rgba(0, 50, 0, 0.5)',
                            border: '1px solid #00ff00',
                            borderRadius: '5px',
                            cursor: (isPlaying && !isShowingSequence) ? 'pointer' : 'default',
                            boxShadow: activeBtn === i ? '0 0 20px #00ff00' : 'none',
                            transition: 'background 0.1s',
                            outline: 'none'
                        }}
                    />
                ))}
            </div>

            <div style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '2rem',
                fontSize: '1.2rem'
            }}>
                <div>SCORE: {score}</div>
                <div>HIGH_SCORE: {highScore}</div>
            </div>

            <button
                onClick={startGame}
                disabled={isPlaying}
                style={{
                    marginTop: '2rem',
                    padding: '10px 30px',
                    background: isPlaying ? 'transparent' : '#00ff00',
                    color: isPlaying ? '#004400' : '#000',
                    border: '1px solid #00ff00',
                    fontSize: '1.2rem',
                    fontFamily: 'inherit',
                    fontWeight: 'bold',
                    cursor: isPlaying ? 'not-allowed' : 'pointer',
                    opacity: isPlaying ? 0.5 : 1
                }}
            >
                {isPlaying ? 'RUNNING...' : 'START_SEQUENCE'}
            </button>
        </motion.div>
    );
};

export default SequenceGame;
