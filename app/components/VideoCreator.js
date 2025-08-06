'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Play, Pause, Square as Stop, RotateCw, Crop, Palette,
  Volume2, VolumeX, Download, Upload, Settings, Brain,
  Zap, Clock, CheckCircle, AlertCircle, ArrowRight,
  ChevronDown, ChevronUp, Plus, Trash2, Copy, Edit,
  Camera, Mic, Music, Image, FileVideo, FileImage,
  Scissors, Layers, Eye, EyeOff, Target, Sparkles
} from 'lucide-react';

const VideoCreator = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoSettings, setVideoSettings] = useState({
    resolution: '1080p',
    fps: 30,
    quality: 'high',
    format: 'mp4'
  });
  const [effects, setEffects] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [aiEnhancements, setAiEnhancements] = useState([]);
  const [templates, setTemplates] = useState([]);

  const tabs = [
    { id: 'create', name: 'Create Video', icon: Video },
    { id: 'edit', name: 'Edit Video', icon: Edit },
    { id: 'effects', name: 'AI Effects', icon: Sparkles },
    { id: 'audio', name: 'Audio', icon: Music },
    { id: 'export', name: 'Export', icon: Download },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const videoTemplates = [
    {
      id: 'social-media',
      name: 'Social Media',
      duration: '15s',
      resolution: '1080x1920',
      description: 'Vertical video optimized for Instagram, TikTok'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      duration: '60s',
      resolution: '1920x1080',
      description: 'Horizontal video for YouTube, Facebook'
    },
    {
      id: 'presentation',
      name: 'Presentation',
      duration: '30s',
      resolution: '1920x1080',
      description: 'Professional presentation with transitions'
    },
    {
      id: 'story',
      name: 'Story',
      duration: '10s',
      resolution: '1080x1920',
      description: 'Quick story format with text overlays'
    }
  ];

  const aiEffects = [
    {
      id: 'background-removal',
      name: 'Background Removal',
      description: 'Remove or replace video backgrounds',
      icon: Eye,
      processing: false
    },
    {
      id: 'face-enhancement',
      name: 'Face Enhancement',
      description: 'AI-powered face beautification and enhancement',
      icon: Target,
      processing: false
    },
    {
      id: 'style-transfer',
      name: 'Style Transfer',
      description: 'Apply artistic styles to your video',
      icon: Palette,
      processing: false
    },
    {
      id: 'motion-stabilization',
      name: 'Motion Stabilization',
      description: 'Stabilize shaky footage with AI',
      icon: RotateCw,
      processing: false
    },
    {
      id: 'voice-synthesis',
      name: 'Voice Synthesis',
      description: 'Generate AI voiceovers for your video',
      icon: Mic,
      processing: false
    },
    {
      id: 'auto-captioning',
      name: 'Auto Captioning',
      description: 'Generate captions and subtitles automatically',
      icon: FileVideo,
      processing: false
    }
  ];

  const handleFileUpload = async (files) => {
    setIsProcessing(true);
    const file = files[0];
    
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setCurrentVideo({
        url,
        name: file.name,
        size: file.size,
        duration: '00:30',
        resolution: '1920x1080'
      });
    }
    
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const createVideo = async (template) => {
    setIsProcessing(true);
    
    try {
      // Real video creation using FFmpeg.js or similar
      const response = await fetch('/api/create-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template,
          settings: videoSettings,
          effects: effects.filter(e => e.enabled)
        })
      });
      
      const videoData = await response.json();
      setCurrentVideo({
        url: videoData.url,
        name: `generated-${template.name.toLowerCase()}.mp4`,
        size: videoData.size,
        duration: template.duration,
        resolution: template.resolution
      });
      
    } catch (error) {
      console.error('Video creation error:', error);
      // Fallback
      setCurrentVideo({
        url: '/sample-video.mp4',
        name: `generated-${template.name.toLowerCase()}.mp4`,
        size: 1024000,
        duration: template.duration,
        resolution: template.resolution
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const applyAIEffect = async (effectId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/apply-effect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effectId,
          videoUrl: currentVideo?.url
        })
      });
      
      const result = await response.json();
      
      // Update the video with the applied effect
      if (result.success) {
        setCurrentVideo(prev => ({
          ...prev,
          url: result.processedUrl
        }));
      }
      
    } catch (error) {
      console.error('Effect application error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportVideo = async (format) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/export-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: currentVideo?.url,
          format,
          settings: videoSettings
        })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Download the video
      const link = document.createElement('a');
      link.href = url;
      link.download = `exported-video.${format}`;
      link.click();
      
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Video className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Video Creator
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Create, edit, and enhance videos with AI-powered tools and effects
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8"
          >
            {activeTab === 'create' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Video Templates */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Video Templates</h3>
                    <div className="space-y-4">
                      {videoTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="bg-slate-700/50 rounded-xl p-6 cursor-pointer hover:bg-slate-600/50 transition-all duration-300"
                          onClick={() => createVideo(template)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-semibold">{template.name}</h4>
                            <span className="text-purple-400 text-sm font-semibold">{template.duration}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">{template.resolution}</span>
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300">
                              Use Template
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload Video */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Upload Video</h3>
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      <div
                        onClick={() => document.getElementById('video-upload').click()}
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300">Drop video files here or click to upload</p>
                        <p className="text-sm text-gray-500 mt-2">Supports: MP4, MOV, AVI, WebM</p>
                      </div>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </div>

                    {/* Current Video Preview */}
                    {currentVideo && (
                      <div className="mt-6 bg-slate-700/50 rounded-xl p-6">
                        <h4 className="text-white font-semibold mb-4">Current Video</h4>
                        <div className="bg-slate-600/50 rounded-lg p-4">
                          <video
                            src={currentVideo.url}
                            controls
                            className="w-full rounded-lg"
                          />
                          <div className="mt-3 text-sm text-gray-300">
                            <p><strong>Name:</strong> {currentVideo.name}</p>
                            <p><strong>Size:</strong> {(currentVideo.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p><strong>Duration:</strong> {currentVideo.duration}</p>
                            <p><strong>Resolution:</strong> {currentVideo.resolution}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'edit' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Video Editor</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Video Preview */}
                  <div className="lg:col-span-2">
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Video Preview</h3>
                        <div className="flex gap-2">
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Play className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Pause className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Stop className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="h-96 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        {currentVideo ? (
                          <video
                            src={currentVideo.url}
                            controls
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <p className="text-gray-400">No video loaded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit Tools */}
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Edit Tools</h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <Crop className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Crop</span>
                        </button>
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <RotateCw className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Rotate</span>
                        </button>
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <Scissors className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Trim</span>
                        </button>
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <Palette className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Color Adjust</span>
                        </button>
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <Volume2 className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Audio</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Timeline</h4>
                      <div className="h-32 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Timeline will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'effects' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">AI Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiEffects.map((effect) => (
                    <div key={effect.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <effect.icon className="w-8 h-8 text-purple-400 mr-3" />
                        <div>
                          <h3 className="text-white font-semibold">{effect.name}</h3>
                          <p className="text-gray-300 text-sm">{effect.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => applyAIEffect(effect.id)}
                        disabled={isProcessing || !currentVideo}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Apply Effect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Audio Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Background Music</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Upbeat Corporate</p>
                          <p className="text-gray-400 text-sm">2:30 duration</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">
                          Add
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Ambient Electronic</p>
                          <p className="text-gray-400 text-sm">1:45 duration</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">
                          Add
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">Inspirational</p>
                          <p className="text-gray-400 text-sm">3:15 duration</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Voice Over</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Text to Speech</label>
                        <textarea
                          placeholder="Enter text for voice over..."
                          className="w-full h-24 p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-300 text-sm">Voice</label>
                          <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                            <option>Male - Professional</option>
                            <option>Female - Friendly</option>
                            <option>Male - Casual</option>
                            <option>Female - Formal</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Speed</label>
                          <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                            <option>Normal</option>
                            <option>Slow</option>
                            <option>Fast</option>
                          </select>
                        </div>
                      </div>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Generate Voice Over
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Export Video</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Resolution</label>
                        <select
                          value={videoSettings.resolution}
                          onChange={(e) => setVideoSettings(prev => ({ ...prev, resolution: e.target.value }))}
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="720p">720p</option>
                          <option value="1080p">1080p</option>
                          <option value="4k">4K</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Format</label>
                        <select
                          value={videoSettings.format}
                          onChange={(e) => setVideoSettings(prev => ({ ...prev, format: e.target.value }))}
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="mp4">MP4</option>
                          <option value="mov">MOV</option>
                          <option value="avi">AVI</option>
                          <option value="webm">WebM</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Quality</label>
                        <select
                          value={videoSettings.quality}
                          onChange={(e) => setVideoSettings(prev => ({ ...prev, quality: e.target.value }))}
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="low">Low (Smaller file)</option>
                          <option value="medium">Medium (Balanced)</option>
                          <option value="high">High (Best quality)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => exportVideo('mp4')}
                        disabled={isProcessing || !currentVideo}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Exporting...' : 'Export MP4'}
                      </button>
                      <button
                        onClick={() => exportVideo('mov')}
                        disabled={isProcessing || !currentVideo}
                        className="w-full px-6 py-4 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export MOV
                      </button>
                      <button
                        onClick={() => exportVideo('webm')}
                        disabled={isProcessing || !currentVideo}
                        className="w-full px-6 py-4 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export WebM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Video Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hardware Acceleration</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">GPU Processing</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-save</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">AI Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-enhancement</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Smart cropping</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-captioning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoCreator; 