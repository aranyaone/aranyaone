import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileApiResponse, ProfileData } from '../../types/profile';

// Mock data based on the existing mockUserData
const mockProfileData: ProfileData = {
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileApiResponse>
) {
  if (req.method === 'GET') {
    // Simulate API delay for realistic behavior
    setTimeout(() => {
      res.status(200).json({
        success: true,
        data: mockProfileData,
      });
    }, 500);
  } else if (req.method === 'PUT') {
    // Handle profile updates
    const { name, email, role, preferences } = req.body;
    
    // In a real implementation, you would update the database here
    const updatedProfile = {
      ...mockProfileData.profile,
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(preferences && { preferences: { ...mockProfileData.profile.preferences, ...preferences } }),
    };
    
    res.status(200).json({
      success: true,
      data: {
        ...mockProfileData,
        profile: updatedProfile,
      },
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`,
    });
  }
}