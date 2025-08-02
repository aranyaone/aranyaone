"use client";
import { motion } from 'framer-motion';
import { 
  FileText, Shield, Users, Globe, CheckCircle,
  AlertTriangle, Info, BookOpen, Scale, Gavel
} from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using Bujji Chat, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "Description of Service",
      content: "Bujji Chat provides AI-powered conversational services, including but not limited to chat assistance, content generation, and emotional intelligence features. Our service is designed to enhance user productivity and communication."
    },
    {
      title: "User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "Acceptable Use",
      content: "You agree not to use the service for any unlawful purpose or to solicit others to perform unlawful acts. You must not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances."
    },
    {
      title: "Intellectual Property",
      content: "The service and its original content, features, and functionality are and will remain the exclusive property of Bujji Chat and its licensors. The service is protected by copyright, trademark, and other laws."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices."
    }
  ];

  const userResponsibilities = [
    "Provide accurate and complete information",
    "Maintain the security of your account",
    "Use the service in compliance with applicable laws",
    "Respect intellectual property rights",
    "Report any security concerns immediately",
    "Not attempt to reverse engineer the service"
  ];

  const prohibitedActivities = [
    "Using the service for illegal purposes",
    "Attempting to gain unauthorized access",
    "Interfering with service operation",
    "Harassing or abusing other users",
    "Sharing inappropriate or harmful content",
    "Attempting to manipulate AI responses"
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
              <FileText className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Please read these terms carefully before using Bujji Chat services.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-yellow-500/20 border border-yellow-400 rounded-2xl p-8"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-4" />
              <h2 className="text-2xl font-bold text-yellow-400">Important Notice</h2>
            </div>
            <p className="text-gray-300">
              By using Bujji Chat, you agree to these terms and conditions. If you do not agree with any part of these terms, 
              you may not access or use our services. These terms constitute a legally binding agreement between you and Bujji Chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Terms and Conditions
            </h2>
          </motion.div>
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Responsibilities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              User Responsibilities
            </h2>
            <p className="text-xl text-gray-300">
              As a user of Bujji Chat, you agree to the following responsibilities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userResponsibilities.map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <p className="text-white font-semibold">{responsibility}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Prohibited Activities
            </h2>
            <p className="text-xl text-gray-300">
              The following activities are strictly prohibited and may result in account termination
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prohibitedActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-6 border border-red-400/30"
              >
                <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
                <p className="text-white font-semibold">{activity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Limitations */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Service Limitations</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-white font-semibold">Service Availability</h3>
                  <p className="text-gray-300 text-sm">We strive for 99.9% uptime but cannot guarantee uninterrupted service.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-white font-semibold">AI Limitations</h3>
                  <p className="text-gray-300 text-sm">AI responses are generated based on training data and may not always be accurate.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-white font-semibold">Data Usage</h3>
                  <p className="text-gray-300 text-sm">Usage is subject to fair use policies and may be limited during peak times.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Termination */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Account Termination</h2>
            <p className="text-gray-300 mb-6">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">You may cancel your account at any time</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Data will be deleted within 30 days of cancellation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Refunds are processed according to our refund policy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Governing Law</h2>
            <p className="text-gray-300 mb-6">
              These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. 
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Jurisdiction</h3>
                <p className="text-gray-300 text-sm">Bangalore, Karnataka, India</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-gray-300 text-sm">Arbitration in accordance with Indian law</p>
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
              Questions About Terms?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-xl hover:scale-105 transition">
                Contact Legal Team
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl hover:bg-white/20 transition">
                Download Terms
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 