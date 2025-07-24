import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text3D, Center, Float } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Shop } from './Shop';
import { GameUI } from './GameUI';
import { AIShopkeeper } from './AIShopkeeper';
import { ShopData } from '../types/shop';

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

export const ShoppingRoom = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState({
    coins: 1000,
    experience: 0,
    level: 1,
    achievements: []
  });

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-background">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 5, 12], fov: 60 }}
        shadows
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#8B5CF6" />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Room Floor */}
          <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 15]} />
            <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.8} />
          </mesh>
          
          {/* Welcome Sign */}
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <Center position={[0, 4, -2]}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.5}
                height={0.1}
                curveSegments={12}
              >
                SHOPPING REALM
                <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} />
              </Text3D>
            </Center>
          </Float>
          
          {/* Shops */}
          {shopData.map((shop) => (
            <Shop
              key={shop.id}
              data={shop}
              isSelected={selectedShop === shop.id}
              onSelect={() => setSelectedShop(shop.id)}
            />
          ))}
          
          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={20}
            minDistance={5}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <GameUI playerStats={playerStats} onStatsUpdate={setPlayerStats} />
      
      {/* AI Shopkeeper Dialog */}
      {selectedShop && (
        <AIShopkeeper
          shop={shopData.find(s => s.id === selectedShop)!}
          onClose={() => setSelectedShop(null)}
          playerStats={playerStats}
          onStatsUpdate={setPlayerStats}
        />
      )}
    </div>
  );
};
