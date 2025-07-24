import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  Sparkles, 
  Volume2,
  VolumeX,
  Send
} from 'lucide-react';
import { ShopData, PlayerStats, GameEvent } from '../types/shop';
import { toast } from 'sonner';

interface AIShopkeeperProps {
  shop: ShopData;
  onClose: () => void;
  playerStats: PlayerStats;
  onStatsUpdate: (stats: PlayerStats) => void;
}

export const AIShopkeeper = ({ shop, onClose, playerStats, onStatsUpdate }: AIShopkeeperProps) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'shopkeeper', content: string}>>([]);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    // Initialize conversation with shopkeeper greeting
    setConversation([
      { role: 'shopkeeper', content: shop.shopkeeper.greeting }
    ]);
  }, [shop]);

  const simulateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Item search responses
    for (const section of shop.sections) {
      for (const item of section.items) {
        if (message.includes(item.toLowerCase())) {
          return `Great choice! The ${item} is one of our best sellers in the ${section.name} section. It's available for 50 coins. Would you like to know more about it?`;
        }
      }
    }
    
    // Section responses
    for (const section of shop.sections) {
      if (message.includes(section.name.toLowerCase())) {
        return `Our ${section.name} section has: ${section.items.join(', ')}. Each item is carefully curated for quality and style. What catches your eye?`;
      }
    }
    
    // General responses based on shop theme
    if (message.includes('help') || message.includes('recommend')) {
      const randomSection = shop.sections[Math.floor(Math.random() * shop.sections.length)];
      return `I'd recommend checking out our ${randomSection.name} section. We have amazing ${randomSection.items[0]} that's really popular right now!`;
    }
    
    if (message.includes('buy') || message.includes('purchase')) {
      return `I'd be happy to help you with a purchase! Just let me know which item you're interested in. All items are 50 coins each.`;
    }
    
    // Default responses by shop personality
    const responses = {
      western: [
        "That's a cool question! What style are you going for?",
        "Awesome! I love helping customers find their perfect look.",
        "You've got great taste! Let me show you our latest arrivals."
      ],
      ethnic: [
        "That's wonderful! Traditional wear tells such beautiful stories.",
        "I'm delighted to help you explore our ethnic collection.",
        "Each piece in our collection has its own cultural significance."
      ],
      home: [
        "That's exciting! A beautiful home reflects your personality.",
        "I love helping people create their dream spaces!",
        "Great question! Let me help you find the perfect piece."
      ]
    };
    
    const themeResponses = responses[shop.theme];
    return themeResponses[Math.floor(Math.random() * themeResponses.length)];
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(userMessage);
      setConversation(prev => [...prev, { role: 'shopkeeper', content: aiResponse }]);
      
      // Award experience for conversation
      const newStats = {
        ...playerStats,
        experience: playerStats.experience + 5
      };
      
      if (newStats.experience >= newStats.level * 100) {
        newStats.level += 1;
        newStats.experience = 0;
        toast(`🎉 Level up! You're now level ${newStats.level}!`);
      }
      
      onStatsUpdate(newStats);
    }, 1000);
  };

  const handlePurchase = (item: string, sectionName: string) => {
    if (playerStats.coins < 50) {
      toast('❌ Not enough coins! You need 50 coins.');
      return;
    }
    
    const newStats = {
      ...playerStats,
      coins: playerStats.coins - 50,
      experience: playerStats.experience + 20,
      achievements: [...playerStats.achievements]
    };
    
    // Add achievement for first purchase in each shop
    const achievementKey = `first-${shop.theme}-purchase`;
    if (!newStats.achievements.includes(achievementKey)) {
      newStats.achievements.push(`First ${shop.name} Purchase`);
    }
    
    // Level up check
    if (newStats.experience >= newStats.level * 100) {
      newStats.level += 1;
      newStats.experience = newStats.experience % 100;
      toast(`🎉 Level up! You're now level ${newStats.level}!`);
    }
    
    onStatsUpdate(newStats);
    toast(`✅ Purchased ${item} for 50 coins! +20 EXP`);
    
    // Add purchase message to conversation
    setConversation(prev => [...prev, 
      { role: 'user', content: `I'd like to buy the ${item}` },
      { role: 'shopkeeper', content: `Excellent choice! The ${item} is yours. Thank you for shopping with us! 🛍️` }
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="gaming-card w-full max-w-4xl h-[80vh] m-4 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: shop.color }}
              >
                {shop.theme === 'western' ? '🤠' : shop.theme === 'ethnic' ? '👗' : '🏠'}
              </div>
              <div>
                <h2 className="text-2xl font-bold neon-text" style={{ color: shop.color }}>
                  {shop.shopkeeper.name}
                </h2>
                <p className="text-muted-foreground">{shop.name} Specialist</p>
                <Badge variant="secondary" className="mt-1">
                  {shop.shopkeeper.personality}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={isVoiceEnabled ? 'bg-primary/20' : ''}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Ask ${shop.shopkeeper.name} about products...`}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Shop Sections */}
          <div className="w-80 border-l border-border p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Shop Sections</h3>
            </div>
            
            <div className="space-y-4">
              {shop.sections.map((section, index) => (
                <Card
                  key={section.name}
                  className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                    selectedSection === section.name ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedSection(
                    selectedSection === section.name ? null : section.name
                  )}
                >
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: shop.color }} />
                    {section.name}
                  </h4>
                  
                  {selectedSection === section.name && (
                    <div className="space-y-2 mt-3">
                      <Separator />
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-2 rounded bg-muted/50"
                        >
                          <span className="text-sm">{item}</span>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePurchase(item, section.name);
                            }}
                            disabled={playerStats.coins < 50}
                          >
                            50 🪙
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
