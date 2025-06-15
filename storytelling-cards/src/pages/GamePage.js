import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles } from 'lucide-react';
import StoryCard from '../components/StoryCard';
import { symbols } from '../data/symbols';

const GamePage = ({ selectedActivity, selectedLevel, onBack }) => {
    const [cards, setCards] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Generate cards based on selected level
    const generateRandomCards = () => {
        setIsGenerating(true);

        // Get card count based on level
        const { min, max } = selectedLevel.cardRange;
        const cardCount = Math.floor(Math.random() * (max - min + 1)) + min;

        // Create a copy of symbols array and shuffle it properly
        const shuffledSymbols = [...symbols];

        // Enhanced Fisher-Yates shuffle with multiple passes for better randomization
        for (let pass = 0; pass < 3; pass++) {
            for (let i = shuffledSymbols.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledSymbols[i], shuffledSymbols[j]] = [shuffledSymbols[j], shuffledSymbols[i]];
            }
        }

        // Take only the required number of unique symbols
        const selectedSymbols = shuffledSymbols.slice(0, cardCount);

        // Double-check for uniqueness by symbol
        const uniqueSymbols = [];
        const seenSymbols = new Set();

        for (const symbol of selectedSymbols) {
            if (!seenSymbols.has(symbol.symbol)) {
                seenSymbols.add(symbol.symbol);
                uniqueSymbols.push(symbol);
            }
        }

        // If we don't have enough unique symbols, add more from the shuffled array
        if (uniqueSymbols.length < cardCount) {
            for (const symbol of shuffledSymbols) {
                if (uniqueSymbols.length >= cardCount) break;
                if (!seenSymbols.has(symbol.symbol)) {
                    seenSymbols.add(symbol.symbol);
                    uniqueSymbols.push(symbol);
                }
            }
        }

        // Add random positions and properties
        const newCards = uniqueSymbols.map((symbol, index) => ({
            ...symbol,
            id: Date.now() + index + Math.random(), // Ensure unique IDs
            color: 'white',
            rotation: Math.random() * 10 - 5,
            delay: index * 0.05,
        }));

        setCards(newCards);

        // Reset generating state after animation
        setTimeout(() => setIsGenerating(false), 500);
    };

    // Calculate grid layout based on number of cards
    const getGridLayout = () => {
        if (cards.length === 0) return 'grid-cols-2';

        const layouts = {
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-2',
            6: 'grid-cols-3',
            7: 'grid-cols-4',
            8: 'grid-cols-4',
            9: 'grid-cols-3',
            12: 'grid-cols-4',
            15: 'grid-cols-5',
            16: 'grid-cols-4',
        };

        return layouts[cards.length] || 'grid-cols-3';
    };

    // Generate initial cards on component mount
    useEffect(() => {
        generateRandomCards();
    }, [selectedLevel]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen p-4"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 pt-6">
                    <motion.button
                        onClick={onBack}
                        className="absolute top-6 left-6 text-white hover:text-orange-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ← Back
                    </motion.button>

                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(255,255,255,0.5)",
                                "0 0 30px rgba(255,255,255,0.7)",
                                "0 0 20px rgba(255,255,255,0.5)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="inline-block mr-3 animate-pulse" />
                        {selectedActivity?.name}
                        <Sparkles className="inline-block ml-3 animate-pulse" />
                    </motion.h1>

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="bg-white/20 px-4 py-2 rounded-full text-white">
                            {selectedLevel?.name}
                        </span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-white">
                            {cards.length} Cards
                        </span>
                    </div>

                    {/* Randomize Button */}
                    <motion.button
                        onClick={generateRandomCards}
                        disabled={isGenerating}
                        className={`
              relative px-6 py-3 rounded-full text-white font-semibold text-base
              bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600
              transform hover:scale-105 transition-all duration-300 shadow-xl
              ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
            `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shuffle className="inline-block mr-2" />
                        {isGenerating ? 'Generating...' : 'Generate New Cards'}

                        {/* Simple animated background */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-0"
                            animate={{
                                opacity: isGenerating ? [0, 0.3, 0] : 0,
                                scale: isGenerating ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.8, repeat: isGenerating ? Infinity : 0 }}
                        />
                    </motion.button>
                </div>

                {/* Cards Container - Grid Layout */}
                <motion.div
                    className={`grid ${getGridLayout()} gap-3 justify-items-center max-w-4xl mx-auto`}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 30
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: -30
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: card.delay,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                className="flex-shrink-0"
                            >
                                <StoryCard card={card} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Level Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {selectedLevel?.name} - {selectedLevel?.description}
                        </h3>
                        <p className="text-white/80">
                            Use these {cards.length} symbols to create an amazing story.
                            Each symbol represents a different element in your narrative.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GamePage; 