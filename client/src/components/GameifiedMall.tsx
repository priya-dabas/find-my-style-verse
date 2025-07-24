import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopData, PlayerStats } from '../types/shop';
import { Shop2DRoom } from './Shop2DRoom';
import { westernProducts, ethnicProducts, homeDecorProducts } from '../data/products';

const gameShopData: ShopData[] = [
  {
    id: 'western',
    name: 'Western Wear',
    position: [-4, 0, 0],
    color: '#8B5CF6',
    theme: 'western',
    environment: '2d',
    shopkeeper: {
      name: 'Meera',
      personality: 'Friendly shopping assistant who helps with Western fashion',
      greeting: 'Hello, I\'m Meera! Welcome to Western Wear. I can help you find the perfect outfit with voice assistance!',
      avatar: '👩🏻‍💼'
    },
    sections: [
      { name: 'T-shirts - Men', products: westernProducts['T-shirts - Men'] },
      { name: 'Jeans', products: westernProducts['Jeans'] },
      { name: 'Caps', products: westernProducts['Caps'] },
      { name: 'Sport Shoes', products: westernProducts['Sport Shoes'] }
    ]
  },
  {
    id: 'ethnic',
    name: 'Ethnic Wear',
    position: [0, 0, 0],
    color: '#EF4444',
    theme: 'ethnic',
    environment: '2d',
    shopkeeper: {
      name: 'Meera',
      personality: 'Knowledgeable about traditional and ethnic fashion',
      greeting: 'Namaste! I\'m Meera, welcome to our ethnic collection. Let me help you explore traditional wear!',
      avatar: '👩🏻‍💼'
    },
    sections: [
      { name: 'Sarees', products: ethnicProducts['Sarees'] },
      { name: 'Kurti', products: ethnicProducts['Kurti'] },
      { name: 'Sherwani', products: ethnicProducts['Sherwani'] },
      { name: 'Jootis', products: ethnicProducts['Jootis'] }
    ]
  },
  {
    id: 'home',
    name: 'Home Decor',
    position: [4, 0, 0],
    color: '#10B981',
    theme: 'home',
    environment: '2d',
    shopkeeper: {
      name: 'Meera',
      personality: 'Interior design expert passionate about home decoration',
      greeting: 'Hello! I\'m Meera, your home decor specialist. Let me help you transform your space!',
      avatar: '👩🏻‍💼'
    },
    sections: [
      { name: 'Lamps', products: homeDecorProducts['Lamps'] },
      { name: 'Wall Paintings', products: homeDecorProducts['Wall Paintings'] },
      { name: 'Plants', products: homeDecorProducts['Plants'] },
      { name: 'Rugs', products: homeDecorProducts['Rugs'] }
    ]
  }
];

