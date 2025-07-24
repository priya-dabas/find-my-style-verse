import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Mic, 
  MicOff,
  ShoppingBag, 
  Sparkles,
  Phone,
  PhoneOff
} from 'lucide-react';
import { ShopData, PlayerStats } from '../types/shop';
import { toast } from 'sonner';

interface VoiceShopkeeperProps {
  shop: ShopData;
  onClose: () => void;
  playerStats: PlayerStats;
  onStatsUpdate: (stats: PlayerStats) => void;
}

// Shopkeeper avatars based on theme
const getShopkeeperAvatar = (theme: string, name: string) => {
  const avatars = {
    western: {
      Alex: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    ethnic: {
      Priya: "https://images.unsplash.com/photo-1494790108755-2616c0763045?w=150&h=150&fit=crop&crop=face"
    },
    home: {
      Maya: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  };
  
  return avatars[theme]?.[name] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
};

export const VoiceShopkeeper = ({ shop, onClose, playerStats, onStatsUpdate }: VoiceShopkeeperProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(shop.shopkeeper.greeting);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  
  // Mock voice conversation state
  const conversationRef = useRef<any>(null);

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast('❌ Please enter your ElevenLabs API key');
      return;
    }
    setShowApiKeyInput(false);
    initializeVoiceChat();
  };

  const initializeVoiceChat = async () => {
    try {
      // In a real implementation, you would use the ElevenLabs API here
      // For now, we'll simulate the voice interaction
      setIsConnected(true);
      toast('🎤 Voice chat connected! Click to talk with ' + shop.shopkeeper.name);
      
      // Simulate speaking the greeting
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1000);
      
    } catch (error) {
      toast('❌ Failed to connect voice chat. Please check your API key.');
    }
  };

  const toggleListening = () => {
    if (!isConnected) return;
    
    setIsListening(!isListening);
    
    if (!isListening) {
      // Start listening
      toast('🎤 Listening... Speak to ' + shop.shopkeeper.name);
      
      // Simulate conversation after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        simulateResponse();
      }, 3000);
    }
  };

  const simulateResponse = () => {
    const responses = {
      western: [
        "Awesome! I can help you find the perfect Western wear. What style are you looking for?",
        "Great choice! Our t-shirts and jeans are trending right now. Want to see some options?",
        "Cool! I love helping customers find their perfect look. Check out our latest arrivals!"
      ],
      ethnic: [
        "Wonderful! Traditional wear is so beautiful. What occasion are you shopping for?",
        "Perfect! Our sarees and kurtis are handpicked for quality. Would you like to see our collection?",
        "Lovely! Each piece tells a story. Let me show you our finest ethnic wear."
      ],
      home: [
        "Fantastic! Home decor is my passion. What room are you decorating?",
        "Exciting! Beautiful spaces reflect your personality. What's your style preference?",
        "Amazing! I have perfect pieces that will transform your space. Let's explore!"
      ]
    };
    
    const themeResponses = responses[shop.theme];
    const response = themeResponses[Math.floor(Math.random() * themeResponses.length)];
    
    setCurrentMessage(response);
    setIsSpeaking(true);
    
    // Award experience for voice interaction
    const newStats = {
      ...playerStats,
      experience: playerStats.experience + 10
    };
    
    if (newStats.experience >= newStats.level * 100) {
      newStats.level += 1;
      newStats.experience = 0;
      toast(`🎉 Level up! You're now level ${newStats.level}!`);
    }
    
    onStatsUpdate(newStats);
    
    setTimeout(() => setIsSpeaking(false), 4000);
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
    
    // Voice feedback
    setCurrentMessage(`Excellent choice! The ${item} is yours. Thank you for shopping with us! 🛍️`);
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  if (showApiKeyInput) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <Card className="gaming-card w-full max-w-md m-4 p-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold neon-text">Voice Chat Setup</h2>
            <p className="text-muted-foreground">
              To enable voice chat with {shop.shopkeeper.name}, please enter your ElevenLabs API key:
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter ElevenLabs API key..."
              className="w-full p-3 rounded bg-muted border border-border text-foreground"
            />
            <div className="flex gap-2">
              <Button onClick={handleApiKeySubmit} className="flex-1">
                Connect Voice Chat
              </Button>
              <Button variant="outline" onClick={onClose}>
                Skip & Use Text
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="gaming-card w-full max-w-4xl h-[80vh] m-4 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4" style={{ borderColor: shop.color }}>
                  <AvatarImage 
                    src={getShopkeeperAvatar(shop.theme, shop.shopkeeper.name)} 
                    alt={shop.shopkeeper.name}
                  />
                  <AvatarFallback style={{ backgroundColor: shop.color }}>
                    {shop.shopkeeper.name[0]}
                  </AvatarFallback>
                </Avatar>
                
                {/* Speaking indicator */}
                {isSpeaking && (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold neon-text" style={{ color: shop.color }}>
                  {shop.shopkeeper.name}
                </h2>
                <p className="text-muted-foreground">{shop.name} Specialist</p>
                <Badge variant="secondary" className="mt-1">
                  {shop.shopkeeper.personality}
                </Badge>
                
                {/* Connection status */}
                <div className="flex items-center gap-2 mt-2">
                  {isConnected ? (
                    <>
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Voice Connected</span>
                    </>
                  ) : (
                    <>
                      <PhoneOff className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">Voice Disconnected</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Voice Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Current Message Display */}
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg max-w-2xl">
                  <p className="text-lg">{currentMessage}</p>
                </div>
                
                {/* Voice Controls */}
                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={toggleListening}
                    disabled={!isConnected}
                    className={`w-20 h-20 rounded-full ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-primary hover:bg-primary/80'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    {isListening 
                      ? 'Listening... Click to stop' 
                      : isConnected 
                        ? 'Click to talk with ' + shop.shopkeeper.name
                        : 'Voice chat disconnected'
                    }
                  </p>
                </div>
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
