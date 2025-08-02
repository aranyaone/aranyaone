'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Users, Zap, Target, Settings, TrendingUp, Eye, Clock,
  Activity, Layers, Globe, Shield, Award, Star, Crown,
  Diamond, Lightbulb, Code, Database, Cpu, Network, Brain,
  CheckCircle, AlertCircle, Rocket, ArrowRight, Plus, Search, Filter, 
  Play, Pause, Download, Upload, Refresh, Stop, ChevronRight, ChevronDown,
  MessageSquare, Bookmark, Copy, Edit, Trash2, MonitorSpeaker,
  Headphones, Mic, Video, Phone, Mail, Calendar, FileText, BarChart3 as BarChart,
  Bell, Sun, Moon
} from 'lucide-react';


// === ADVANCED PLANETARY UI ===
import React from 'react';

export default function PlanetaryAIAgentsUltimate() {
  // Broken link checker hook
  const [brokenLinks, setBrokenLinks] = React.useState([]);
  React.useEffect(() => {
    const checkLinks = async () => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const broken = [];
      for (const link of links) {
        const href = link.getAttribute('href');
        // Only check absolute URLs (external) and public assets
        if (href && (href.startsWith('http') || href.startsWith('/'))) {
          try {
            const res = await fetch(href, { method: 'HEAD' });
            if (!res.ok) broken.push(href);
          } catch {
            broken.push(href);
          }
        }
      }
      setBrokenLinks(broken);
    };
    checkLinks();
  }, []);
  // Agent Status Cards Section as a separate component
  function AgentStatusCards({ performanceMetrics, agentAvatars, agentTags, setAgentTags, filter, tagFilter, theme, setSelectedAgent, setModalOpen }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[...Array(performanceMetrics.total_agents)].map((_, idx) => {
          const status = idx % 3 === 0 ? 'Active' : idx % 3 === 1 ? 'Quantum' : 'Global';
          const cardColor = status === 'Active' ? (theme === 'dark' ? 'from-green-900 via-blue-900 to-indigo-900' : 'from-green-100 via-blue-100 to-indigo-100') : status === 'Quantum' ? (theme === 'dark' ? 'from-cyan-900 via-purple-900 to-blue-900' : 'from-cyan-100 via-purple-100 to-blue-100') : (theme === 'dark' ? 'from-yellow-900 via-blue-900 to-purple-900' : 'from-yellow-100 via-blue-100 to-purple-100');
          const agentId = idx + 1;
          const tag = agentTags[agentId] || 'None';
          if ((filter !== 'All' && status !== filter) || (tagFilter !== 'All' && tag !== tagFilter)) return null;
          return (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className={`bg-gradient-to-tr ${cardColor} rounded-xl shadow-lg p-6 flex flex-col gap-2 border ${theme === 'dark' ? 'border-blue-700' : 'border-blue-300'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{agentAvatars[idx % agentAvatars.length]}</span>
                <span className="font-bold text-lg">Agent #{agentId}</span>
                <span className="ml-2 px-2 py-1 rounded bg-green-700 text-white text-xs">{tag !== 'None' ? tag : 'No Tag'}</span>
                <select value={tag} onChange={e => {
                  const newTags = { ...agentTags, [agentId]: e.target.value };
                  setAgentTags(newTags);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('agentTags', JSON.stringify(newTags));
                  }
                }} className="ml-2 px-2 py-1 rounded border border-green-500 text-xs">
                  <option value="None">No Tag</option>
                  <option value="Finance">Finance</option>
                  <option value="Research">Research</option>
                  <option value="Priority">Priority</option>
                  <option value="Custom">Custom</option>
                </select>
                <button aria-label="View Profile" onClick={() => { setSelectedAgent(agentId); setModalOpen(true); }} className="ml-auto px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"><Eye /></button>
              </div>
              <div className="flex gap-4 text-sm">
                <span><Star className="inline text-yellow-400" /> Perf: {Math.round(90 + Math.random() * 10)}%</span>
                <span><Award className="inline text-green-400" /> Tasks: {Math.round(5000 + Math.random() * 1000)}</span>
                <span><Shield className="inline text-cyan-400" /> {status}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <CheckCircle className="text-green-500" /> Active
                <Cpu className="text-pink-400" /> Multi-Lang
                <Globe className="text-blue-400" /> Global
                <button aria-label="Copy Agent ID" className="ml-auto px-2 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"><Copy /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }
  // Agent activity timeline (sample data, could be replaced with real data)
  const [agentActivities, setAgentActivities] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agentActivities');
      if (saved) return JSON.parse(saved);
    }
    // Generate sample activities for agents
    const activities = {};
    for (let i = 1; i <= 12; i++) {
      activities[i] = [
        { time: '09:00', desc: 'Started daily tasks' },
        { time: '10:30', desc: 'Completed quantum security update' },
        { time: '12:00', desc: 'Collaborated with Agent #2' },
        { time: '14:00', desc: 'Resolved performance alert' },
        { time: '16:00', desc: 'Generated report' }
      ];
    }
    return activities;
  });

  // Save activities to localStorage when changed (for future extensibility)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentActivities', JSON.stringify(agentActivities));
    }
  }, [agentActivities]);
  // Dashboard section visibility and order
  const sectionKeys = [
    'statusBar',
    'agentCards',
    'performanceChart',
    'controls',
    'collaborationNetwork'
  ];
  const [sectionOrder, setSectionOrder] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sectionOrder');
      return saved ? JSON.parse(saved) : sectionKeys;
    }
    return sectionKeys;
  });
  const [sectionVisibility, setSectionVisibility] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sectionVisibility');
      return saved ? JSON.parse(saved) : sectionKeys.reduce((acc, key) => { acc[key] = true; return acc; }, {});
    }
    return sectionKeys.reduce((acc, key) => { acc[key] = true; return acc; }, {});
  });
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));
    }
  }, [sectionOrder]);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sectionVisibility', JSON.stringify(sectionVisibility));
    }
  }, [sectionVisibility]);
  const handleOrderChange = (idx, newKey) => {
    const newOrder = [...sectionOrder];
    newOrder[idx] = newKey;
    setSectionOrder(newOrder);
  };
  const handleVisibilityChange = key => {
    setSectionVisibility({ ...sectionVisibility, [key]: !sectionVisibility[key] });
  };
  // Agent notes state (persisted in localStorage)
  const [agentNotes, setAgentNotes] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agentNotes');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Save notes to localStorage when changed
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentNotes', JSON.stringify(agentNotes));
    }
  }, [agentNotes]);
  // Modal state for agent profile
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [filter, setFilter] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('filter') || 'All';
    }
    return 'All';
  });
  const [tagFilter, setTagFilter] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tagFilter') || 'All';
    }
    return 'All';
  });
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [agentTags, setAgentTags] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agentTags');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const agentAvatars = ['🤖','🧠','🦾','👾','🛰️','🦉','🦄','🦈','🦜','🦋'];

  // Accessibility: focus trap for modal
  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalOpen]);

  // Theme switcher with persistence
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  // Filter change with persistence
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('filter', e.target.value);
    }
  };
  const handleTagFilterChange = (e) => {
    setTagFilter(e.target.value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tagFilter', e.target.value);
    }
  };

  return (
    <main className={theme === 'dark' ? "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-0" : "min-h-screen bg-gradient-to-br from-white via-blue-100 to-purple-100 text-gray-900 p-0"}>
      <section className="w-full max-w-7xl mx-auto py-10 px-4">
        {/* Top Bar: Search, Filter, Tag Filter, Notifications, Theme Switcher */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex gap-2 items-center">
            <Search className="text-blue-400" />
            <input type="text" placeholder="Search agents..." className={theme === 'dark' ? "bg-gray-900 text-white px-4 py-2 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-white text-gray-900 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"} />
            <Filter className="text-purple-400 ml-4" />
            <select value={filter} onChange={handleFilterChange} className={theme === 'dark' ? "bg-gray-900 text-white px-3 py-2 rounded-lg border border-purple-700" : "bg-white text-gray-900 px-3 py-2 rounded-lg border border-purple-300"}>
              <option>All</option>
              <option>Active</option>
              <option>Quantum</option>
              <option>Global</option>
            </select>
            <span className="ml-4">Tag:</span>
            <select value={tagFilter} onChange={handleTagFilterChange} className={theme === 'dark' ? "bg-gray-900 text-white px-3 py-2 rounded-lg border border-green-700" : "bg-white text-gray-900 px-3 py-2 rounded-lg border border-green-300"}>
              <option>All</option>
              <option>Finance</option>
              <option>Research</option>
              <option>Priority</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => setNotificationOpen(true)} className="relative">
              <Bell className="text-yellow-400 animate-pulse" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">3</span>
            </button>
            <span className="text-sm text-gray-300">3 new notifications</span>
            <button onClick={toggleTheme} className="ml-4 px-3 py-2 rounded-lg border border-blue-500 bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {theme === 'dark' ? <Sun className="inline text-yellow-300" /> : <Moon className="inline text-blue-700" />} Theme
            </button>
          </div>
        </div>

        {/* Animated Status Bar */}
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2 }} className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8" />
        {/* Broken Links Report */}
        {brokenLinks.length > 0 && (
          <div className="bg-red-100 text-red-800 rounded-lg p-4 mb-6 border border-red-400">
            <strong>Broken Links Detected:</strong>
            <ul className="list-disc ml-6">
              {brokenLinks.map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>
          </div>
        )}
        {/* ...existing dashboard and UI code... */}
      </section>
    </main>
    );
}

