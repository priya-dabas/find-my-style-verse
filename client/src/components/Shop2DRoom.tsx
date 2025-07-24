import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ShoppingCart, Star, ArrowLeft, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { ShopData, PlayerStats, Product } from '../types/shop';
import { VirtualTryOnModal } from './VirtualTryOnModal';
import { useToast } from '@/hooks/use-toast';

interface Shop2DRoomProps {
  shop: ShopData;
  onBack: () => void;
  playerStats: PlayerStats;
  onStatsUpdate: (stats: PlayerStats) => void;
}

export const Shop2DRoom = ({ shop, onBack, playerStats, onStatsUpdate }: Shop2DRoomProps) => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showTryOnModal, setShowTryOnModal] = useState<Product | null>(null);
  const [meeraMessage, setMeeraMessage] = useState("Hello, I'm Meera! How can I help you?");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [tryOnResult, setTryOnResult] = useState<{imageUrl: string, message: string} | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handlePurchase = (product: Product) => {
    if (playerStats.coins < product.price) {
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
    toast({
      title: "Purchase successful!",
      description: `Purchased ${product.name} for ${product.price} coins! +20 EXP`,
    });
  };

  // Initialize speech recognition and voice functionality
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Indian English

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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      speechSynthesis.cancel();
    };
  }, []);

  const speakMessage = (message: string) => {
    if (!isVoiceEnabled) return;
    
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1.1; // Higher pitch for female voice
    utterance.volume = 0.8;
    
    // Try to use Indian English or female voice
    const voices = speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      voice.name.toLowerCase().includes('indian') ||
      voice.name.toLowerCase().includes('female')
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
    }
    
    speechSynthesis.speak(utterance);
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

  const handleVoiceInput = async (transcript: string) => {
    console.log('Voice input:', transcript);
    
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: transcript,
          shopContext: { name: shop.name, theme: shop.theme },
          productContext: shop.sections.map(s => ({ name: s.name, products: s.products.map(p => p.name) }))
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMeeraMessage(data.response);
        if (isVoiceEnabled) {
          speakMessage(data.response);
        }
      }
    } catch (error) {
      console.error('Voice chat error:', error);
      const fallbackResponse = "I'm sorry, I didn't catch that. Could you please repeat your question?";
      setMeeraMessage(fallbackResponse);
      if (isVoiceEnabled) {
        speakMessage(fallbackResponse);
      }
    }
  };

  const handleTryOn = (product: Product) => {
    setShowTryOnModal(product);
  };

  const handleTryOnComplete = (imageUrl: string, message: string) => {
    setTryOnResult({ imageUrl, message });
    toast({
      title: "Virtual Try-On Complete!",
      description: message,
    });
    if (isVoiceEnabled) {
      speakMessage(message);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const ProductShelf = ({ products, categoryName, position }: { products: Product[], categoryName: string, position: string }) => (
    <div className={`absolute ${position}`}>
      <div className="bg-amber-900 p-2 rounded-t-lg border-2 border-amber-800">
        <h3 className="text-white font-bold text-sm text-center">{categoryName}</h3>
      </div>
      <div className="bg-amber-700 p-3 rounded-b-lg border-2 border-amber-800 border-t-0">
        <div className="grid grid-cols-5 gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="w-16 h-16 bg-white rounded border-2 border-gray-300 flex items-center justify-center text-2xl hover:border-yellow-400 transition-all duration-200 group-hover:scale-110">
                {categoryName.includes('T-shirt') && '👕'}
                {categoryName.includes('Jeans') && '👖'}
                {categoryName.includes('Cap') && '🧢'}
                {categoryName.includes('Shoe') && '👟'}
                {categoryName.includes('Saree') && '🥻'}
                {categoryName.includes('Kurti') && '👗'}
                {categoryName.includes('Sherwani') && '🤵'}
                {categoryName.includes('Jooti') && '👞'}
                {categoryName.includes('Lamp') && '💡'}
                {categoryName.includes('Paint') && '🖼️'}
                {categoryName.includes('Plant') && '🪴'}
                {categoryName.includes('Rug') && '🏠'}
              </div>
              
              {/* Try-On Button */}
              <Button
                size="sm"
                variant="outline"
                className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-white border-2 border-yellow-400 hover:bg-yellow-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTryOn(product);
                }}
              >
                <HelpCircle className="w-3 h-3 text-yellow-600" />
              </Button>
              
              {/* Price Tag */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className="text-xs px-1 py-0 bg-green-600 text-white">
                  ₹{product.price}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="bg-white/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mall
          </Button>
          
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
            <h1 className="text-xl font-bold">SHOP - {shop.id === 'western' ? '1' : shop.id === 'ethnic' ? '2' : '3'} ({shop.name.toUpperCase()})</h1>
          </div>
          
          <div className="flex gap-2">
            <Badge className="bg-yellow-500 text-black">💰 {playerStats.coins}</Badge>
            <Badge className="bg-blue-500">⭐ Level {playerStats.level}</Badge>
          </div>
        </div>
      </div>

      {/* 2D Room Layout */}
      <div className="relative w-full h-screen pt-20">
        {/* Floor */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-amber-800 to-amber-600 border-t-4 border-amber-900"></div>
        
        {/* Back Wall */}
        <div className="absolute top-20 w-full h-2/3 bg-gradient-to-b from-orange-300 to-orange-400"></div>
        
        {/* Shop Sign */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-black text-white px-8 py-2 rounded-lg border-4 border-yellow-400">
          <h2 className="text-2xl font-bold">{shop.name.toUpperCase()}</h2>
        </div>

        {/* Meera - AI Assistant in Center */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative">
            {/* Meera Avatar */}
            <div 
              className="w-24 h-32 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full border-4 border-white shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-1">👩🏻‍💼</div>
              <div className="text-xs font-bold text-gray-700">MEERA</div>
            </div>
            
            {/* Speech Bubble */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-3 border-2 border-gray-300 shadow-lg min-w-48 max-w-64">
              <p className="text-sm font-medium text-center">{meeraMessage}</p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white"></div>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`${isVoiceEnabled ? 'bg-green-100 border-green-400' : 'bg-gray-100'} p-1`}
              >
                {isVoiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              </Button>
              
              <Button
                size="sm"
                variant={isListening ? "default" : "outline"}
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-100 border-blue-400'} p-1`}
              >
                {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
              </Button>
            </div>
            
            {/* Voice Instructions */}
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-xs text-gray-600 whitespace-nowrap">
                {isListening ? "🎤 Listening..." : "Click mic to talk"}
              </p>
            </div>
          </div>
        </div>

        {/* Product Shelves Layout */}
        {shop.sections.length >= 4 && (
          <>
            {/* Top Left Shelf */}
            <ProductShelf 
              products={shop.sections[0].products} 
              categoryName={shop.sections[0].name}
              position="top-32 left-8"
            />
            
            {/* Top Right Shelf */}
            <ProductShelf 
              products={shop.sections[1].products} 
              categoryName={shop.sections[1].name}
              position="top-32 right-8"
            />
            
            {/* Bottom Left Shelf */}
            <ProductShelf 
              products={shop.sections[2].products} 
              categoryName={shop.sections[2].name}
              position="bottom-16 left-8"
            />
            
            {/* Bottom Right Shelf */}
            <ProductShelf 
              products={shop.sections[3].products} 
              categoryName={shop.sections[3].name}
              position="bottom-16 right-8"
            />
          </>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-28 left-4 w-8 h-16 bg-amber-800 rounded"></div>
        <div className="absolute top-28 right-4 w-8 h-16 bg-amber-800 rounded"></div>
        
        {/* Floor Pattern */}
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 opacity-50"></div>
      </div>

      {/* Virtual Try-On Modal */}
      {showTryOnModal && (
        <VirtualTryOnModal
          product={showTryOnModal}
          onClose={() => setShowTryOnModal(null)}
          onTryOnComplete={handleTryOnComplete}
        />
      )}

      {/* Try-On Result Modal */}
      {tryOnResult && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setTryOnResult(null)}
        >
          <Card className="max-w-md w-full bg-white" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Virtual Try-On Result</h3>
              <img 
                src={tryOnResult.imageUrl} 
                alt="Virtual try-on result" 
                className="w-full max-w-sm mx-auto rounded-lg mb-4"
              />
              <p className="text-lg font-medium text-green-600 mb-4">{tryOnResult.message}</p>
              <Button onClick={() => setTryOnResult(null)} className="bg-purple-600 hover:bg-purple-700">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <Card className="max-w-md w-full bg-white" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl">
                  {selectedProduct.category.includes('T-shirt') && '👕'}
                  {selectedProduct.category.includes('Jeans') && '👖'}
                  {selectedProduct.category.includes('Cap') && '🧢'}
                  {selectedProduct.category.includes('Shoe') && '👟'}
                  {selectedProduct.category.includes('Saree') && '🥻'}
                  {selectedProduct.category.includes('Kurti') && '👗'}
                  {selectedProduct.category.includes('Sherwani') && '🤵'}
                  {selectedProduct.category.includes('Jooti') && '👞'}
                  {selectedProduct.category.includes('Lamp') && '💡'}
                  {selectedProduct.category.includes('Paint') && '🖼️'}
                  {selectedProduct.category.includes('Plant') && '🪴'}
                  {selectedProduct.category.includes('Rug') && '🏠'}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{selectedProduct.description}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  {renderStars(selectedProduct.rating)}
                  <span className="text-sm text-gray-500">({selectedProduct.rating}/5)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className="text-xl font-bold bg-green-600">₹{selectedProduct.price}</Badge>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTryOn(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Try On
                  </Button>
                  <Button
                    onClick={() => {
                      handlePurchase(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={playerStats.coins < selectedProduct.price}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};