export const GameifiedMall = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    coins: 1000,
    experience: 0,
    level: 1,
    achievements: [],
    inventory: []
  });

  const selectedShopData = gameShopData.find(shop => shop.id === selectedShop);

  if (selectedShop && selectedShopData) {
    return (
      <Shop2DRoom 
        shop={selectedShopData}
        onBack={() => setSelectedShop(null)}
        playerStats={playerStats}
        onStatsUpdate={setPlayerStats}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Pixel Art Mall Environment */}
      <div className="absolute inset-0">
        {/* Sky */}
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-blue-300 to-blue-400"></div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-gray-600 to-gray-500"></div>
        
        {/* Street */}
        <div className="absolute bottom-0 w-full h-32 bg-gray-800">
          {/* Crosswalk stripes */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({length: 20}, (_, i) => (
              <div key={i} className="w-8 h-4 bg-white"></div>
            ))}
          </div>
        </div>
        
        {/* Trees */}
        <div className="absolute bottom-32 left-8 w-16 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-36 left-12 w-4 h-8 bg-amber-800"></div>
        
        <div className="absolute bottom-32 right-8 w-16 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-36 right-12 w-4 h-8 bg-amber-800"></div>
        
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-36 left-36 w-3 h-6 bg-amber-900"></div>
        
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-36 right-36 w-3 h-6 bg-amber-900"></div>
      </div>

      {/* Mobile-Responsive Game UI */}
      <div className="relative z-10 p-4 sm:p-8">
        {/* Mobile-Optimized Header Stats */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-2xl pixel-font">
            🎮 SHOPPING MALL GAME 🛍️
          </h1>
          <div className="flex justify-center items-center gap-2 sm:gap-6 flex-wrap">
            <Badge className="text-xs sm:text-lg px-3 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-black font-bold border-2 border-yellow-600">
              💰 COINS: {playerStats.coins}
            </Badge>
            <Badge className="text-xs sm:text-lg px-3 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white font-bold border-2 border-blue-600">
              ⭐ LEVEL: {playerStats.level}
            </Badge>
            <Badge className="text-xs sm:text-lg px-3 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-bold border-2 border-green-600">
              🎯 EXP: {playerStats.experience}
            </Badge>
            <Badge className="text-lg px-6 py-3 bg-purple-500 text-white font-bold border-2 border-purple-600">
              🛒 ITEMS: {playerStats.inventory.length}
            </Badge>
          </div>
        </div>

        {/* Shop Buildings - Pixel Art Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gameShopData.map((shop, index) => (
            <div key={shop.id} className="relative">
              <Card 
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border-4 bg-gradient-to-b from-white to-gray-100 shadow-2xl"
                style={{ borderColor: shop.color }}
                onClick={() => setSelectedShop(shop.id)}
              >
                <CardHeader className="text-center pb-2">
                  {/* Pixel Art Shop Building */}
                  <div 
                    className="w-full h-48 rounded-lg mb-4 relative overflow-hidden border-4 group-hover:shadow-xl transition-shadow duration-300"
                    style={{ 
                      backgroundColor: shop.color,
                      background: `linear-gradient(135deg, ${shop.color}ff, ${shop.color}cc)`,
                      borderColor: shop.color
                    }}
                  >
                    {/* Shop Front */}
                    <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-orange-200 to-orange-300"></div>
                    
                    {/* Roof */}
                    <div className="absolute top-0 w-full h-1/4 bg-gradient-to-b from-red-800 to-red-700"></div>
                    
                    {/* Shop Sign */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs font-bold">
                      SHOP {index + 1}
                    </div>
                    
                    {/* Windows */}
                    <div className="absolute top-16 left-4 w-8 h-8 bg-blue-300 border-2 border-blue-800"></div>
                    <div className="absolute top-16 right-4 w-8 h-8 bg-blue-300 border-2 border-blue-800"></div>
                    
                    {/* Door */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-amber-800 border-2 border-amber-900 rounded-t-lg"></div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                    
                    {/* Awning */}
                    <div 
                      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-20 h-4 rounded-b-lg border-2"
                      style={{ backgroundColor: shop.color, borderColor: shop.color }}
                    ></div>
                    
                    {/* Red and white stripes on awning */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-20 h-4 rounded-b-lg overflow-hidden">
                      <div className="flex h-full">
                        {Array.from({length: 8}, (_, i) => (
                          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Meera in window */}
                    <div className="absolute top-18 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">
                      👩🏻‍💼
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold pixel-font" style={{ color: shop.color }}>
                    {shop.name.toUpperCase()}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Meet Meera • AI Voice Assistant</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {shop.sections.map((section) => (
                      <div key={section.name} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{section.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {section.products.length} items
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full text-white font-bold py-3 text-lg pixel-font transform group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: shop.color }}
                  >
                    🚪 ENTER SHOP {index + 1}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Game Instructions */}
        <div className="mt-12 text-center">
          <div className="bg-black/80 text-white p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 pixel-font">🎮 HOW TO PLAY</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl mb-2">🛍️</div>
                <p><strong>EXPLORE SHOPS:</strong> Click on each building to enter the 2D shop room</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🎤</div>
                <p><strong>TALK TO MEERA:</strong> Use voice commands to ask about products</p>
              </div>
              <div>
                <div className="text-2xl mb-2">❓</div>
                <p><strong>TRY BEFORE BUY:</strong> Click question marks for virtual try-on</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};