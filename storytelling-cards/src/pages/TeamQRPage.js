import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Users, Eye, Plus } from 'lucide-react';
import QRCode from 'qrcode.react';

const TeamQRPage = ({ selectedActivity, selectedLevel, onBack, onTeamsReady, teams, addTeam }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showTeams, setShowTeams] = useState(false);

  // Generate QR code URL for team joining
  useEffect(() => {
    const baseUrl = window.location.origin;
    const teamJoinUrl = `${baseUrl}/team-join?activity=${selectedActivity?.id}&level=${selectedLevel?.id}`;
    setQrCodeUrl(teamJoinUrl);
  }, [selectedActivity, selectedLevel]);

  const handleTeamsReady = () => {
    if (teams.length > 0) {
      onTeamsReady();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-4xl mx-auto">
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
            <QrCode className="inline-block mr-3" />
            Team QR Code
            <QrCode className="inline-block ml-3" />
          </motion.h1>
          
          <p className="text-lg text-white/90 mb-6">
            Display this QR code for teams to scan and join {selectedActivity?.name}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Scan to Join</h3>
              
              {/* QR Code */}
              <div className="bg-white rounded-xl p-4 inline-block mb-4">
                <QRCode 
                  value={qrCodeUrl}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              
              <p className="text-white/80 text-sm mb-4">
                Teams can scan this QR code to join the game
              </p>
              
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-white font-medium">Activity: {selectedActivity?.name}</p>
                <p className="text-white/80">Level: {selectedLevel?.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Teams Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Joined Teams</h3>
              <motion.button
                onClick={() => setShowTeams(!showTeams)}
                className="text-white hover:text-orange-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-6 h-6" />
              </motion.button>
            </div>

            {showTeams && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {teams.length === 0 ? (
                  <p className="text-white/60 text-center py-4">
                    No teams have joined yet. Display the QR code for teams to scan.
                  </p>
                ) : (
                  teams.map((team, index) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/20 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">{team.name}</p>
                        <p className="text-white/60 text-sm">
                          Joined {new Date(team.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="bg-green-500 rounded-full w-3 h-3"></div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-white/80 mb-4">
                {teams.length} team{teams.length !== 1 ? 's' : ''} joined
              </p>
              
              {teams.length > 0 && (
                <motion.button
                  onClick={handleTeamsReady}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
                    text-white font-semibold px-6 py-3 rounded-full shadow-xl
                    transform transition-all duration-300
                  "
                >
                  <Users className="inline-block mr-2" />
                  Start Game with Teams
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">Instructions for Teams</h3>
            <div className="text-white/80 space-y-2">
              <p>1. Teams scan the QR code with their phones</p>
              <p>2. Each team enters their team name</p>
              <p>3. Teams receive their unique set of cards</p>
              <p>4. Teacher can monitor all teams' progress</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamQRPage; 