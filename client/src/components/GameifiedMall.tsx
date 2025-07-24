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
    <div className="min-h-screen bg-green-400 flex flex-col relative overflow-hidden">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400"></div>
      
      {/* Marketplace Ground Pattern */}
      <div className="absolute inset-0">
        {/* Green grass base */}
        <div className="absolute inset-0 bg-green-400"></div>
        
        {/* Stone pavement areas */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-400">
          {/* Stone tile pattern */}
          <div className="absolute inset-0 grid grid-cols-8 gap-px opacity-30">
            {Array.from({length: 32}, (_, i) => (
              <div key={i} className="bg-gray-500 border border-gray-600"></div>
            ))}
          </div>
        </div>
        
        {/* Stone pathways */}
        <div className="absolute bottom-32 left-0 right-0 h-24 bg-gray-500 opacity-40">
          <div className="absolute inset-0 grid grid-cols-12 gap-px">
            {Array.from({length: 36}, (_, i) => (
              <div key={i} className="bg-gray-400 border border-gray-600"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Trees */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side trees */}
        <div className="absolute top-20 left-4">
          <div className="w-8 h-12 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-2 border-green-600"></div>
          </div>
        </div>
        <div className="absolute top-40 left-2">
          <div className="w-6 h-10 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-amber-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border border-green-600"></div>
          </div>
        </div>
        
        {/* Right side trees */}
        <div className="absolute top-24 right-4">
          <div className="w-8 h-12 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-2 border-green-600"></div>
          </div>
        </div>
        <div className="absolute top-44 right-2">
          <div className="w-6 h-10 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-amber-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border border-green-600"></div>
          </div>
        </div>
        
        {/* Background trees scattered */}
        <div className="absolute top-16 left-1/3">
          <div className="w-5 h-8 relative opacity-60">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-amber-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-500 rounded-full border border-green-600"></div>
          </div>
        </div>
      </div>
      
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

      {/* 2-1 Shop Layout - 2 shops top row, 1 centered below */}
      <div className="relative z-10 flex-1 flex items-center justify-center pb-20 px-4">
        <div className="flex flex-col items-center gap-16">
          {/* Top Row - 2 Shops */}
          <div className="flex gap-8">
            {gameShopData.slice(0, 2).map((shop, index) => {
              const shopNames = ['WESTERN', 'ETHNIC'];
              return (
                <div 
                  key={shop.id}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedShop(shop.id)}
                >
                  {/* Pixel Art Shop Building - Increased size */}
                  <div className="w-40 h-48 relative">
                    {/* Shop Sign */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-white border-4 border-black px-4 py-2">
                        <div className="text-red-600 font-bold text-sm text-center leading-tight">
                          {shopNames[index]}
                        </div>
                      </div>
                    </div>
                    
                    {/* Brick Building */}
                    <div className="w-full h-full relative bg-orange-600 border-4 border-black">
                      {/* Brick Pattern */}
                      <div className="absolute inset-1 grid grid-cols-4 gap-px">
                        {Array.from({length: 16}, (_, i) => (
                          <div key={i} className="bg-orange-500 border border-orange-700"></div>
                        ))}
                      </div>
                      
                      {/* Striped Awning */}
                      <div className="absolute -top-3 left-2 right-2 h-4 flex border-2 border-black">
                        {Array.from({length: 8}, (_, i) => (
                          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-500' : 'bg-white'}`}></div>
                        ))}
                      </div>
                      
                      {/* Windows */}
                      <div className="absolute top-4 left-2 w-5 h-5 bg-blue-200 border-2 border-blue-800">
                        <div className="absolute inset-1 bg-blue-100"></div>
                      </div>
                      
                      {/* Large Glass Door/Window */}
                      <div className="absolute top-4 right-2 bottom-8 w-12 bg-blue-200 border-2 border-blue-800">
                        <div className="absolute inset-1 bg-gradient-to-br from-blue-100 to-blue-200">
                          {/* Glass reflection effect */}
                          <div className="absolute top-1 left-1 w-2 h-8 bg-white/50"></div>
                          <div className="absolute top-1 right-1 w-1 h-6 bg-white/30"></div>
                        </div>
                        {/* Door handles */}
                        <div className="absolute top-1/2 left-1 w-1 h-1 bg-gray-700 rounded-full"></div>
                        <div className="absolute top-1/2 right-1 w-1 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                      
                      {/* Shop Display Window */}
                      <div className="absolute bottom-8 left-2 w-5 h-6 bg-yellow-100 border-2 border-gray-800">
                        <div className="absolute inset-1 bg-yellow-50 flex items-center justify-center">
                          <div className="text-xs">📦</div>
                        </div>
                      </div>
                      
                      {/* Meera in window */}
                      <div className="absolute top-6 left-3 text-lg animate-bounce">
                        👩🏻‍💼
                      </div>
                    </div>
                    
                    {/* Shop Name Plate */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <Button 
                        className="text-xs font-bold px-3 py-1 text-white border-2 border-white/50"
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

          {/* Bottom Row - 1 Shop Centered */}
          <div className="flex justify-center">
            {gameShopData.slice(2, 3).map((shop) => {
              return (
                <div 
                  key={shop.id}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedShop(shop.id)}
                >
                  {/* Pixel Art Shop Building - Increased size */}
                  <div className="w-40 h-48 relative">
                    {/* Shop Sign */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-white border-4 border-black px-4 py-2">
                        <div className="text-red-600 font-bold text-sm text-center leading-tight">
                          HOME DECOR
                        </div>
                      </div>
                    </div>
                    
                    {/* Brick Building */}
                    <div className="w-full h-full relative bg-orange-600 border-4 border-black">
                      {/* Brick Pattern */}
                      <div className="absolute inset-1 grid grid-cols-4 gap-px">
                        {Array.from({length: 16}, (_, i) => (
                          <div key={i} className="bg-orange-500 border border-orange-700"></div>
                        ))}
                      </div>
                      
                      {/* Striped Awning */}
                      <div className="absolute -top-3 left-2 right-2 h-4 flex border-2 border-black">
                        {Array.from({length: 8}, (_, i) => (
                          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-500' : 'bg-white'}`}></div>
                        ))}
                      </div>
                      
                      {/* Windows */}
                      <div className="absolute top-4 left-2 w-5 h-5 bg-blue-200 border-2 border-blue-800">
                        <div className="absolute inset-1 bg-blue-100"></div>
                      </div>
                      
                      {/* Large Glass Door/Window */}
                      <div className="absolute top-4 right-2 bottom-8 w-12 bg-blue-200 border-2 border-blue-800">
                        <div className="absolute inset-1 bg-gradient-to-br from-blue-100 to-blue-200">
                          {/* Glass reflection effect */}
                          <div className="absolute top-1 left-1 w-2 h-8 bg-white/50"></div>
                          <div className="absolute top-1 right-1 w-1 h-6 bg-white/30"></div>
                        </div>
                        {/* Door handles */}
                        <div className="absolute top-1/2 left-1 w-1 h-1 bg-gray-700 rounded-full"></div>
                        <div className="absolute top-1/2 right-1 w-1 h-1 bg-gray-700 rounded-full"></div>
                      </div>
                      
                      {/* Shop Display Window */}
                      <div className="absolute bottom-8 left-2 w-5 h-6 bg-yellow-100 border-2 border-gray-800">
                        <div className="absolute inset-1 bg-yellow-50 flex items-center justify-center">
                          <div className="text-xs">📦</div>
                        </div>
                      </div>
                      
                      {/* Meera in window */}
                      <div className="absolute top-6 left-3 text-lg animate-bounce">
                        👩🏻‍💼
                      </div>
                    </div>
                    
                    {/* Shop Name Plate */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <Button 
                        className="text-xs font-bold px-3 py-1 text-white border-2 border-white/50"
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