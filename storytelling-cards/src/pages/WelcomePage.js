import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, BookOpen } from 'lucide-react';

const WelcomePage = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* School Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Welcome Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          <Sparkles className="inline-block mr-3 animate-pulse" />
          Welcome to MySchool Activities
          <Sparkles className="inline-block ml-3 animate-pulse" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
        >
          Discover fun and educational activities designed to enhance your learning experience
        </motion.p>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="
            bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600
            text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl
            transform transition-all duration-300 hover:shadow-3xl
            border-2 border-white/20
          "
        >
          <BookOpen className="inline-block mr-3" />
          Select Activity
          <BookOpen className="inline-block ml-3" />
        </motion.button>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default WelcomePage; 