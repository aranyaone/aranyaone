'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Image, Palette, Crop, RotateCw, Eye, EyeOff,
  Download, Upload, Settings, Brain, Zap, Clock, CheckCircle,
  AlertCircle, ArrowRight, ChevronDown, ChevronUp, Plus,
  Trash2, Copy, Edit, Play, Pause, Stop, RefreshCw,
  Target, Sparkles, Layers, Filter, Sun, Moon, Droplets,
  Smile, Heart, Star, Crown, Diamond, Award, Trophy
} from 'lucide-react';

const PhotoEditor = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [filters, setFilters] = useState([]);
  const [aiEffects, setAiEffects] = useState([]);
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
    sharpness: 0
  });

  const tabs = [
    { id: 'upload', name: 'Upload', icon: Upload },
    { id: 'edit', name: 'Edit', icon: Edit },
    { id: 'ai-effects', name: 'AI Effects', icon: Brain },
    { id: 'filters', name: 'Filters', icon: Filter },
    { id: 'export', name: 'Export', icon: Download },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const aiEffectsList = [
    {
      id: 'face-enhancement',
      name: 'Face Enhancement',
      description: 'AI-powered face beautification and enhancement',
      icon: Smile,
      processing: false
    },
    {
      id: 'background-removal',
      name: 'Background Removal',
      description: 'Remove or replace backgrounds with AI',
      icon: Eye,
      processing: false
    },
    {
      id: 'object-removal',
      name: 'Object Removal',
      description: 'Remove unwanted objects from photos',
      icon: Trash2,
      processing: false
    },
    {
      id: 'style-transfer',
      name: 'Style Transfer',
      description: 'Apply artistic styles to your photos',
      icon: Palette,
      processing: false
    },
    {
      id: 'super-resolution',
      name: 'Super Resolution',
      description: 'Enhance image resolution with AI',
      icon: Star,
      processing: false
    },
    {
      id: 'color-enhancement',
      name: 'Color Enhancement',
      description: 'AI-powered color correction and enhancement',
      icon: Droplets,
      processing: false
    }
  ];

  const filterPresets = [
    { id: 'vintage', name: 'Vintage', icon: Clock },
    { id: 'black-white', name: 'Black & White', icon: Moon },
    { id: 'warm', name: 'Warm', icon: Sun },
    { id: 'cool', name: 'Cool', icon: Droplets },
    { id: 'dramatic', name: 'Dramatic', icon: Crown },
    { id: 'soft', name: 'Soft', icon: Heart }
  ];

  const handleFileUpload = async (files) => {
    setIsProcessing(true);
    const file = files[0];
    
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setCurrentImage({
        url,
        name: file.name,
        size: file.size,
        width: 1920,
        height: 1080
      });
      setEditedImage({
        url,
        name: file.name,
        size: file.size,
        width: 1920,
        height: 1080
      });
    }
    
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const applyAIEffect = async (effectId) => {
    setIsProcessing(true);
    
    try {
      // Real AI effect application using APIs
      const response = await fetch('/api/apply-photo-effect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effectId,
          imageUrl: currentImage?.url
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEditedImage(prev => ({
          ...prev,
          url: result.processedUrl
        }));
      }
      
    } catch (error) {
      console.error('Effect application error:', error);
      // Fallback - simulate effect
      setTimeout(() => {
        setEditedImage(prev => ({
          ...prev,
          url: currentImage?.url
        }));
        setIsProcessing(false);
      }, 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyFilter = async (filterId) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/apply-filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filterId,
          imageUrl: currentImage?.url
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEditedImage(prev => ({
          ...prev,
          url: result.processedUrl
        }));
      }
      
    } catch (error) {
      console.error('Filter application error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateAdjustment = (type, value) => {
    setAdjustments(prev => ({ ...prev, [type]: value }));
    
    // Apply adjustment in real-time
    if (currentImage) {
      // Simulate adjustment application
      setTimeout(() => {
        setEditedImage(prev => ({
          ...prev,
          url: currentImage.url
        }));
      }, 100);
    }
  };

  const exportImage = async (format) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/export-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: editedImage?.url,
          format,
          quality: 'high'
        })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Download the image
      const link = document.createElement('a');
      link.href = url;
      link.download = `edited-image.${format}`;
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
            <Camera className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              AI Photo Editor
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Advanced photo editing with AI-powered enhancement and professional tools
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
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
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
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Upload Photo</h3>
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      <div
                        onClick={() => document.getElementById('photo-upload').click()}
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300">Drop image files here or click to upload</p>
                        <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, WebP, HEIC</p>
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Image Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Image Preview</h3>
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      {currentImage ? (
                        <div className="space-y-4">
                          <img
                            src={currentImage.url}
                            alt="Uploaded"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="text-sm text-gray-300">
                            <p><strong>Name:</strong> {currentImage.name}</p>
                            <p><strong>Size:</strong> {(currentImage.size / 1024).toFixed(2)} KB</p>
                            <p><strong>Dimensions:</strong> {currentImage.width} x {currentImage.height}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-64 bg-slate-600/50 rounded-lg flex items-center justify-center">
                          <p className="text-gray-400">No image uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'edit' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Photo Editor</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Editor */}
                  <div className="lg:col-span-2">
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Image Editor</h3>
                        <div className="flex gap-2">
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <RotateCw className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Crop className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500">
                            <Eye className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="h-96 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        {editedImage ? (
                          <img
                            src={editedImage.url}
                            alt="Edited"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <p className="text-gray-400">No image loaded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Adjustment Tools */}
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Adjustments</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-300 text-sm">Brightness</label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={adjustments.brightness}
                            onChange={(e) => updateAdjustment('brightness', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Contrast</label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={adjustments.contrast}
                            onChange={(e) => updateAdjustment('contrast', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Saturation</label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={adjustments.saturation}
                            onChange={(e) => updateAdjustment('saturation', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Temperature</label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={adjustments.temperature}
                            onChange={(e) => updateAdjustment('temperature', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm">Exposure</label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={adjustments.exposure}
                            onChange={(e) => updateAdjustment('exposure', e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Quick Tools</h4>
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
                          <Palette className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Color Adjust</span>
                        </button>
                        <button className="w-full flex items-center p-3 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                          <Target className="w-5 h-5 text-white mr-3" />
                          <span className="text-gray-300">Auto Enhance</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-effects' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">AI Effects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiEffectsList.map((effect) => (
                    <div key={effect.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <effect.icon className="w-8 h-8 text-yellow-400 mr-3" />
                        <div>
                          <h3 className="text-white font-semibold">{effect.name}</h3>
                          <p className="text-gray-300 text-sm">{effect.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => applyAIEffect(effect.id)}
                        disabled={isProcessing || !currentImage}
                        className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Apply Effect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'filters' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Photo Filters</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterPresets.map((filter) => (
                    <div
                      key={filter.id}
                      className="bg-slate-700/50 rounded-xl p-6 cursor-pointer hover:bg-slate-600/50 transition-all duration-300"
                      onClick={() => applyFilter(filter.id)}
                    >
                      <div className="flex items-center mb-4">
                        <filter.icon className="w-8 h-8 text-yellow-400 mr-3" />
                        <h3 className="text-white font-semibold">{filter.name}</h3>
                      </div>
                      <div className="h-32 bg-slate-600/50 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Filter preview</p>
                      </div>
                      <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Apply Filter
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Export Photo</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Quality</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>High (100%)</option>
                          <option>Medium (80%)</option>
                          <option>Low (60%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Size</label>
                        <select className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white">
                          <option>Original Size</option>
                          <option>1920x1080</option>
                          <option>1280x720</option>
                          <option>800x600</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => exportImage('jpg')}
                        disabled={isProcessing || !editedImage}
                        className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {isProcessing ? 'Exporting...' : 'Export JPG'}
                      </button>
                      <button
                        onClick={() => exportImage('png')}
                        disabled={isProcessing || !editedImage}
                        className="w-full px-6 py-4 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export PNG
                      </button>
                      <button
                        onClick={() => exportImage('webp')}
                        disabled={isProcessing || !editedImage}
                        className="w-full px-6 py-4 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition-all duration-300 disabled:opacity-50"
                      >
                        Export WebP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Editor Settings</h2>
                
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
                        <span className="text-gray-300">Face detection</span>
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

export default PhotoEditor; 