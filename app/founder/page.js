"use client";
import { motion } from 'framer-motion';
import { 
  Crown, Award, Globe, Heart, Zap, Brain, 
  Users, Target, Star, Rocket, Lightbulb, 
  Linkedin, Twitter, Github, Mail, Phone
} from 'lucide-react';

export default function FounderPage() {
  const achievements = [
    {
      icon: Award,
      title: "AI Pioneer",
      description: "Leading the development of emotionally intelligent AI systems"
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Building AI solutions that serve humanity worldwide"
    },
    {
      icon: Heart,
      title: "Empathy First",
      description: "Creating AI that understands and responds to human emotions"
    },
    {
      icon: Zap,
      title: "Innovation Leader",
      description: "Pushing boundaries in AI technology and user experience"
    }
  ];

  const vision = [
    {
      icon: Brain,
      title: "Emotional Intelligence",
      description: "AI that understands context, emotions, and human psychology"
    },
    {
      icon: Users,
      title: "Human-Centered Design",
      description: "Technology that serves and enhances human capabilities"
    },
    {
      icon: Target,
      title: "Empire Building",
      description: "Empowering individuals to build their digital empires"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Striving for world-class quality in everything we do"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Bujji Chat Launch",
      description: "Launched the world's most emotionally intelligent AI chat platform"
    },
    {
      year: "2023",
      title: "AI Research Breakthrough",
      description: "Developed advanced emotional intelligence algorithms and neural networks"
    },
    {
      year: "2022",
      title: "Company Founded",
      description: "Founded Bujji Chat with a vision to democratize AI technology"
    },
    {
      year: "2021",
      title: "Vision Conceived",
      description: "The idea of emotional AI was born during deep research into human-AI interaction"
    },
    {
      year: "2020",
      title: "AI Journey Begins",
      description: "Started exploring AI technology and its potential to enhance human life"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, url: "#", label: "LinkedIn" },
    { icon: Twitter, url: "#", label: "Twitter" },
    { icon: Github, url: "#", label: "GitHub" },
    { icon: Mail, url: "mailto:king@bujjichat.com", label: "Email" }
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
              <Crown className="w-16 h-16 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                King Srinivas
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Founder & CEO of Bujji Chat - Building the future of emotionally intelligent AI
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-3 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <link.icon className="w-6 h-6 text-blue-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Bio */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Meet the Visionary
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  King Srinivas is a visionary entrepreneur and AI enthusiast who believes in the power of 
                  technology to enhance human potential. With over a decade of experience in AI research 
                  and development, he has dedicated his career to creating AI systems that understand and 
                  respond to human emotions.
                </p>
                <p>
                  His journey began with a simple question: "What if AI could truly understand human emotions?" 
                  This led to years of research, experimentation, and breakthroughs in emotional intelligence 
                  algorithms that form the foundation of Bujji Chat.
                </p>
                <p>
                  Today, King leads a team of world-class engineers, researchers, and designers who share 
                  his vision of democratizing AI technology and making it accessible to everyone who dreams 
                  of building their own empire.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto flex items-center justify-center">
                <span className="text-6xl font-bold text-white">KS</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                Founder & CEO
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Key Achievements
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <achievement.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{achievement.title}</h3>
                <p className="text-gray-300">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Vision
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              To create a world where AI understands human emotions and helps people build their dreams
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vision.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
              >
                <item.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Journey Timeline
            </h2>
          </motion.div>
          
          <div className="space-y-8">
            {timeline.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
                <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-8"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Philosophy</h2>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                "I believe that technology should serve humanity, not the other way around. AI has the 
                potential to be the greatest tool humanity has ever created, but only if we build it with 
                empathy, understanding, and a deep respect for human values."
              </p>
              <p>
                "Every conversation with Bujji Chat is designed to be meaningful, helpful, and emotionally 
                intelligent. We're not just building an AI - we're creating a companion that understands 
                your dreams and helps you achieve them."
              </p>
              <p>
                "The future belongs to those who can harness the power of AI while maintaining their 
                humanity. My mission is to democratize this technology and make it accessible to everyone 
                who dreams of building their own empire."
              </p>
            </div>
            <div className="text-center mt-8">
              <p className="text-blue-400 font-semibold">- King Srinivas</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Want to discuss AI, entrepreneurship, or the future of technology? Let's connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:king@bujjichat.com" className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-xl hover:scale-105 transition flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
              <a href="tel:+919876543210" className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-xl hover:bg-white/20 transition flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 