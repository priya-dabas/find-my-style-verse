import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopData, PlayerStats } from '../types/shop';
import { VoiceAvatarShopkeeper } from './VoiceAvatarShopkeeper';
import { westernProducts, ethnicProducts, homeDecorProducts } from '../data/products';

const enhancedShopData: ShopData[] = [
  {
    id: 'western',
    name: 'Western Wear',
    position: [-4, 0, 0],
    color: '#8B5CF6',
    theme: 'western',
    environment: '2d',
    shopkeeper: {
      name: 'Alex',
      personality: 'Cool and trendy, knows all the latest fashion trends',
      greeting: 'Hey there! Welcome to Western Wear! I\'m Alex, your personal fashion guide. I can help you find the perfect outfit with voice assistance. Just speak to me naturally!',
      avatar: '🤠'
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
      name: 'Priya',
      personality: 'Elegant and knowledgeable about traditional fashion',
      greeting: 'Namaste! I\'m Priya, welcome to our beautiful ethnic collection. I can speak with you about our hand-picked traditional wear. Feel free to ask me anything!',
      avatar: '👩🏽‍💼'
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
    environment: '3d',
    shopkeeper: {
      name: 'Maya',
      personality: 'Creative and inspiring, passionate about interior design',
      greeting: 'Hello! I\'m Maya, your interior design assistant. Let me help you transform your space with our beautiful home decor collection. I can guide you through everything with voice assistance!',
      avatar: '👩🏼‍🎨'
    },
    sections: [
      { name: 'Lamps', products: homeDecorProducts['Lamps'] },
      { name: 'Wall Paintings', products: homeDecorProducts['Wall Paintings'] },
      { name: 'Plants', products: homeDecorProducts['Plants'] },
      { name: 'Rugs', products: homeDecorProducts['Rugs'] }
    ]
  }
];

export const EnhancedShoppingRoom = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    coins: 1000,
    experience: 0,
    level: 1,
    achievements: [],
    inventory: []
  });

  const selectedShopData = enhancedShopData.find(shop => shop.id === selectedShop);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🛍️ Virtual Shopping Mall Experience
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Interactive Voice AI Shopkeepers • Visual Product Displays • Virtual Try-On
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-yellow-500/20 text-yellow-100 border-yellow-400">
              💰 {playerStats.coins} Coins
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-blue-500/20 text-blue-100 border-blue-400">
              ⭐ Level {playerStats.level}
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-green-500/20 text-green-100 border-green-400">
              🎯 {playerStats.experience} XP
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-purple-500/20 text-purple-100 border-purple-400">
              🛒 {playerStats.inventory.length} Items
            </Badge>
          </div>
        </div>

        {/* Shop Selection - Mall Entrance View */}
        {!selectedShop && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Shopping Destination</h2>
              <p className="text-gray-300">Each shop features AI voice assistants and immersive product displays</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {enhancedShopData.map((shop) => (
                <Card 
                  key={shop.id} 
                  className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border-2 hover:border-opacity-100 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
                  style={{ borderColor: shop.color + '40', '--hover-border': shop.color }}
                  onClick={() => setSelectedShop(shop.id)}
                >
                  <CardHeader className="text-center pb-4">
                    {/* Shop Facade */}
                    <div 
                      className="w-full h-40 rounded-lg mb-4 flex flex-col items-center justify-center text-white text-6xl font-bold relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${shop.color}90, ${shop.color}60)`,
                        boxShadow: `0 10px 30px ${shop.color}30`
                      }}
                    >
                      <div className="text-8xl mb-2">{shop.shopkeeper.avatar}</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute bottom-2 text-sm font-semibold">
                        {shop.environment === '3d' ? '🏠 3D Room' : '🖼️ Visual Display'}
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl text-white group-hover:text-opacity-90">
                      {shop.name}
                    </CardTitle>
                    <p className="text-gray-300 text-sm">
                      Meet {shop.shopkeeper.name} • Voice AI Assistant
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      {shop.sections.map((section) => (
                        <div key={section.name} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-gray-200">{section.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {section.products.length} items
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full text-white font-semibold py-3 group-hover:scale-105 transition-transform duration-200"
                      style={{ 
                        backgroundColor: shop.color,
                        boxShadow: `0 4px 15px ${shop.color}30`
                      }}
                    >
                      🎤 Enter & Shop with {shop.shopkeeper.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Features Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">🎤</div>
                <h3 className="text-xl font-bold text-white mb-2">Voice AI Shopkeepers</h3>
                <p className="text-gray-300 text-sm">Talk naturally with AI assistants who know every product detail</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">🏪</div>
                <h3 className="text-xl font-bold text-white mb-2">Visual Product Displays</h3>
                <p className="text-gray-300 text-sm">Mall-style product lineups with detailed information and ratings</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">❓</div>
                <h3 className="text-xl font-bold text-white mb-2">Virtual Try-On</h3>
                <p className="text-gray-300 text-sm">Click the question mark icon on any item to see how it looks</p>
              </div>
            </div>
          </div>
        )}

        {/* Voice Avatar Shopkeeper Interface */}
        {selectedShop && selectedShopData && (
          <VoiceAvatarShopkeeper 
            shop={selectedShopData}
            onClose={() => setSelectedShop(null)}
            playerStats={playerStats}
            onStatsUpdate={setPlayerStats}
          />
        )}
      </div>
    </div>
  );
};