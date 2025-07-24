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

  const getProductEmoji = (categoryName: string) => {
    if (categoryName.includes('T-shirt')) return '👕';
    if (categoryName.includes('Jeans')) return '👖';
    if (categoryName.includes('Cap')) return '🧢';
    if (categoryName.includes('Shoe')) return '👟';
    if (categoryName.includes('Saree')) return '🥻';
    if (categoryName.includes('Kurti')) return '👗';
    if (categoryName.includes('Sherwani')) return '🤵';
    if (categoryName.includes('Jooti')) return '👞';
    if (categoryName.includes('Lamp')) return '💡';
    if (categoryName.includes('Paint')) return '🖼️';
    if (categoryName.includes('Plant')) return '🪴';
    if (categoryName.includes('Rug')) return '🏠';
    return '🛍️'; // Default emoji
  };

  const CleanProductRack = ({ products, categoryName, rackNumber }: { products: Product[], categoryName: string, rackNumber: number }) => (
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* Rack Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-2 sm:p-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
            {rackNumber}
          </div>
          <h3 className="text-white font-bold text-sm sm:text-base text-center">{categoryName}</h3>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="p-3 sm:p-4 bg-gray-50">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Item */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center text-xl sm:text-2xl hover:border-blue-400 hover:shadow-md transition-all duration-200 group-hover:scale-105">
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
                className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 p-0 bg-blue-500 hover:bg-blue-600 border-0 text-white rounded-full shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTryOn(product);
                }}
              >
                <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </Button>
              
              {/* Price Tag */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <Badge className="text-xs px-1.5 py-0.5 bg-green-500 text-white rounded-full shadow-sm">
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
      {/* Mobile-Optimized Header */}
      <div className="absolute top-2 left-2 right-2 z-20">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="bg-white/90 text-xs px-2 py-1 h-8">
            <ArrowLeft className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Back to Mall</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="bg-black/80 text-white px-2 py-1 rounded-lg text-center">
            <h1 className="text-sm sm:text-xl font-bold">
              <span className="hidden sm:inline">SHOP - {shop.id === 'western' ? '1' : shop.id === 'ethnic' ? '2' : '3'} ({shop.name.toUpperCase()})</span>
              <span className="sm:hidden">{shop.name.toUpperCase()}</span>
            </h1>
          </div>
          
          <div className="flex gap-1">
            <Badge className="bg-yellow-500 text-black text-xs px-1 py-0">💰 {playerStats.coins}</Badge>
            <Badge className="bg-blue-500 text-xs px-1 py-0">⭐ {playerStats.level}</Badge>
          </div>
        </div>
      </div>

      {/* Clean Mobile Shop Layout */}
      <div className="relative w-full min-h-screen pt-12 sm:pt-20 bg-gradient-to-b from-blue-50 to-gray-100">
        {/* Shop Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block bg-white rounded-lg shadow-lg px-4 sm:px-8 py-2 sm:py-3 border-2 border-blue-200">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{shop.name.toUpperCase()}</h2>
            <p className="text-xs sm:text-sm text-gray-600">Select items to view details or try on</p>
          </div>
        </div>

        {/* Mobile Wireframe Layout - 4 Corners + Center */}
        <div className="relative h-[calc(100vh-5rem)] max-w-md mx-auto">
          {/* Four Corner Categories */}
          
          {/* Top Left Category - Image-Focused Cards */}
          <div className="absolute top-4 left-4 w-32 h-52">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 h-full p-2">
              <div className="text-center mb-2">
                <h4 className="text-xs font-bold text-gray-800">
                  {shop.sections[0]?.name || 'Category 1'}
                </h4>
              </div>
              
              {/* 3 Products - Large Image Focus */}
              <div className="flex flex-col gap-2">
                {shop.sections[0]?.products.slice(0, 3).map((product, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-lg hover:scale-105 overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Large Product Image */}
                    <div className="h-12 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-2xl">{getProductEmoji(shop.sections[0]?.name || '')}</div>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-center py-1">
                      <span className="text-xs font-bold">₹{product.price}</span>
                    </div>
                    
                    {/* Try-on button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-1 right-1 w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600 border-0 text-white rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTryOn(product);
                      }}
                    >
                      <HelpCircle className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Right Category - Image-Focused Cards */}
          <div className="absolute top-4 right-4 w-32 h-52">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 h-full p-2">
              <div className="text-center mb-2">
                <h4 className="text-xs font-bold text-gray-800">
                  {shop.sections[1]?.name || 'Category 2'}
                </h4>
              </div>
              
              {/* 3 Products - Large Image Focus */}
              <div className="flex flex-col gap-2">
                {shop.sections[1]?.products.slice(0, 3).map((product, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 cursor-pointer transition-all hover:shadow-lg hover:scale-105 overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Large Product Image */}
                    <div className="h-12 bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                      <div className="text-2xl">{getProductEmoji(shop.sections[1]?.name || '')}</div>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-purple-600 text-white text-center py-1">
                      <span className="text-xs font-bold">₹{product.price}</span>
                    </div>
                    
                    {/* Try-on button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-1 right-1 w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600 border-0 text-white rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTryOn(product);
                      }}
                    >
                      <HelpCircle className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Left Category - Image-Focused Cards */}
          <div className="absolute bottom-20 left-4 w-32 h-52">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 h-full p-2">
              <div className="text-center mb-2">
                <h4 className="text-xs font-bold text-gray-800">
                  {shop.sections[2]?.name || 'Category 3'}
                </h4>
              </div>
              
              {/* 3 Products - Large Image Focus */}
              <div className="flex flex-col gap-2">
                {shop.sections[2]?.products.slice(0, 3).map((product, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white rounded-lg border-2 border-green-200 hover:border-green-400 cursor-pointer transition-all hover:shadow-lg hover:scale-105 overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Large Product Image */}
                    <div className="h-12 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                      <div className="text-2xl">{getProductEmoji(shop.sections[2]?.name || '')}</div>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-center py-1">
                      <span className="text-xs font-bold">₹{product.price}</span>
                    </div>
                    
                    {/* Try-on button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-1 right-1 w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600 border-0 text-white rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTryOn(product);
                      }}
                    >
                      <HelpCircle className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right Category - Image-Focused Cards */}
          <div className="absolute bottom-20 right-4 w-32 h-52">
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 h-full p-2">
              <div className="text-center mb-2">
                <h4 className="text-xs font-bold text-gray-800">
                  {shop.sections[3]?.name || 'Category 4'}
                </h4>
              </div>
              
              {/* 3 Products - Large Image Focus */}
              <div className="flex flex-col gap-2">
                {shop.sections[3]?.products.slice(0, 3).map((product, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 cursor-pointer transition-all hover:shadow-lg hover:scale-105 overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Large Product Image */}
                    <div className="h-12 bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center">
                      <div className="text-2xl">{getProductEmoji(shop.sections[3]?.name || '')}</div>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white text-center py-1">
                      <span className="text-xs font-bold">₹{product.price}</span>
                    </div>
                    
                    {/* Try-on button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-1 right-1 w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600 border-0 text-white rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTryOn(product);
                      }}
                    >
                      <HelpCircle className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central Meera Avatar - Compact */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Meera Card - Smaller */}
              <Card className="bg-white shadow-xl border-4 border-pink-300">
                <CardContent className="p-3 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-pink-300">
                    <div className="text-2xl">👩🏻‍💼</div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Meera</h3>
                  
                  {/* Voice Controls - Compact */}
                  <div className="flex justify-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                      className={`w-7 h-7 p-0 ${isVoiceEnabled ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50'}`}
                    >
                      {isVoiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isListening ? "default" : "outline"}
                      onClick={isListening ? stopListening : startListening}
                      className={`w-8 h-8 p-0 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-50 border-blue-300 text-blue-700'}`}
                    >
                      {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Speech bubble indicator when listening */}
              {isListening && (
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>

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

      {/* Clean Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <Card className="max-w-md w-full bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl sm:text-6xl border-2 border-gray-200">
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
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{selectedProduct.description}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  {renderStars(selectedProduct.rating)}
                  <span className="text-sm text-gray-500">({selectedProduct.rating}/5)</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-center">
                  <Badge className="text-lg sm:text-xl font-bold bg-green-500 text-white px-4 py-2 rounded-full">
                    ₹{selectedProduct.price}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleTryOn(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Try On</span>
                    <span className="sm:hidden">Try</span>
                  </Button>
                  <Button
                    onClick={() => {
                      handlePurchase(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={playerStats.coins < selectedProduct.price}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Buy Now</span>
                    <span className="sm:hidden">Buy</span>
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