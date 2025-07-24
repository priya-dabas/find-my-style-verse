import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Coins, Star, Trophy, User } from 'lucide-react';
import { PlayerStats } from '../types/shop';

interface GameUIProps {
  playerStats: PlayerStats;
  onStatsUpdate: (stats: PlayerStats) => void;
}

export const GameUI = ({ playerStats }: GameUIProps) => {
  const experienceToNextLevel = playerStats.level * 100;
  const experienceProgress = (playerStats.experience % 100);

  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
        {/* Player Stats */}
        <Card className="gaming-card p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Level {playerStats.level}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-secondary" />
            <span className="font-bold text-secondary">{playerStats.coins}</span>
          </div>
          
          <div className="flex flex-col gap-1 min-w-[120px]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm">EXP: {playerStats.experience}</span>
            </div>
            <Progress value={experienceProgress} className="h-2" />
          </div>
        </Card>

        {/* Instructions */}
        <Card className="gaming-card p-4 max-w-md">
          <h3 className="font-bold text-primary mb-2 neon-text">🎮 How to Play</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Click on shops to enter and talk to AI shopkeepers</li>
            <li>• Discover items to earn coins and experience</li>
            <li>• Complete purchases to unlock achievements</li>
            <li>• Use mouse to navigate the 3D space</li>
          </ul>
        </Card>
      </div>

      {/* Achievements Panel */}
      {playerStats.achievements.length > 0 && (
        <div className="absolute bottom-4 right-4 z-10">
          <Card className="gaming-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-secondary">Achievements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {playerStats.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="pulse-glow">
                  {achievement}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Welcome Message */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="gaming-card p-4 floating-animation">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <div>
              <h2 className="font-bold text-lg neon-text text-primary">Welcome to Shopping Realm!</h2>
              <p className="text-sm text-muted-foreground">Explore 3 amazing shops and chat with AI shopkeepers</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};