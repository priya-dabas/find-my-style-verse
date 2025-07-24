import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { ShopData, PlayerStats, Product } from '../types/shop';
import { useToast } from '@/hooks/use-toast';
import { ProductDisplay } from './ProductDisplay';

interface VoiceAvatarShopkeeperProps {
  shop: ShopData;
  onClose: () => void;
  playerStats: PlayerStats;
  onStatsUpdate: (stats: PlayerStats) => void;
}

export const VoiceAvatarShopkeeper = ({ shop, onClose, playerStats, onStatsUpdate }: VoiceAvatarShopkeeperProps) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(shop.shopkeeper.greeting);
  const [conversationLog, setConversationLog] = useState<Array<{speaker: string, message: string}>>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Speak initial greeting
    if (isVoiceEnabled) {
      speakMessage(shop.shopkeeper.greeting);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const speakMessage = (message: string) => {
    if (!isVoiceEnabled) return;
    
    speechSynthesis.cancel();
    synthesisRef.current = new SpeechSynthesisUtterance(message);
    synthesisRef.current.rate = 0.9;
    synthesisRef.current.pitch = shop.theme === 'ethnic' ? 1.1 : shop.theme === 'home' ? 0.9 : 1.0;
    
    // Try to use a voice that matches the shopkeeper's personality
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Google UK English Female'));
    const maleVoice = voices.find(voice => voice.name.includes('Male') || voice.name.includes('Google UK English Male'));
    
    if (shop.shopkeeper.name === 'Priya' && femaleVoice) {
      synthesisRef.current.voice = femaleVoice;
    } else if (shop.shopkeeper.name === 'Maya' && femaleVoice) {
      synthesisRef.current.voice = femaleVoice;
    } else if (maleVoice) {
      synthesisRef.current.voice = maleVoice;
    }
    
    speechSynthesis.speak(synthesisRef.current);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    console.log('Voice input:', transcript);
    setConversationLog(prev => [...prev, { speaker: 'You', message: transcript }]);
    
    // Process the voice input and generate response
    const response = generateAIResponse(transcript);
    setCurrentMessage(response);
    setConversationLog(prev => [...prev, { speaker: shop.shopkeeper.name, message: response }]);
    
    if (isVoiceEnabled) {
      speakMessage(response);
    }

    // Award experience for voice interaction
    const newStats = {
      ...playerStats,
      experience: playerStats.experience + 3
    };
    onStatsUpdate(newStats);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Product-specific responses
    for (const section of shop.sections) {
      for (const product of section.products) {
        if (lowerInput.includes(product.name.toLowerCase())) {
          return `Great choice! The ${product.name} is ${product.price} coins. ${product.description} Would you like to try it on or purchase it?`;
        }
      }
    }
    
    // Category responses
    for (const section of shop.sections) {
      if (lowerInput.includes(section.name.toLowerCase())) {
        return `Our ${section.name} collection has ${section.products.length} amazing items. Let me show you our bestsellers!`;
      }
    }
    
    // General responses based on shop theme
    if (lowerInput.includes('help') || lowerInput.includes('recommend')) {
      return `I'd love to help you find something perfect! What style are you looking for today?`;
    }
    
    if (lowerInput.includes('buy') || lowerInput.includes('purchase')) {
      return `Excellent! Which item would you like to purchase? I can show you all our available products.`;
    }
    
    if (lowerInput.includes('try on') || lowerInput.includes('fit')) {
      return `Of course! You can try on any item by clicking the question mark icon. It's a great way to see how it looks!`;
    }
    
    // Default responses by theme
    const responses = {
      western: [
        "That's awesome! What kind of Western style are you going for?",
        "Cool! I love helping customers find their perfect look.",
        "Great question! Let me show you our latest arrivals."
      ],
      ethnic: [
        "Wonderful! Traditional wear has such beautiful stories.",
        "I'm delighted to help you explore our ethnic collection.",
        "Each piece has its own cultural significance. What interests you?"
      ],
      home: [
        "That's exciting! Your home should reflect your personality.",
        "I love helping people create their dream spaces!",
        "Great question! Let me help you find the perfect piece."
      ]
    };
    
    const themeResponses = responses[shop.theme];
    return themeResponses[Math.floor(Math.random() * themeResponses.length)];
  };

  const handlePurchase = (product: Product) => {
    if (playerStats.coins < product.price) {
      const message = `Sorry, you need ${product.price} coins for the ${product.name}. You currently have ${playerStats.coins} coins.`;
      setCurrentMessage(message);
      if (isVoiceEnabled) speakMessage(message);
      toast({
        title: "Not enough coins!",
        description: `You need ${product.price} coins.`,
        variant: "destructive",
      });
      return;
    }
    
    const newStats = {
      ...playerStats,
      coins: playerStats.coins - product.price,
      experience: playerStats.experience + 20,
      inventory: [...playerStats.inventory, product]
    };
    
    if (newStats.experience >= newStats.level * 100) {
      newStats.level += 1;
      newStats.experience = newStats.experience % 100;
      toast({
        title: "Level Up!",
        description: `You're now level ${newStats.level}!`,
      });
    }
    
    onStatsUpdate(newStats);
    
    const message = `Excellent purchase! You bought the ${product.name} for ${product.price} coins. Thank you for shopping with us!`;
    setCurrentMessage(message);
    if (isVoiceEnabled) speakMessage(message);
    
    toast({
      title: "Purchase successful!",
      description: `Purchased ${product.name} for ${product.price} coins! +20 EXP`,
    });
  };

  const handleTryOn = (product: Product) => {
    const message = `Here's how the ${product.name} looks on you! What do you think? Would you like to purchase it?`;
    setCurrentMessage(message);
    if (isVoiceEnabled) speakMessage(message);
    
    toast({
      title: "Virtual Try-On",
      description: `Trying on ${product.name}`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Avatar and Controls */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* 3D Avatar Placeholder */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg border-4"
                    style={{ 
                      backgroundColor: shop.color,
                      borderColor: shop.color 
                    }}
                  >
                    {shop.theme === 'western' ? '🤠' : shop.theme === 'ethnic' ? '👩🏽‍💼' : '👩🏼‍🎨'}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: shop.color }}>
                      {shop.shopkeeper.name}
                    </h2>
                    <p className="text-muted-foreground">{shop.name} Specialist</p>
                    <Badge variant="secondary" className="mt-1">
                      Voice AI Assistant
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
                  
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="icon"
                    onClick={isListening ? stopListening : startListening}
                    className={isListening ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Current Message Display */}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 mt-1 text-primary" />
                  <p className="text-sm leading-relaxed">{currentMessage}</p>
                </div>
              </div>
              
              {/* Voice Instructions */}
              <div className="mt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  {isListening ? "🎤 Listening... Speak now!" : "Click the microphone to ask me anything about our products!"}
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Product Displays */}
          <div className="space-y-6">
            {shop.sections.map((section) => (
              <ProductDisplay
                key={section.name}
                products={section.products}
                categoryName={section.name}
                onPurchase={handlePurchase}
                onTryOn={handleTryOn}
                playerCoins={playerStats.coins}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};