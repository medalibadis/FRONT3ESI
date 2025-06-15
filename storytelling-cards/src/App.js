import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Star, Zap, Target, Users, QrCode, Eye } from 'lucide-react';
import WelcomePage from './pages/WelcomePage';
import ActivitySelectionPage from './pages/ActivitySelectionPage';
import GamePage from './pages/GamePage';
import AdminGamePage from './pages/AdminGamePage';
import TeamQRPage from './pages/TeamQRPage';
import TeamGamePage from './pages/TeamGamePage';
import TeamsOverviewPage from './pages/TeamsOverviewPage';

function App() {
    const [currentPage, setCurrentPage] = useState('welcome');
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [gameMode, setGameMode] = useState(null); // 'class' or 'teams'
    const [teams, setTeams] = useState([]);
    const [qrCodeData, setQrCodeData] = useState(null);

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
        setCurrentPage('levels');
    };

    const selectLevel = (level) => {
        setSelectedLevel(level);
        setCurrentPage('gameMode');
    };

    const selectGameMode = (mode) => {
        setGameMode(mode);
        if (mode === 'class') {
            setCurrentPage('game');
        } else if (mode === 'teams') {
            setCurrentPage('teamQR');
        }
    };

    const goBack = () => {
        if (currentPage === 'game') {
            setCurrentPage('gameMode');
            setGameMode(null);
        } else if (currentPage === 'teamQR') {
            setCurrentPage('gameMode');
            setGameMode(null);
        } else if (currentPage === 'teamsOverview') {
            setCurrentPage('teamQR');
        } else if (currentPage === 'teamGame') {
            setCurrentPage('teamsOverview');
        } else if (currentPage === 'gameMode') {
            setCurrentPage('levels');
            setSelectedLevel(null);
        } else if (currentPage === 'levels') {
            setCurrentPage('activities');
            setSelectedActivity(null);
        } else if (currentPage === 'activities') {
            setCurrentPage('welcome');
        }
    };

    const addTeam = (teamName) => {
        const newTeam = {
            id: Date.now(),
            name: teamName,
            cards: [],
            createdAt: new Date().toISOString()
        };
        setTeams([...teams, newTeam]);
    };

    const updateTeamCards = (teamId, cards) => {
        setTeams(teams.map(team =>
            team.id === teamId ? { ...team, cards } : team
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-story-orange to-story-orange-dark">
            <AnimatePresence mode="wait">
                {currentPage === 'welcome' && (
                    <WelcomePage
                        key="welcome"
                        onStart={() => navigateTo('activities')}
                    />
                )}

                {currentPage === 'activities' && (
                    <ActivitySelectionPage
                        key="activities"
                        onSelectActivity={selectActivity}
                        onBack={goBack}
                    />
                )}

                {currentPage === 'levels' && (
                    <LevelsPage
                        key="levels"
                        selectedActivity={selectedActivity}
                        onSelectLevel={selectLevel}
                        onBack={goBack}
                    />
                )}

                {currentPage === 'gameMode' && (
                    <GameModePage
                        key="gameMode"
                        selectedActivity={selectedActivity}
                        selectedLevel={selectedLevel}
                        onSelectGameMode={selectGameMode}
                        onBack={goBack}
                    />
                )}

                {currentPage === 'game' && (
                    <GamePage
                        key="game"
                        selectedActivity={selectedActivity}
                        selectedLevel={selectedLevel}
                        onBack={goBack}
                    />
                )}

                {currentPage === 'teamQR' && (
                    <TeamQRPage
                        key="teamQR"
                        selectedActivity={selectedActivity}
                        selectedLevel={selectedLevel}
                        onBack={goBack}
                        onTeamsReady={() => setCurrentPage('teamsOverview')}
                        teams={teams}
                        addTeam={addTeam}
                    />
                )}

                {currentPage === 'teamsOverview' && (
                    <TeamsOverviewPage
                        key="teamsOverview"
                        teams={teams}
                        selectedActivity={selectedActivity}
                        selectedLevel={selectedLevel}
                        onBack={goBack}
                        onViewTeam={(team) => {
                            setCurrentPage('teamGame');
                            setQrCodeData({ team, selectedActivity, selectedLevel });
                        }}
                    />
                )}

                {currentPage === 'teamGame' && (
                    <TeamGamePage
                        key="teamGame"
                        team={qrCodeData?.team}
                        selectedActivity={qrCodeData?.selectedActivity}
                        selectedLevel={qrCodeData?.selectedLevel}
                        onBack={goBack}
                        onUpdateCards={(cards) => updateTeamCards(qrCodeData.team.id, cards)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Levels Page Component
function LevelsPage({ selectedActivity, onSelectLevel, onBack }) {
    const levels = [
        {
            id: 'easy',
            name: 'Level 1 - Easy',
            description: '2-4 cards for beginners',
            icon: Star,
            color: 'from-green-400 to-green-600',
            cardRange: { min: 2, max: 4 }
        },
        {
            id: 'medium',
            name: 'Level 2 - Medium',
            description: '6-9 cards for intermediate',
            icon: Zap,
            color: 'from-yellow-400 to-yellow-600',
            cardRange: { min: 6, max: 9 }
        },
        {
            id: 'hard',
            name: 'Level 3 - Hard',
            description: '12-16 cards for advanced',
            icon: Target,
            color: 'from-red-400 to-red-600',
            cardRange: { min: 12, max: 16 }
        }
    ];

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
                        <BookOpen className="inline-block mr-3" />
                        Select Level
                        <BookOpen className="inline-block ml-3" />
                    </motion.h1>

                    <p className="text-lg text-white/90 mb-6">
                        Choose your difficulty level for {selectedActivity?.name}
                    </p>
                </div>

                {/* Levels Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {levels.map((level, index) => {
                        const IconComponent = level.icon;
                        return (
                            <motion.div
                                key={level.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelectLevel(level)}
                                className={`
                                    bg-gradient-to-br ${level.color} rounded-2xl p-6 cursor-pointer
                                    shadow-xl border border-white/20 text-white
                                    hover:shadow-2xl transition-all duration-300
                                `}
                            >
                                <div className="text-center">
                                    <IconComponent className="w-16 h-16 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                                    <p className="text-white/90">{level.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

// Game Mode Selection Page
function GameModePage({ selectedActivity, selectedLevel, onSelectGameMode, onBack }) {
    const gameModes = [
        {
            id: 'class',
            name: 'Class Mode',
            description: 'Display cards for the entire class',
            icon: BookOpen,
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 'teams',
            name: 'Team Mode',
            description: 'Generate QR codes for team participation',
            icon: Users,
            color: 'from-purple-400 to-purple-600'
        }
    ];

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
                        <Users className="inline-block mr-3" />
                        Select Game Mode
                        <Users className="inline-block ml-3" />
                    </motion.h1>

                    <p className="text-lg text-white/90 mb-6">
                        Choose how you want to run {selectedActivity?.name} for {selectedLevel?.name}
                    </p>
                </div>

                {/* Game Modes Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {gameModes.map((mode, index) => {
                        const IconComponent = mode.icon;
                        return (
                            <motion.div
                                key={mode.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelectGameMode(mode.id)}
                                className={`
                                    bg-gradient-to-br ${mode.color} rounded-2xl p-8 cursor-pointer
                                    shadow-xl border border-white/20 text-white
                                    hover:shadow-2xl transition-all duration-300
                                `}
                            >
                                <div className="text-center">
                                    <IconComponent className="w-20 h-20 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold mb-3">{mode.name}</h3>
                                    <p className="text-white/90 text-lg">{mode.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default App; 