"use client";
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, Database, Users, Globe,
  CheckCircle, AlertTriangle, Info, FileText
} from 'lucide-react';

export default function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All conversations are encrypted and secure"
    },
    {
      icon: Eye,
      title: "No Data Mining",
      description: "We don't sell or share your personal data"
    },
    {
      icon: Database,
      title: "Local Processing",
      description: "Sensitive data processed locally when possible"
    },
    {
      icon: Users,
      title: "User Control",
      description: "Full control over your data and privacy settings"
    }
  ];

  const dataCategories = [
    {
      category: "Account Information",
      data: ["Email address", "Name", "Profile picture", "Account preferences"],
      purpose: "Account creation and management"
    },
    {
      category: "Conversation Data",
      data: ["Chat messages", "AI responses", "Conversation context"],
      purpose: "Providing AI chat services and improving responses"
    },
    {
      category: "Usage Analytics",
      data: ["Feature usage", "Performance metrics", "Error logs"],
      purpose: "Improving service quality and user experience"
    },
    {
      category: "Technical Data",
      data: ["Device information", "IP address", "Browser type"],
      purpose: "Security and service optimization"
    }
  ];

  const userRights = [
    "Access your personal data",
    "Correct inaccurate information",
    "Delete your account and data",
    "Export your data",
    "Opt-out of marketing communications",
    "Request data processing restrictions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Your privacy is our priority. Learn how we protect your data and respect your rights.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Privacy Commitment
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Data We Collect
            </h2>
            <p className="text-xl text-gray-300">
              We collect only the data necessary to provide our services
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {dataCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Data Collected</h4>
                    <ul className="space-y-2">
                      {category.data.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Purpose</h4>
                    <p className="text-gray-300">{category.purpose}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              How We Protect Your Data
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Security Measures</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Encryption</h4>
                    <p className="text-gray-300 text-sm">All data is encrypted in transit and at rest using industry-standard protocols</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Access Controls</h4>
                    <p className="text-gray-300 text-sm">Strict access controls and authentication for all data access</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Regular Audits</h4>
                    <p className="text-gray-300 text-sm">Regular security audits and penetration testing</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Data Retention</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Conversation Data</h4>
                    <p className="text-gray-300 text-sm">Stored for 30 days by default, can be deleted immediately</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Account Data</h4>
                    <p className="text-gray-300 text-sm">Retained until account deletion is requested</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold">Analytics Data</h4>
                    <p className="text-gray-300 text-sm">Anonymized and retained for service improvement</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your Rights
            </h2>
            <p className="text-xl text-gray-300">
              You have complete control over your data and privacy
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <p className="text-white font-semibold">{right}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Third-Party Services</h2>
            <p className="text-gray-300 mb-6">
              We use trusted third-party services to provide our AI capabilities and improve user experience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h3 className="text-white font-semibold">OpenAI</h3>
                  <p className="text-gray-400 text-sm">AI language processing and generation</p>
                </div>
                <div className="text-sm text-blue-400">Required</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h3 className="text-white font-semibold">Google Analytics</h3>
                  <p className="text-gray-400 text-sm">Website usage analytics and optimization</p>
                </div>
                <div className="text-sm text-yellow-400">Optional</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <h3 className="text-white font-semibold">Stripe</h3>
                  <p className="text-gray-400 text-sm">Payment processing and billing</p>
                </div>
                <div className="text-sm text-blue-400">Required</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our privacy team is here to help with any questions or concerns about your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-xl hover:scale-105 transition">
                Contact Privacy Team
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl hover:bg-white/20 transition">
                Download Data
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 