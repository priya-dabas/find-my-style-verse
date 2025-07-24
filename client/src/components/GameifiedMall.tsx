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
    <div className="min-h-screen bg-gray-400 flex flex-col">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-600"></div>
      
      {/* Mobile Header */}
      <div className="relative z-10 text-center pt-8 pb-4">
        <h1 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
          🏬 SHOPPING STREET
        </h1>
        <p className="text-white text-xs drop-shadow">
          Choose Your Shop
        </p>
      </div>

      {/* Player Stats - Compact for 9:16 */}
      <div className="relative z-10 flex justify-center mb-4">
        <div className="bg-black/80 text-white px-3 py-1.5 rounded-lg border-2 border-yellow-400">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <span>🪙</span>
              <span className="text-yellow-400 font-bold">{playerStats.coins}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span className="text-blue-400 font-bold">{playerStats.level}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🎯</span>
              <span className="text-green-400 font-bold">{playerStats.experience}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flex Container for Shops - Optimized for 9:16 */}
      <div className="relative z-10 flex-1 flex items-center justify-center pb-20">
        <div className="flex gap-2 px-4 overflow-x-auto w-full justify-center">
          {gameShopData.map((shop, index) => {
            const shopNames = ['WESTERN', 'ETHNIC', 'HOME DECOR'];
            return (
              <div 
                key={shop.id}
                className="cursor-pointer hover:scale-105 transition-transform duration-300 flex-shrink-0"
                onClick={() => setSelectedShop(shop.id)}
              >
                {/* Pixel Art Shop Building - Smaller for mobile */}
                <div className="w-24 h-32 relative">
                  {/* Shop Sign */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-white border-2 border-black px-2 py-0.5">
                      <div className="text-red-600 font-bold text-[10px] text-center leading-tight">
                        {shopNames[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Brick Building */}
                  <div className="w-full h-full relative bg-orange-600 border-2 border-black">
                    {/* Brick Pattern */}
                    <div className="absolute inset-0.5 grid grid-cols-3 gap-px">
                      {Array.from({length: 12}, (_, i) => (
                        <div key={i} className="bg-orange-500 border border-orange-700"></div>
                      ))}
                    </div>
                    
                    {/* Striped Awning */}
                    <div className="absolute -top-2 left-1 right-1 h-3 flex border-2 border-black">
                      {Array.from({length: 6}, (_, i) => (
                        <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-500' : 'bg-white'}`}></div>
                      ))}
                    </div>
                    
                    {/* Windows */}
                    <div className="absolute top-3 left-1 w-3 h-3 bg-blue-200 border border-blue-800">
                      <div className="absolute inset-0.5 bg-blue-100"></div>
                    </div>
                    
                    {/* Large Glass Door/Window */}
                    <div className="absolute top-3 right-1 bottom-6 w-8 bg-blue-200 border border-blue-800">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-blue-100 to-blue-200">
                        {/* Glass reflection effect */}
                        <div className="absolute top-0.5 left-0.5 w-1 h-4 bg-white/50"></div>
                        <div className="absolute top-0.5 right-0.5 w-0.5 h-3 bg-white/30"></div>
                      </div>
                      {/* Door handles */}
                      <div className="absolute top-1/2 left-0.5 w-0.5 h-0.5 bg-gray-700 rounded-full"></div>
                      <div className="absolute top-1/2 right-0.5 w-0.5 h-0.5 bg-gray-700 rounded-full"></div>
                    </div>
                    
                    {/* Shop Display Window */}
                    <div className="absolute bottom-6 left-1 w-3 h-4 bg-yellow-100 border border-gray-800">
                      <div className="absolute inset-0.5 bg-yellow-50 flex items-center justify-center">
                        <div className="text-[8px]">📦</div>
                      </div>
                    </div>
                    
                    {/* Meera in window */}
                    <div className="absolute top-4 left-2 text-sm animate-bounce">
                      👩🏻‍💼
                    </div>
                  </div>
                  
                  {/* Shop Name Plate */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <Button 
                      className="text-[10px] font-bold px-2 py-0.5 text-white border border-white/50"
                      style={{ backgroundColor: shop.color }}
                    >
                      ENTER
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions - Bottom */}
      <div className="relative z-10 text-center pb-4">
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg mx-auto max-w-xs">
          <p className="text-xs">👆 Tap any shop to enter and meet Meera!</p>
        </div>
      </div>
    </div>
  );
};