import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Phone, Mail, Calendar, TrendingUp, Target, Plus, Search, Filter, MoreVertical } from 'lucide-react';

export default function SmartCRM() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [crmMetrics, setCrmMetrics] = useState({
    totalContacts: 15420,
    activeDeals: 247,
    monthlyRevenue: 184500,
    conversionRate: 24.8,
    pipelineValue: 892400
  });

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Industries',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'hot',
      dealValue: '$45,000',
      lastContact: '2 hours ago',
      tags: ['Enterprise', 'SaaS', 'Decision Maker']
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 987-6543',
      status: 'warm',
      dealValue: '$12,500',
      lastContact: '1 day ago',
      tags: ['Startup', 'Growth', 'Interested']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Global Solutions Ltd',
      email: 'emily@globalsolutions.com',
      phone: '+1 (555) 246-8135',
      status: 'cold',
      dealValue: '$78,000',
      lastContact: '1 week ago',
      tags: ['Enterprise', 'Consulting', 'Follow-up']
    }
  ];

  const deals = [
    {
      id: 1,
      title: 'Enterprise Platform License',
      company: 'TechCorp Industries',
      value: 45000,
      stage: 'Negotiation',
      probability: 85,
      closeDate: '2025-08-15',
      owner: 'John Smith'
    },
    {
      id: 2,
      title: 'Digital Transformation Package',
      company: 'Global Solutions Ltd',
      value: 78000,
      stage: 'Proposal',
      probability: 60,
      closeDate: '2025-09-01',
      owner: 'Sarah Wilson'
    },
    {
      id: 3,
      title: 'Startup Growth Suite',
      company: 'StartupXYZ',
      value: 12500,
      stage: 'Discovery',
      probability: 40,
      closeDate: '2025-08-30',
      owner: 'Mike Johnson'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'call',
      title: 'Follow-up call with Sarah Johnson',
      time: '2 hours ago',
      contact: 'Sarah Johnson',
      outcome: 'Positive - Moving to proposal stage'
    },
    {
      id: 2,
      type: 'email',
      title: 'Sent proposal to Global Solutions',
      time: '4 hours ago',
      contact: 'Emily Rodriguez',
      outcome: 'Delivered - Awaiting response'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Demo presentation completed',
      time: '1 day ago',
      contact: 'Michael Chen',
      outcome: 'Interested - Requested pricing'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'deals', label: 'Deals', icon: Target },
    { id: 'activities', label: 'Activities', icon: Calendar }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warm': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cold': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Discovery': return 'bg-blue-500/20 text-blue-400';
      case 'Proposal': return 'bg-yellow-500/20 text-yellow-400';
      case 'Negotiation': return 'bg-orange-500/20 text-orange-400';
      case 'Closed Won': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🏢 Smart CRM
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            AI-Powered Customer Relationship Management with Harvard Business Intelligence
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{crmMetrics.totalContacts.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Contacts</div>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{crmMetrics.activeDeals}</div>
              <div className="text-sm text-gray-300">Active Deals</div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">${crmMetrics.monthlyRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Monthly Revenue</div>
            </div>
            <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
              <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{crmMetrics.conversionRate}%</div>
              <div className="text-sm text-gray-300">Conversion Rate</div>
            </div>
            <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-500/30">
              <Target className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">${crmMetrics.pipelineValue.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Pipeline Value</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Sales Pipeline */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Sales Pipeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🔍</div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">23</div>
                  <div className="text-gray-300">Discovery</div>
                  <div className="text-sm text-gray-400">$340K value</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">📋</div>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">15</div>
                  <div className="text-gray-300">Proposal</div>
                  <div className="text-sm text-gray-400">$280K value</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🤝</div>
                  <div className="text-2xl font-bold text-orange-400 mb-2">8</div>
                  <div className="text-gray-300">Negotiation</div>
                  <div className="text-sm text-gray-400">$190K value</div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">✅</div>
                  <div className="text-2xl font-bold text-green-400 mb-2">12</div>
                  <div className="text-gray-300">Closed Won</div>
                  <div className="text-sm text-gray-400">$156K this month</div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-slate-700/50 rounded-xl p-6 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                          {activity.type === 'call' && <Phone className="w-5 h-5 text-purple-400" />}
                          {activity.type === 'email' && <Mail className="w-5 h-5 text-purple-400" />}
                          {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-purple-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{activity.title}</h3>
                          <p className="text-gray-400 text-sm">with {activity.contact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">{activity.time}</div>
                        <div className="text-green-400 text-sm">{activity.outcome}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Contact
              </button>
            </div>

            {/* Contacts List */}
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{contact.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{contact.name}</h3>
                        <p className="text-gray-400">{contact.company}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-400 text-sm flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {contact.email}
                          </span>
                          <span className="text-gray-400 text-sm flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {contact.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)} mb-2`}>
                        {contact.status.toUpperCase()}
                      </div>
                      <div className="text-green-400 font-bold text-lg">{contact.dealValue}</div>
                      <div className="text-gray-400 text-sm">Last contact: {contact.lastContact}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {contact.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'deals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Active Deals</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 inline mr-2" />
                New Deal
              </button>
            </div>

            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl">{deal.title}</h3>
                      <p className="text-gray-400">{deal.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-2xl">${deal.value.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Close: {deal.closeDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                      <span className="text-gray-400 text-sm">Owner: {deal.owner}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="text-orange-400 font-bold mr-2">{deal.probability}%</div>
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4 inline mr-2" />
                Schedule Activity
              </button>
            </div>

            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-slate-700/50 rounded-xl p-6 border border-white/5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                        {activity.type === 'call' && <Phone className="w-6 h-6 text-purple-400" />}
                        {activity.type === 'email' && <Mail className="w-6 h-6 text-purple-400" />}
                        {activity.type === 'meeting' && <Calendar className="w-6 h-6 text-purple-400" />}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2">{activity.title}</h3>
                        <p className="text-gray-400 mb-2">Contact: {activity.contact}</p>
                        <p className="text-green-400 text-sm">{activity.outcome}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
