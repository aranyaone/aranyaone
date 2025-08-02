"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, BookOpen, GraduationCap, Globe, Zap, 
  TrendingUp, Target, Crosshair, Radar, Satellite,
  Search, Filter, Download, Upload, Trash2, Edit3,
  Clock, Calendar, Star, Heart, Zap as ZapIcon,
  Play, Pause, RefreshCw, Settings, Activity,
  BarChart3, Layers, Cpu, HardDrive, Wifi, CheckCircle
} from 'lucide-react';

export default function AICyberLearning() {
  const [learningStatus, setLearningStatus] = useState('active');
  const [currentCourse, setCurrentCourse] = useState(null);
  const [learningProgress, setLearningProgress] = useState(0);

  const [universityCourses] = useState([
    {
      id: 'mit-cybersecurity',
      name: 'MIT Cybersecurity Engineering',
      university: 'Massachusetts Institute of Technology',
      level: 'Advanced',
      duration: '12 weeks',
      topics: ['Quantum Cryptography', 'AI Security', 'Network Defense'],
      progress: 85,
      status: 'in_progress'
    },
    {
      id: 'stanford-ai-security',
      name: 'Stanford AI Security & Privacy',
      university: 'Stanford University',
      level: 'Advanced',
      duration: '10 weeks',
      topics: ['AI Ethics', 'Privacy-Preserving ML', 'Adversarial AI'],
      progress: 92,
      status: 'completed'
    },
    {
      id: 'harvard-digital-forensics',
      name: 'Harvard Digital Forensics',
      university: 'Harvard University',
      level: 'Expert',
      duration: '8 weeks',
      topics: ['Forensic Analysis', 'Evidence Collection', 'Legal Compliance'],
      progress: 78,
      status: 'in_progress'
    },
    {
      id: 'berkeley-network-security',
      name: 'UC Berkeley Network Security',
      university: 'University of California, Berkeley',
      level: 'Advanced',
      duration: '14 weeks',
      topics: ['Network Protocols', 'DDoS Protection', 'Traffic Analysis'],
      progress: 95,
      status: 'completed'
    },
    {
      id: 'cmu-penetration-testing',
      name: 'CMU Penetration Testing',
      university: 'Carnegie Mellon University',
      level: 'Expert',
      duration: '6 weeks',
      topics: ['Ethical Hacking', 'Vulnerability Assessment', 'Exploit Development'],
      progress: 88,
      status: 'in_progress'
    },
    {
      id: 'georgia-tech-incident-response',
      name: 'Georgia Tech Incident Response',
      university: 'Georgia Institute of Technology',
      level: 'Advanced',
      duration: '10 weeks',
      topics: ['Incident Management', 'Threat Hunting', 'Response Automation'],
      progress: 91,
      status: 'completed'
    }
  ]);

  const [aiLearningModules] = useState([
    {
      id: 'threat-prediction',
      name: 'AI Threat Prediction',
      description: 'Advanced machine learning for threat prediction',
      accuracy: '99.7%',
      learning_rate: 'continuous',
      status: 'active'
    },
    {
      id: 'behavioral-analysis',
      name: 'Behavioral Pattern Analysis',
      description: 'Deep learning for user behavior analysis',
      accuracy: '99.5%',
      learning_rate: 'adaptive',
      status: 'active'
    },
    {
      id: 'anomaly-detection',
      name: 'Anomaly Detection AI',
      description: 'Neural networks for anomaly detection',
      accuracy: '99.8%',
      learning_rate: 'real-time',
      status: 'active'
    },
    {
      id: 'malware-classification',
      name: 'Malware Classification AI',
      description: 'AI-powered malware classification',
      accuracy: '99.9%',
      learning_rate: 'continuous',
      status: 'active'
    },
    {
      id: 'network-analysis',
      name: 'Network Traffic Analysis',
      description: 'AI for network traffic analysis',
      accuracy: '99.6%',
      learning_rate: 'adaptive',
      status: 'active'
    },
    {
      id: 'forensic-ai',
      name: 'AI Digital Forensics',
      description: 'AI-powered forensic analysis',
      accuracy: '99.4%',
      learning_rate: 'continuous',
      status: 'active'
    }
  ]);

  const [learningMetrics] = useState({
    courses_completed: 3,
    total_courses: 6,
    average_accuracy: '99.6%',
    learning_hours: 1247,
    knowledge_base_size: '2.3TB',
    ai_models_trained: 15,
    real_world_applications: 234,
    research_papers_studied: 156
  });

  useEffect(() => {
    // Simulate learning progress
    const interval = setInterval(() => {
      setLearningProgress(prev => {
        if (prev < 100) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCourseSync = async (courseId) => {
    console.log(`Syncing course: ${courseId}`);
    // Simulate course synchronization
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleAIModelUpdate = async (moduleId) => {
    console.log(`Updating AI model: ${moduleId}`);
    // Simulate AI model update
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Cyber Learning
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Advanced AI system that studies university courses and implements self-learning cybersecurity
          </p>
          
          {/* Learning Status */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${
                learningStatus === 'active' ? 'bg-green-400' : 'bg-red-400'
              } animate-pulse`} />
              <span className="text-white font-semibold">Learning: {learningStatus.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">{learningMetrics.courses_completed}/{learningMetrics.total_courses} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">{learningMetrics.average_accuracy} Accuracy</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-xs text-blue-400 font-semibold">LEARNING</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{learningMetrics.learning_hours}</h3>
            <p className="text-gray-400">Learning Hours</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-green-400" />
              <span className="text-xs text-green-400 font-semibold">AI MODELS</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{learningMetrics.ai_models_trained}</h3>
            <p className="text-gray-400">AI Models Trained</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-purple-400" />
              <span className="text-xs text-purple-400 font-semibold">KNOWLEDGE</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{learningMetrics.knowledge_base_size}</h3>
            <p className="text-gray-400">Knowledge Base</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-pink-400" />
              <span className="text-xs text-pink-400 font-semibold">APPLICATIONS</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{learningMetrics.real_world_applications}</h3>
            <p className="text-gray-400">Real Applications</p>
          </div>
        </motion.div>

        {/* University Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">University Course Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universityCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    course.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {course.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{course.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.university}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Level:</span>
                    <span className="text-blue-400 font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-green-400 font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-purple-400 font-semibold">{course.progress}%</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1 mb-4">
                  {course.topics.slice(0, 2).map((topic, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                      {topic}
                    </div>
                  ))}
                  {course.topics.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{course.topics.length - 2} more topics
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleCourseSync(course.id)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                >
                  Sync Course
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Learning Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">AI Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiLearningModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <Brain className="w-10 h-10 text-blue-400" />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    module.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {module.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{module.name}</h3>
                <p className="text-gray-300 mb-6">{module.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-green-400 font-semibold">{module.accuracy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Learning Rate:</span>
                    <span className="text-blue-400 font-semibold">{module.learning_rate}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAIModelUpdate(module.id)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl hover:scale-105 transition"
                >
                  Update AI Model
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">AI Learning Progress</h2>
            <p className="text-gray-300">Continuous learning and knowledge acquisition</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{learningMetrics.research_papers_studied}</h3>
              <p className="text-gray-400">Research Papers Studied</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{learningProgress.toFixed(1)}%</h3>
              <p className="text-gray-400">Current Learning Progress</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{learningMetrics.ai_models_trained}</h3>
              <p className="text-gray-400">AI Models Trained</p>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-4 rounded-full transition-all duration-300"
                style={{ width: `${learningProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 