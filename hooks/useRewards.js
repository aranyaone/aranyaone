import { useState, useEffect, useCallback } from 'react';

// Hook for generating and managing reward codes
export const useRewardCodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate a single reward code
  const generateCode = useCallback(async (type = 'discount', value = 10, expiresIn = 30) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock code generation - replace with real API call
      const code = generateRandomCode(type);
      
      const newCode = {
        id: Date.now(),
        code,
        type, // 'discount', 'trial', 'feature', 'credit'
        value,
        expiresAt: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        usedAt: null,
        usedBy: null,
        isActive: true
      };

      setCodes(prev => [...prev, newCode]);
      return newCode;
      
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate multiple codes
  const generateBulkCodes = useCallback(async (count = 10, type = 'discount', value = 10, expiresIn = 30) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCodes = [];
      
      for (let i = 0; i < count; i++) {
        const code = generateRandomCode(type);
        newCodes.push({
          id: Date.now() + i,
          code,
          type,
          value,
          expiresAt: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          usedAt: null,
          usedBy: null,
          isActive: true
        });
      }

      setCodes(prev => [...prev, ...newCodes]);
      return newCodes;
      
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Validate a reward code
  const validateCode = useCallback(async (code) => {
    const rewardCode = codes.find(c => c.code === code.toUpperCase());
    
    if (!rewardCode) {
      return { valid: false, error: 'Invalid code' };
    }

    if (!rewardCode.isActive) {
      return { valid: false, error: 'Code is inactive' };
    }

    if (rewardCode.usedAt) {
      return { valid: false, error: 'Code already used' };
    }

    if (new Date(rewardCode.expiresAt) < new Date()) {
      return { valid: false, error: 'Code has expired' };
    }

    return { 
      valid: true, 
      code: rewardCode,
      reward: {
        type: rewardCode.type,
        value: rewardCode.value,
        description: getRewardDescription(rewardCode)
      }
    };
  }, [codes]);

  // Redeem a reward code
  const redeemCode = useCallback(async (code, userId) => {
    const validation = await validateCode(code);
    
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Mark code as used
    setCodes(prev => prev.map(c => 
      c.code === code.toUpperCase() 
        ? { ...c, usedAt: new Date().toISOString(), usedBy: userId }
        : c
    ));

    // In production, apply the reward to user account
    return {
      success: true,
      reward: validation.reward,
      message: `Reward applied: ${validation.reward.description}`
    };
  }, [validateCode]);

  // Deactivate a code
  const deactivateCode = useCallback((codeId) => {
    setCodes(prev => prev.map(c => 
      c.id === codeId ? { ...c, isActive: false } : c
    ));
  }, []);

  return {
    codes,
    loading,
    error,
    generateCode,
    generateBulkCodes,
    validateCode,
    redeemCode,
    deactivateCode
  };
};

// Hook for managing user rewards and achievements
export const useRewards = (userId) => {
  const [userRewards, setUserRewards] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserRewards(userId);
    }
  }, [userId]);

  const loadUserRewards = async (userId) => {
    setLoading(true);
    try {
      // Mock user rewards - replace with real API call
      const mockRewards = [
        {
          id: 1,
          type: 'login_streak',
          title: 'Login Streak',
          description: '7 days login streak',
          points: 100,
          earnedAt: '2024-01-10T00:00:00.000Z',
          icon: '🔥'
        },
        {
          id: 2,
          type: 'referral',
          title: 'Referral Master',
          description: 'Referred 5 users',
          points: 500,
          earnedAt: '2024-01-15T00:00:00.000Z',
          icon: '🤝'
        }
      ];

      setUserRewards(mockRewards);
      setPoints(mockRewards.reduce((sum, r) => sum + r.points, 0));
      setLevel(Math.floor(points / 1000) + 1);
      
    } catch (error) {
      console.error('Error loading user rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const awardPoints = useCallback((amount, reason) => {
    const newReward = {
      id: Date.now(),
      type: 'points',
      title: 'Points Earned',
      description: reason,
      points: amount,
      earnedAt: new Date().toISOString(),
      icon: '⭐'
    };

    setUserRewards(prev => [...prev, newReward]);
    setPoints(prev => {
      const newPoints = prev + amount;
      setLevel(Math.floor(newPoints / 1000) + 1);
      return newPoints;
    });

    return newReward;
  }, []);

  const checkAchievements = useCallback(() => {
    // Mock achievement checking logic
    const newAchievements = [];

    if (userRewards.length >= 5 && !achievements.find(a => a.type === 'collector')) {
      newAchievements.push({
        id: Date.now(),
        type: 'collector',
        title: 'Reward Collector',
        description: 'Earned 5 rewards',
        unlockedAt: new Date().toISOString(),
        icon: '🏆'
      });
    }

    if (points >= 1000 && !achievements.find(a => a.type === 'thousand')) {
      newAchievements.push({
        id: Date.now() + 1,
        type: 'thousand',
        title: 'Point Master',
        description: 'Earned 1000 points',
        unlockedAt: new Date().toISOString(),
        icon: '💎'
      });
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }

    return newAchievements;
  }, [userRewards, points, achievements]);

  return {
    userRewards,
    achievements,
    points,
    level,
    loading,
    awardPoints,
    checkAchievements,
    pointsToNextLevel: 1000 - (points % 1000)
  };
};

// Helper functions
function generateRandomCode(type) {
  const prefixes = {
    discount: 'SAVE',
    trial: 'TRIAL',
    feature: 'UNLOCK',
    credit: 'CREDIT'
  };
  
  const prefix = prefixes[type] || 'REWARD';
  const suffix = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return `${prefix}${suffix}`;
}

function getRewardDescription(code) {
  const descriptions = {
    discount: `${code.value}% discount on your next purchase`,
    trial: `${code.value} days free trial`,
    feature: `Unlock premium feature for ${code.value} days`,
    credit: `$${code.value} account credit`
  };
  
  return descriptions[code.type] || `${code.value} reward points`;
}