export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  emailUpdates: boolean;
  language: 'en' | 'es' | 'fr';
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinedDate: Date;
  lastLogin: Date;
  preferences: UserPreferences;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  date?: Date;
  progress?: number;
}

export interface ProfileStats {
  daysActive: number;
  completedAchievements: number;
  totalAchievements: number;
  servicesUsed: number;
  profileLevel: string;
}

export interface ProfileData {
  profile: UserProfile;
  achievements: Achievement[];
  stats: ProfileStats;
}

export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  role?: string;
  preferences?: Partial<UserPreferences>;
}

export interface ProfileApiResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}