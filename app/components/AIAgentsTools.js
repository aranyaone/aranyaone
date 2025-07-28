'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Target, Settings, Eye, Users, Star,
  Globe, Database, Code, Shield, CheckCircle, AlertCircle,
  Workflow
} from 'lucide-react';

const AIAgentsTools = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agents, setAgents] = useState([]);
  const [activeAgents, setActiveAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    network: 78,
    agents: 12,
    tasks: 34
  });

  const tabs = [
    { id: 'agents', name: 'AI Agents', icon: Bot },
    { id: 'automation', name: 'Automation', icon: Workflow },
    { id: 'tasks', name: 'Task Manager', icon: Target },
    { id: 'monitoring', name: 'Monitoring', icon: Eye },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const agentTypes = [
    {
      id: 'research-agent',
      name: 'Research Agent',
      description: 'Autonomous research and data collection',
      capabilities: ['web-scraping', 'data-analysis', 'report-generation'],
      performance: 95,
      status: 'active',
      icon: Globe
    },
    {
      id: 'automation-agent',
      name: 'Automation Agent',
      description: 'Task automation and workflow management',
      capabilities: ['process-automation', 'scheduling', 'integration'],
      performance: 92,
      status: 'active',
      icon: Workflow
    },
    {
      id: 'security-agent',
      name: 'Security Agent',
      description: 'Threat detection and security monitoring',
      capabilities: ['threat-detection', 'vulnerability-scanning', 'incident-response'],
      performance: 98,
      status: 'active',
      icon: Shield
    },
    {
      id: 'data-agent',
      name: 'Data Agent',
      description: 'Data processing and analytics',
      capabilities: ['data-processing', 'analytics', 'visualization'],
      performance: 89,
      status: 'active',
      icon: Database
    },
    {
      id: 'code-agent',
      name: 'Code Agent',
      description: 'Code generation and debugging',
      capabilities: ['code-generation', 'debugging', 'optimization'],
      performance: 91,
      status: 'active',
      icon: Code
    },
    {
      id: 'communication-agent',
      name: 'Communication Agent',
      description: 'Multi-channel communication management',
      capabilities: ['email-management', 'chat-support', 'notification'],
      performance: 87,
      status: 'active',
      icon: Users
    }
  ];

  const automationWorkflows = [
    {
      id: 'data-pipeline',
      name: 'Data Pipeline',
      description: 'Automated data collection and processing',
      steps: ['collect', 'process', 'analyze', 'report'],
      status: 'running',
      efficiency: 94
    },
    {
      id: 'security-monitoring',
      name: 'Security Monitoring',
      description: '24/7 security threat monitoring',
      steps: ['scan', 'detect', 'analyze', 'respond'],
      status: 'running',
      efficiency: 97
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Automated content creation and publishing',
      steps: ['research', 'create', 'review', 'publish'],
      status: 'running',
      efficiency: 89
    }
  ];

  useEffect(() => {
    loadAgents();
    startMonitoring();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await fetch('/api/ai-agents');
      const data = await response.json();
      setAgents(data.agents || agentTypes);
      setActiveAgents(data.agents?.filter(agent => agent.status === 'active') || agentTypes);
    } catch (error) {
      console.error('Load agents error:', error);
      setAgents(agentTypes);
      setActiveAgents(agentTypes);
    }
  };

  const startMonitoring = () => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(50, Math.min(95, prev.network + (Math.random() - 0.5) * 8)),
        agents: prev.agents,
        tasks: prev.tasks + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  };

  const createAgent = async (agentType) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: agentType,
          capabilities: agentType.capabilities,
          configuration: {}
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setAgents(prev => [...prev, result.agent]);
        setActiveAgents(prev => [...prev, result.agent]);
      }
      
    } catch (error) {
      console.error('Create agent error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const deployWorkflow = async (workflow) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/deploy-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow,
          agents: activeAgents.map(agent => agent.id)
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTasks(prev => [...prev, {
          id: Date.now(),
          name: workflow.name,
          status: 'running',
          progress: 0,
          agents: result.assignedAgents
        }]);
      }
      
    } catch (error) {
      console.error('Deploy workflow error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const stopAgent = async (agentId) => {
    try {
      const response = await fetch(`/api/stop-agent/${agentId}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        setActiveAgents(prev => prev.filter(agent => agent.id !== agentId));
      }
    } catch (error) {
      console.error('Stop agent error:', error);
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
            <Bot className="w-12 h-12 text-green-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              AI Agents Tools
            </h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Autonomous AI agents with self-evolving capabilities and intelligent task automation
          </p>
        </motion.div>

        {/* System Health Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{systemHealth.cpu.toFixed(0)}%</div>
            <div className="text-gray-400 text-sm">CPU Usage</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{systemHealth.memory.toFixed(0)}%</div>
            <div className="text-gray-400 text-sm">Memory</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{systemHealth.network.toFixed(0)}%</div>
            <div className="text-gray-400 text-sm">Network</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{systemHealth.agents}</div>
            <div className="text-gray-400 text-sm">Active Agents</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">{systemHealth.tasks}</div>
            <div className="text-gray-400 text-sm">Running Tasks</div>
          </div>
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
                  ? 'bg-gradient-to-r from-green-400 to-teal-400 text-white shadow-lg'
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
            {activeTab === 'agents' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">AI Agents</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agentTypes.map((agent) => (
                    <div key={agent.id} className="bg-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <agent.icon className="w-8 h-8 text-green-400 mr-3" />
                        <div>
                          <h3 className="text-white font-semibold">{agent.name}</h3>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              agent.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                            <span className="text-gray-400 text-sm capitalize">{agent.status}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{agent.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {agent.capabilities.map((capability) => (
                          <div key={capability} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-gray-300 text-sm">{capability}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-yellow-400 text-sm">{agent.performance}%</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => createAgent(agent)}
                            disabled={isProcessing}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {isProcessing ? 'Creating...' : 'Deploy'}
                          </button>
                          <button
                            onClick={() => stopAgent(agent.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            Stop
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'automation' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Automation Workflows</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Available Workflows</h3>
                    <div className="space-y-4">
                      {automationWorkflows.map((workflow) => (
                        <div key={workflow.id} className="border border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-semibold">{workflow.name}</h4>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                workflow.status === 'running' ? 'bg-green-400' : 'bg-yellow-400'
                              }`}></div>
                              <span className="text-gray-400 text-sm capitalize">{workflow.status}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-3">{workflow.description}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex space-x-1">
                              {workflow.steps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                    {index + 1}
                                  </div>
                                  {index < workflow.steps.length - 1 && (
                                    <div className="w-4 h-0.5 bg-gray-600 mx-1"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <span className="text-green-400 text-sm font-semibold">{workflow.efficiency}%</span>
                          </div>
                          
                          <button
                            onClick={() => deployWorkflow(workflow)}
                            disabled={isProcessing}
                            className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                          >
                            {isProcessing ? 'Deploying...' : 'Deploy Workflow'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Custom Workflow</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Workflow Name</label>
                        <input
                          type="text"
                          placeholder="Enter workflow name..."
                          className="w-full p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="text-gray-300 text-sm">Description</label>
                        <textarea
                          placeholder="Describe the workflow..."
                          className="w-full h-24 p-3 bg-slate-600/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="text-gray-300 text-sm">Steps</label>
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                {step}
                              </div>
                              <input
                                type="text"
                                placeholder={`Step ${step}...`}
                                className="flex-1 p-2 bg-slate-600/50 border border-gray-600 rounded text-white text-sm placeholder-gray-400"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        Create Workflow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Task Manager</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-slate-700/50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Running Tasks</h3>
                      <div className="space-y-4">
                        {tasks.map((task) => (
                          <div key={task.id} className="border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-semibold">{task.name}</h4>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  task.status === 'running' ? 'bg-green-400' : 'bg-yellow-400'
                                }`}></div>
                                <span className="text-gray-400 text-sm capitalize">{task.status}</span>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-400">
                                Agents: {task.agents?.length || 0}
                              </div>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                                  View
                                </button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
                                  Stop
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Task Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total Tasks</span>
                        <span className="text-white font-semibold">{tasks.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Running</span>
                        <span className="text-green-400 font-semibold">
                          {tasks.filter(t => t.status === 'running').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Completed</span>
                        <span className="text-blue-400 font-semibold">
                          {tasks.filter(t => t.status === 'completed').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Failed</span>
                        <span className="text-red-400 font-semibold">
                          {tasks.filter(t => t.status === 'failed').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">System Monitoring</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Agent Performance</h3>
                    <div className="space-y-4">
                      {activeAgents.map((agent) => (
                        <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex items-center">
                            <agent.icon className="w-6 h-6 text-green-400 mr-3" />
                            <div>
                              <div className="text-white font-semibold">{agent.name}</div>
                              <div className="text-gray-400 text-sm">{agent.performance}% efficiency</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 text-sm">Active</div>
                            <div className="text-gray-400 text-xs">2 min ago</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-500/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-green-400 text-sm">All agents running normally</span>
                      </div>
                      <div className="flex items-center p-3 bg-yellow-500/20 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
                        <span className="text-yellow-400 text-sm">Memory usage at 75%</span>
                      </div>
                      <div className="flex items-center p-3 bg-blue-500/20 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-blue-400 text-sm">New task scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Agent Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Autonomy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Self-Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-Decision Making</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Resource Optimization</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Collaborative Learning</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security & Privacy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Data Encryption</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Access Control</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Audit Logging</span>
                        <button className="p-2 bg-green-500 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Privacy Compliance</span>
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

export default AIAgentsTools; 