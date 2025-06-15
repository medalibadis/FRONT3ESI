import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, PenTool, Brain, Heart } from 'lucide-react';

const ActivitySelectionPage = ({ onSelectActivity, onBack }) => {
    const activities = [
        {
            id: 'storytelling-cards',
            name: 'Storytelling Cards',
            description: 'Create amazing stories using randomly generated symbols',
            icon: Sparkles,
            color: 'from-purple-400 to-purple-600',
            category: 'Creative Writing',
            difficulty: 'All Levels',
            duration: '5-15 min'
        }
        // More activities can be added here in the future
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="min-h-screen p-4"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
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
                        <BookOpen className="inline-block mr-3" />
                        Select Activity
                        <BookOpen className="inline-block ml-3" />
                    </motion.h1>

                    <p className="text-lg text-white/90 mb-6">
                        Choose an activity to start your learning journey
                    </p>
                </div>

                {/* Activities Grid */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {activities.map((activity, index) => {
                        const IconComponent = activity.icon;
                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectActivity(activity)}
                                className={`
                  bg-gradient-to-br ${activity.color} rounded-2xl p-8 cursor-pointer
                  shadow-xl border border-white/20 text-white
                  hover:shadow-2xl transition-all duration-300
                  relative overflow-hidden
                `}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/30 rounded-full"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-white/20 rounded-xl p-4">
                                            <IconComponent className="w-12 h-12" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-2">{activity.name}</h3>
                                            <p className="text-white/90 mb-4">{activity.description}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                                    {activity.category}
                                                </span>
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                                    {activity.difficulty}
                                                </span>
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                                    {activity.duration}
                                                </span>
                                            </div>

                                            <div className="flex items-center text-white/80">
                                                <PenTool className="w-4 h-4 mr-1" />
                                                <span className="text-sm">Creative Writing</span>
                                                <Brain className="w-4 h-4 ml-4 mr-1" />
                                                <span className="text-sm">Critical Thinking</span>
                                                <Heart className="w-4 h-4 ml-4 mr-1" />
                                                <span className="text-sm">Imagination</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default ActivitySelectionPage; 