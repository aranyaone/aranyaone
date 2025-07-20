import { useState, useEffect } from 'react';
import { useRewards } from '../../hooks/useRewards';

const UserRewardsPanel = ({ userId }) => {
  const { 
    userRewards, 
    achievements, 
    points, 
    level, 
    loading, 
    awardPoints, 
    checkAchievements,
    pointsToNextLevel 
  } = useRewards(userId);

  const [redeemCode, setRedeemCode] = useState('');
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    // Check for new achievements when rewards change
    checkAchievements();
  }, [userRewards, checkAchievements]);

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) return;
    
    setRedeeming(true);
    try {
      // Mock code redemption - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful redemption
      awardPoints(100, `Redeemed code: ${redeemCode}`);
      setRedeemCode('');
      
    } catch (error) {
      console.error('Redemption failed:', error);
    } finally {
      setRedeeming(false);
    }
  };

  const getLevelColor = (level) => {
    const colors = [
      'text-gray-600', // Level 1
      'text-blue-600', // Level 2
      'text-green-600', // Level 3
      'text-purple-600', // Level 4
      'text-yellow-600', // Level 5+
    ];
    return colors[Math.min(level - 1, colors.length - 1)];
  };

  const getLevelBadge = (level) => {
    if (level >= 5) return '👑';
    if (level >= 4) return '💎';
    if (level >= 3) return '🏆';
    if (level >= 2) return '⭐';
    return '🌟';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Level and Points Overview */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            🎯 Your Rewards Status
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getLevelBadge(level)}</span>
            <span className={`text-xl font-bold ${getLevelColor(level)}`}>
              Level {level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{points.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{userRewards.length}</div>
            <div className="text-sm text-gray-600">Rewards Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{achievements.length}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>

        {/* Progress to next level */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to Level {level + 1}</span>
            <span>{pointsToNextLevel} points needed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((1000 - pointsToNextLevel) / 1000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Code Redemption */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          🎁 Redeem Reward Code
        </h4>
        <div className="flex space-x-4">
          <input
            type="text"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
            placeholder="Enter reward code..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            disabled={redeeming}
          />
          <button
            onClick={handleRedeemCode}
            disabled={!redeemCode.trim() || redeeming}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {redeeming ? 'Redeeming...' : 'Redeem'}
          </button>
        </div>
      </div>

      {/* Recent Rewards */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          🏆 Recent Rewards
        </h4>
        
        {userRewards.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎁</div>
            <p>No rewards earned yet.</p>
            <p className="text-sm mt-1">Complete activities to start earning!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userRewards.slice(0, 5).map((reward) => (
              <div 
                key={reward.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{reward.title}</div>
                    <div className="text-sm text-gray-600">{reward.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">+{reward.points}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(reward.earnedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            
            {userRewards.length > 5 && (
              <div className="text-center pt-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View all {userRewards.length} rewards →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            🏅 Achievements Unlocked
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg"
              >
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                  <div className="text-xs text-yellow-600">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ways to Earn */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          💡 Ways to Earn Points
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📅</span>
              <span className="font-medium">Daily Login</span>
            </div>
            <div className="text-sm text-gray-600">+10 points per day</div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🤝</span>
              <span className="font-medium">Refer Friends</span>
            </div>
            <div className="text-sm text-gray-600">+500 points per referral</div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📝</span>
              <span className="font-medium">Write Reviews</span>
            </div>
            <div className="text-sm text-gray-600">+50 points per review</div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">💳</span>
              <span className="font-medium">Make Purchases</span>
            </div>
            <div className="text-sm text-gray-600">+1 point per $1 spent</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserRewardsPanel;