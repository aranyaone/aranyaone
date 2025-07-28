'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Play, 
  Pause, 
  Square,
  Volume2,
  Download,
  Wand2,
  Settings,
  Mic,
  Piano,
  Guitar,
  Drum,
  Violin,
  Headphones,
  Radio,
  Disc,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Plus,
  Minus,
  Save
} from 'lucide-react';

const AIMusicComposer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('ambient');
  const [selectedInstruments, setSelectedInstruments] = useState(['piano']);

  const musicGenres = [
    { id: 'ambient', name: 'Ambient', description: 'Atmospheric soundscapes', color: 'from-blue-500 to-cyan-500' },
    { id: 'classical', name: 'Classical', description: 'Orchestral compositions', color: 'from-purple-500 to-indigo-500' },
    { id: 'jazz', name: 'Jazz', description: 'Smooth jazz rhythms', color: 'from-orange-500 to-red-500' },
    { id: 'electronic', name: 'Electronic', description: 'Digital soundscapes', color: 'from-green-500 to-teal-500' },
    { id: 'cinematic', name: 'Cinematic', description: 'Epic movie scores', color: 'from-red-500 to-pink-500' },
    { id: 'lofi', name: 'Lo-Fi', description: 'Chill hip-hop beats', color: 'from-yellow-500 to-orange-500' }
  ];

  const instruments = [
    { id: 'piano', name: 'Piano', icon: Piano, category: 'Keys' },
    { id: 'guitar', name: 'Guitar', icon: Guitar, category: 'Strings' },
    { id: 'violin', name: 'Violin', icon: Violin, category: 'Strings' },
    { id: 'drums', name: 'Drums', icon: Drum, category: 'Percussion' },
    { id: 'voice', name: 'Voice', icon: Mic, category: 'Vocal' },
    { id: 'synth', name: 'Synthesizer', icon: Radio, category: 'Electronic' }
  ];

  const aiFeatures = [
    {
      title: 'Melody Generation',
      description: 'AI creates unique melodies based on your style',
      icon: Music,
      active: true
    },
    {
      title: 'Harmony Assistant',
      description: 'Intelligent chord progressions and harmonies',
      icon: Piano,
      active: true
    },
    {
      title: 'Rhythm Engine',
      description: 'Dynamic rhythm patterns and beat generation',
      icon: Drum,
      active: true
    },
    {
      title: 'Audio Mastering',
      description: 'Professional mixing and mastering',
      icon: Headphones,
      active: false
    }
  ];

  const generateMusic = async () => {
    setIsGenerating(true);
    
    // Simulate AI music generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentTrack({
        title: `AI Generated ${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}`,
        duration: '3:24',
        genre: selectedGenre,
        instruments: selectedInstruments
      });
    }, 4000);
  };

  const toggleInstrument = (instrumentId) => {
    setSelectedInstruments(prev => 
      prev.includes(instrumentId)
        ? prev.filter(id => id !== instrumentId)
        : [...prev, instrumentId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Music className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              AI Music Composer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create original music with artificial intelligence. Generate melodies, harmonies, 
              and complete compositions in any genre with professional quality.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Music Generation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Create Your Music</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Genre Selection */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Choose Genre</h4>
              <div className="grid grid-cols-2 gap-3">
                {musicGenres.map((genre) => (
                  <motion.button
                    key={genre.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGenre(genre.id)}
                    className={`p-4 rounded-lg transition-all ${
                      selectedGenre === genre.id
                        ? `bg-gradient-to-r ${genre.color} text-white`
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium">{genre.name}</div>
                      <div className="text-xs opacity-75">{genre.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Generation Settings */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Song Length</label>
                  <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none">
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="120">2 minutes</option>
                    <option value="180">3 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Mood</label>
                  <select className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none">
                    <option value="happy">Happy & Uplifting</option>
                    <option value="calm">Calm & Peaceful</option>
                    <option value="energetic">Energetic & Dynamic</option>
                    <option value="dramatic">Dramatic & Intense</option>
                    <option value="mysterious">Mysterious & Dark</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Instrument Selection */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Select Instruments</h4>
              <div className="space-y-3">
                {instruments.map((instrument) => {
                  const IconComponent = instrument.icon;
                  const isSelected = selectedInstruments.includes(instrument.id);
                  
                  return (
                    <motion.button
                      key={instrument.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInstrument(instrument.id)}
                      className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{instrument.name}</div>
                        <div className="text-xs opacity-75">{instrument.category}</div>
                      </div>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateMusic}
                disabled={isGenerating}
                className="w-full mt-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Settings className="w-5 h-5" />
                    </motion.div>
                    Generating Music...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate AI Music
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Music Player */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-800 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Generated Track</h3>
            
            <div className="bg-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Disc className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{currentTrack.title}</h4>
                  <p className="text-gray-400">Duration: {currentTrack.duration}</p>
                  <p className="text-gray-400">Instruments: {currentTrack.instruments.join(', ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                    <Save className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isPlaying ? '45%' : '0%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1:23</span>
                  <span>3:24</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            AI Music Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-6 rounded-xl transition-all ${
                    feature.active 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-slate-800 text-gray-300'
                  }`}
                >
                  <IconComponent className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm opacity-90">{feature.description}</p>
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      feature.active ? 'bg-white/20' : 'bg-gray-600'
                    }`}>
                      {feature.active ? 'ACTIVE' : 'COMING SOON'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Professional Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Professional Music Studio
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Create professional-quality music with AI assistance. Export high-quality audio files 
            and share your compositions with the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Upgrade to Pro
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              View Examples
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIMusicComposer;
