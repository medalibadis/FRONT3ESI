import React from 'react';
import { motion } from 'framer-motion';

const StoryCard = ({ card }) => {
    const { symbol, rotation } = card;

    return (
        <motion.div
            className="relative w-32 h-40 rounded-xl p-3 cursor-pointer bg-white shadow-lg border border-gray-200 card-flip"
            style={{
                transform: `rotate(${rotation}deg)`,
            }}
            whileHover={{
                scale: 1.05,
                z: 10
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
        >
            {/* Card Content - Only Symbol */}
            <div className="relative z-10 h-full flex items-center justify-center">
                {/* Symbol */}
                <motion.div
                    className="text-4xl"
                    animate={{
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {symbol}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default StoryCard; 