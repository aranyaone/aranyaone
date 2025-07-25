// @ts-nocheck
import { memo, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatDate } from '../utils';
import type { 
  UserProfile, 
  Achievement, 
  ProfileData, 
  ProfileUpdateRequest,
  ProfileApiResponse
} from '../types/profile';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const scaleOnHover = {
  hover: {
    scale: 1.02,
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.98 },
};

const progressBarVariants = {
  hidden: { width: 0 },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 1, ease: 'easeOut' as const, delay: 0.5 },
  }),
};

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = memo<AchievementCardProps>(function AchievementCard({ 
  achievement, 
  index 
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={scaleOnHover.hover}
      whileTap={scaleOnHover.tap}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`relative transition-all duration-300 ${
        achievement.completed 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}>
        <div className="flex items-center space-x-4">
          <motion.div 
            className="text-4xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {achievement.icon}
          </motion.div>
          <div className="flex-1">
            <h3 className={`font-semibold ${
              achievement.completed ? 'text-green-900' : 'text-gray-900'
            }`}>
              {achievement.title}
            </h3>
            <p className={`text-sm ${
              achievement.completed ? 'text-green-700' : 'text-gray-600'
            }`}>
              {achievement.description}
            </p>
            {achievement.completed && achievement.date ? (
              <motion.p 
                className="text-xs text-green-600 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Completed on {formatDate(achievement.date)}
              </motion.p>
            ) : achievement.progress ? (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {achievement.progress}%
                  </motion.span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {achievement.completed && (
            <motion.div 
              className="text-green-600"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                delay: 0.6 
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
});

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple';
  index: number;
}

const StatCard = memo<StatCardProps>(function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  index 
}) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    purple: 'text-purple-600 bg-purple-50',
  };
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={scaleOnHover.hover}
      whileTap={scaleOnHover.tap}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <Card className="text-center hover:shadow-lg transition-all duration-300">
        <motion.div 
          className={`text-3xl mb-2 w-12 h-12 rounded-full mx-auto flex items-center justify-center ${colorClasses[color]}`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        <motion.p 
          className="text-2xl font-bold text-gray-900 mt-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 15,
            delay: 0.3 + index * 0.1 
          }}
        >
          {value}
        </motion.p>
      </Card>
    </motion.div>
  );
});

export default function ProfilePage(): JSX.Element {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<ProfileUpdateRequest>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch from API first, fall back to mock data if not available
      try {
        const response = await fetch('/api/profile');
        const result: ProfileApiResponse = await response.json();
        
        if (result.success && result.data) {
          setProfileData(result.data);
          setEditForm({
            name: result.data.profile.name,
            email: result.data.profile.email,
            role: result.data.profile.role,
          });
          return;
        }
      } catch (apiError) {
        // API not available, use mock data
        console.log('API not available, using mock data');
      }
      
      // Fallback to mock data
      const mockData: ProfileData = {
        profile: {
          id: 1,
          name: 'Alex Johnson',
          email: 'alex@aranyaone.com',
          avatar: '/images/avatar.jpg',
          role: 'Admin',
          joinedDate: new Date('2023-01-15'),
          lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
          preferences: {
            theme: 'light',
            notifications: true,
            emailUpdates: true,
            language: 'en',
          },
        },
        achievements: [
          {
            id: 1,
            title: 'First Login',
            description: 'Completed your first login',
            icon: '🎉',
            completed: true,
            date: new Date('2023-01-15'),
          },
          {
            id: 2,
            title: 'Dashboard Master',
            description: 'Customized your dashboard',
            icon: '🎯',
            completed: true,
            date: new Date('2023-01-20'),
          },
          {
            id: 3,
            title: 'Service Manager',
            description: 'Deployed your first service',
            icon: '⚙️',
            completed: true,
            date: new Date('2023-02-01'),
          },
          {
            id: 4,
            title: 'Analytics Pro',
            description: 'Used analytics for 30 days',
            icon: '📊',
            completed: false,
            progress: 75,
          },
        ],
        stats: {
          daysActive: Math.floor((new Date().getTime() - new Date('2023-01-15').getTime()) / (1000 * 60 * 60 * 24)),
          completedAchievements: 3,
          totalAchievements: 4,
          servicesUsed: 8,
          profileLevel: 'Pro',
        },
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfileData(mockData);
      setEditForm({
        name: mockData.profile.name,
        email: mockData.profile.email,
        role: mockData.profile.role,
      });
      
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  const handleSave = async () => {
    if (!profileData) return;
    
    try {
      setIsSaving(true);
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      
      const result: ProfileApiResponse = await response.json();
      
      if (result.success && result.data) {
        setProfileData(result.data);
        setIsEditing(false);
      } else {
        setError(result.error || 'Failed to save profile');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    if (profileData) {
      setEditForm({
        name: profileData.profile.name,
        email: profileData.profile.email,
        role: profileData.profile.role,
      });
    }
    setIsEditing(false);
  };
  
  if (isLoading) {
    return (
      <Layout title="Profile - Aranya One">
        <motion.div 
          className="flex items-center justify-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-lg text-gray-500 flex items-center space-x-2"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>Loading profile...</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout title="Profile - Aranya One">
        <motion.div 
          className="flex items-center justify-center h-64"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
            <div className="text-gray-600">{error}</div>
            <Button 
              onClick={fetchProfile} 
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      </Layout>
    );
  }
  
  if (!profileData) return null;
  
  const { profile, achievements, stats } = profileData;
  
  return (
    <Layout title="Profile - Aranya One">
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
        >
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 flex items-center space-x-2"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <motion.span
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                👤
              </motion.span>
              <span>Profile</span>
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Manage your empire profile and achievements
            </motion.p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Saving...</span>
                </span>
              ) : isEditing ? (
                '💾 Save'
              ) : (
                '✏️ Edit Profile'
              )}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Profile Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          <StatCard
            title="Days Active"
            value={stats.daysActive}
            icon="📅"
            color="blue"
            index={0}
          />
          <StatCard
            title="Achievements"
            value={`${stats.completedAchievements}/${stats.totalAchievements}`}
            icon="🏆"
            color="yellow"
            index={1}
          />
          <StatCard
            title="Services Used"
            value={stats.servicesUsed}
            icon="⚙️"
            color="green"
            index={2}
          />
          <StatCard
            title="Profile Level"
            value={stats.profileLevel}
            icon="⭐"
            color="purple"
            index={3}
          />
        </motion.div>
        
        {/* Profile Information */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <Card>
              <Card.Header>
                <Card.Title>Profile Information</Card.Title>
              </Card.Header>
              <Card.Content>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div 
                      className="space-y-4"
                      key="editing"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        label="Full Name"
                        value={editForm.name || ''}
                        onChange={(e: any) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e: any) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                      <Input
                        label="Role"
                        value={editForm.role || ''}
                        onChange={(e: any) => setEditForm({ ...editForm, role: e.target.value })}
                      />
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={handleSave} disabled={isSaving}>
                            Save Changes
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="space-y-4"
                      key="viewing"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.img
                          src={profile.avatar || '/images/default-avatar.png'}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                        <div>
                          <motion.h2 
                            className="text-xl font-semibold text-gray-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {profile.name}
                          </motion.h2>
                          <motion.p 
                            className="text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {profile.email}
                          </motion.p>
                          <motion.span 
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                          >
                            {profile.role}
                          </motion.span>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="grid grid-cols-2 gap-4 pt-4 border-t"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div>
                          <p className="text-sm text-gray-500">Joined Date</p>
                          <p className="font-medium">{formatDate(profile.joinedDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Login</p>
                          <p className="font-medium">{formatDate(profile.lastLogin)}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card.Content>
            </Card>
          </motion.div>
          
          {/* Preferences */}
          <motion.div variants={itemVariants}>
            <Card>
              <Card.Header>
                <Card.Title>Preferences</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <span className="text-sm font-medium">Theme</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <span className="text-sm font-medium">Notifications</span>
                  <motion.input
                    type="checkbox"
                    checked={profile.preferences.notifications}
                    className="rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onChange={() => {/* Handle change */}}
                  />
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <span className="text-sm font-medium">Email Updates</span>
                  <motion.input
                    type="checkbox"
                    checked={profile.preferences.emailUpdates}
                    className="rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onChange={() => {/* Handle change */}}
                  />
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <span className="text-sm font-medium">Language</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </motion.div>
              </Card.Content>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center space-x-2">
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  🏆
                </motion.span>
                <span>
                  Achievements ({stats.completedAchievements}/{stats.totalAchievements})
                </span>
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {achievements.map((achievement, index) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    index={index}
                  />
                ))}
              </motion.div>
            </Card.Content>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
}