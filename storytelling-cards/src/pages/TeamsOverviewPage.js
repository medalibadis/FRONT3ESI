import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Clock, Trophy } from 'lucide-react';

const TeamsOverviewPage = ({ teams, selectedActivity, selectedLevel, onBack, onViewTeam }) => {
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
            <Users className="inline-block mr-3" />
            Teams Overview
            <Users className="inline-block ml-3" />
          </motion.h1>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-white/20 px-4 py-2 rounded-full text-white">
              {selectedActivity?.name}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-white">
              {selectedLevel?.name}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-white">
              {teams.length} Teams
            </span>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                  <p className="text-white/60 text-sm">
                    Joined {new Date(team.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="bg-green-500 rounded-full w-3 h-3 mt-2"></div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-white/80">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {team.cards.length > 0 ? 'Has cards' : 'Waiting for cards'}
                  </span>
                </div>
                
                {team.cards.length > 0 && (
                  <div className="flex items-center text-white/80">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span className="text-sm">{team.cards.length} cards generated</span>
                  </div>
                )}
              </div>

              {/* Preview of cards */}
              {team.cards.length > 0 && (
                <div className="mb-4">
                  <p className="text-white/80 text-sm mb-2">Cards Preview:</p>
                  <div className="flex flex-wrap gap-1">
                    {team.cards.slice(0, 6).map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="w-8 h-8 bg-white rounded flex items-center justify-center text-xs"
                        title={card.name}
                      >
                        {card.symbol}
                      </div>
                    ))}
                    {team.cards.length > 6 && (
                      <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xs text-white">
                        +{team.cards.length - 6}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <motion.button
                onClick={() => onViewTeam(team)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                  text-white font-semibold py-3 rounded-xl shadow-lg
                  transform transition-all duration-300 flex items-center justify-center
                "
              >
                <Eye className="w-4 h-4 mr-2" />
                {team.cards.length > 0 ? 'View Cards' : 'Generate Cards'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">Game Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-white/80">
              <div>
                <p className="text-2xl font-bold text-white">{teams.length}</p>
                <p className="text-sm">Total Teams</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {teams.filter(team => team.cards.length > 0).length}
                </p>
                <p className="text-sm">Teams with Cards</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamsOverviewPage; 