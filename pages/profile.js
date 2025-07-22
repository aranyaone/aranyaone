import { memo, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockUserData } from '../data/mockData';
import { formatDate } from '../utils';

const AchievementCard = memo(function AchievementCard({ achievement }) {
  return (
    <Card className={`relative ${achievement.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${achievement.completed ? 'text-green-900' : 'text-gray-900'}`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${achievement.completed ? 'text-green-700' : 'text-gray-600'}`}>
            {achievement.description}
          </p>
          {achievement.completed ? (
            <p className="text-xs text-green-600 mt-1">
              Completed on {formatDate(achievement.date)}
            </p>
          ) : achievement.progress ? (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>
          ) : null}
        </div>
        {achievement.completed && (
          <div className="text-green-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </Card>
  );
});

const StatCard = memo(function StatCard({ title, value, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
  };
  
  return (
    <Card className="text-center">
      <div className={`text-3xl mb-2 ${colorClasses[color]}`}>{icon}</div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </Card>
  );
});

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  
  useEffect(() => {
    // Simulate API calls with mock data
    setProfile(mockUserData.profile);
    setAchievements(mockUserData.achievements);
    setEditForm(mockUserData.profile);
  }, []);
  
  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
    console.log('Saving profile:', editForm);
  };
  
  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };
  
  if (!profile) {
    return (
      <Layout title="Profile - Aranya One">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading profile...</div>
        </div>
      </Layout>
    );
  }
  
  const completedAchievements = achievements.filter(a => a.completed).length;
  const totalAchievements = achievements.length;
  
  return (
    <Layout title="Profile - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👤 Profile</h1>
            <p className="text-gray-600">Manage your empire profile and achievements</p>
          </div>
          
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? '💾 Save' : '✏️ Edit Profile'}
          </Button>
        </div>
        
        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Days Active"
            value={Math.floor((new Date() - new Date(profile.joinedDate)) / (1000 * 60 * 60 * 24))}
            icon="📅"
            color="blue"
          />
          <StatCard
            title="Achievements"
            value={`${completedAchievements}/${totalAchievements}`}
            icon="🏆"
            color="yellow"
          />
          <StatCard
            title="Services Used"
            value="8"
            icon="⚙️"
            color="green"
          />
          <StatCard
            title="Profile Level"
            value="Pro"
            icon="⭐"
            color="purple"
          />
        </div>
        
        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <Card.Title>Profile Information</Card.Title>
              </Card.Header>
              <Card.Content>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <Input
                      label="Role"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={profile.avatar || '/images/default-avatar.png'}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full bg-gray-200"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                        <p className="text-gray-600">{profile.email}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {profile.role}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">Joined Date</p>
                        <p className="font-medium">{formatDate(profile.joinedDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Login</p>
                        <p className="font-medium">{formatDate(profile.lastLogin)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
          
          {/* Preferences */}
          <Card>
            <Card.Header>
              <Card.Title>Preferences</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Notifications</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.notifications}
                  className="rounded"
                  onChange={() => {/* Handle change */}}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Updates</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.emailUpdates}
                  className="rounded"
                  onChange={() => {/* Handle change */}}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Language</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </Card.Content>
          </Card>
        </div>
        
        {/* Achievements */}
        <Card>
          <Card.Header>
            <Card.Title>🏆 Achievements ({completedAchievements}/{totalAchievements})</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </Layout>
  );
}