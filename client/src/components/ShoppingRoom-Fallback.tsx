import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopData, PlayerStats } from '../types/shop';
import { AIShopkeeper } from './AIShopkeeper';

const shopData: ShopData[] = [
  {
    id: 'western',
    name: 'Western Wear',
    position: [-4, 0, 0],
    color: '#8B5CF6',
    theme: 'western',
    shopkeeper: {
      name: 'Alex',
      personality: 'Cool and trendy, knows all the latest fashion trends',
      greeting: 'Hey there! Looking for some fresh Western gear? I\'ve got the hottest trends right here!'
    },
    sections: [
      { name: 'T-shirts - Men', items: ['Classic White Tee', 'Graphic Vintage', 'Band Merch', 'Polo Shirts'] },
      { name: 'Jeans', items: ['Slim Fit', 'Straight Cut', 'Ripped Style', 'Dark Wash'] },
      { name: 'Caps', items: ['Baseball Cap', 'Snapback', 'Beanie', 'Trucker Hat'] },
      { name: 'Sport Shoes', items: ['Running Shoes', 'Basketball', 'Sneakers', 'Training Shoes'] }
    ]
  },
  {
    id: 'ethnic',
    name: 'Ethnic Wear',
    position: [0, 0, 0],
    color: '#EF4444',
    theme: 'ethnic',
    shopkeeper: {
      name: 'Priya',
      personality: 'Elegant and knowledgeable about traditional fashion',
      greeting: 'Namaste! Welcome to our ethnic collection. Let me help you find something beautiful and traditional!'
    },
    sections: [
      { name: 'Sarees', items: ['Silk Saree', 'Cotton Saree', 'Designer Saree', 'Wedding Saree'] },
      { name: 'Kurti', items: ['Anarkali', 'Straight Cut', 'A-Line', 'Printed Kurti'] },
      { name: 'Necklace', items: ['Gold Necklace', 'Silver Chain', 'Beaded Jewelry', 'Temple Jewelry'] },
      { name: 'Jootis', items: ['Mojari', 'Punjabi Jutti', 'Embroidered', 'Traditional Flats'] }
    ]
  },
  {
    id: 'home',
    name: 'Home Decor',
    position: [4, 0, 0],
    color: '#10B981',
    theme: 'home',
    shopkeeper: {
      name: 'Maya',
      personality: 'Creative and inspiring, passionate about interior design',
      greeting: 'Hello! Ready to transform your space? I have amazing decor pieces that will make your home shine!'
    },
    sections: [
      { name: 'Lamps', items: ['Table Lamp', 'Floor Lamp', 'Ceiling Light', 'Decorative Lamp'] },
      { name: 'Wall Paintings', items: ['Abstract Art', 'Landscape', 'Portrait', 'Modern Art'] },
      { name: 'Plants', items: ['Succulents', 'Ferns', 'Snake Plant', 'Peace Lily'] },
      { name: 'Rugs', items: ['Persian Rug', 'Modern Rug', 'Vintage', 'Geometric Pattern'] }
    ]
  }
];

export const ShoppingRoomFallback = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    coins: 1000,
    experience: 0,
    level: 1,
    achievements: []
  });

  const selectedShopData = shopData.find(shop => shop.id === selectedShop);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Shopping Mall Experience</h1>
          <div className="flex justify-center items-center gap-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              💰 {playerStats.coins} Coins
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ⭐ Level {playerStats.level}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              🎯 {playerStats.experience} XP
            </Badge>
          </div>
        </div>

        {/* Shop Selection */}
        {!selectedShop && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shopData.map((shop) => (
              <Card key={shop.id} className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-400"
                    onClick={() => setSelectedShop(shop.id)}>
                <CardHeader className="text-center">
                  <div 
                    className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-white text-6xl font-bold"
                    style={{ backgroundColor: shop.color }}
                  >
                    {shop.theme === 'western' && '🤠'}
                    {shop.theme === 'ethnic' && '🏛️'}
                    {shop.theme === 'home' && '🏠'}
                  </div>
                  <CardTitle className="text-2xl">{shop.name}</CardTitle>
                  <p className="text-sm text-gray-600">Meet {shop.shopkeeper.name}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {shop.sections.map((section) => (
                      <div key={section.name} className="text-sm">
                        <span className="font-semibold">{section.name}:</span>
                        <span className="text-gray-600 ml-2">{section.items.length} items</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" style={{ backgroundColor: shop.color }}>
                    Enter Shop
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* AI Shopkeeper Interface */}
        {selectedShop && selectedShopData && (
          <AIShopkeeper 
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