import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, RoundedBox, Float, Sphere } from '@react-three/drei';
import { Group, Color } from 'three';
import { ShopData } from '../types/shop';

interface ShopDisplayProps {
  data: ShopData;
  isSelected: boolean;
  onSelect: () => void;
}

const ItemDisplay = ({ item, position, color }: { item: string, position: [number, number, number], color: Color }) => {
  const getItemMesh = (itemName: string) => {
    const lowerItem = itemName.toLowerCase();
    
    if (lowerItem.includes('shirt') || lowerItem.includes('kurti')) {
      return (
        <group>
          <RoundedBox args={[0.4, 0.6, 0.1]} radius={0.05}>
            <meshStandardMaterial color={color} roughness={0.3} />
          </RoundedBox>
          <RoundedBox args={[0.3, 0.2, 0.05]} position={[0, 0.4, 0]} radius={0.02}>
            <meshStandardMaterial color={color.clone().multiplyScalar(0.8)} />
          </RoundedBox>
        </group>
      );
    } else if (lowerItem.includes('jean') || lowerItem.includes('saree')) {
      return (
        <RoundedBox args={[0.3, 0.8, 0.1]} radius={0.05}>
          <meshStandardMaterial color={color} roughness={0.4} />
        </RoundedBox>
      );
    } else if (lowerItem.includes('cap') || lowerItem.includes('hat')) {
      return (
        <Sphere args={[0.25, 16, 16]}>
          <meshStandardMaterial color={color} roughness={0.2} />
        </Sphere>
      );
    } else if (lowerItem.includes('shoe') || lowerItem.includes('jooti')) {
      return (
        <group>
          <RoundedBox args={[0.5, 0.2, 0.3]} radius={0.05}>
            <meshStandardMaterial color={color} roughness={0.3} />
          </RoundedBox>
          <RoundedBox args={[0.4, 0.1, 0.4]} position={[0, -0.15, 0]} radius={0.02}>
            <meshStandardMaterial color={color.clone().multiplyScalar(0.6)} />
          </RoundedBox>
        </group>
      );
    } else if (lowerItem.includes('necklace')) {
      return (
        <mesh>
          <torusGeometry args={[0.2, 0.02, 8, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.1} />
        </mesh>
      );
    } else if (lowerItem.includes('lamp')) {
      return (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <Sphere args={[0.15, 16, 16]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#FFF8DC" emissive="#FFF8DC" emissiveIntensity={0.3} />
          </Sphere>
        </group>
      );
    } else if (lowerItem.includes('painting')) {
      return (
        <RoundedBox args={[0.4, 0.3, 0.05]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.1} />
        </RoundedBox>
      );
    } else if (lowerItem.includes('plant')) {
      return (
        <group>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 0.2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <Sphere args={[0.2, 8, 8]} position={[0, 0.1, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Sphere>
        </group>
      );
    } else if (lowerItem.includes('rug')) {
      return (
        <RoundedBox args={[0.6, 0.05, 0.4]} radius={0.02}>
          <meshStandardMaterial color={color} roughness={0.8} />
        </RoundedBox>
      );
    }
    
    // Default item
    return (
      <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05}>
        <meshStandardMaterial color={color} />
      </RoundedBox>
    );
  };

  return (
    <Float speed={1 + Math.random()} rotationIntensity={0.1} floatIntensity={0.1}>
      <group position={position}>
        {getItemMesh(item)}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.05}
          height={0.01}
          position={[0, -0.4, 0]}
          rotation={[0, 0, 0]}
        >
          {item.slice(0, 8)}
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
        </Text3D>
      </group>
    </Float>
  );
};

export const ShopDisplay = ({ data, isSelected, onSelect }: ShopDisplayProps) => {
  const groupRef = useRef<Group>(null);
  const baseColor = new Color(data.color);
  
  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={data.position}>
      {/* Market Stall Base */}
      <group>
        {/* Main Stall Structure */}
        <RoundedBox
          args={[4, 0.2, 3]}
          position={[0, -0.1, 0]}
          radius={0.05}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </RoundedBox>
        
        {/* Stall Roof */}
        <RoundedBox
          args={[4.5, 0.1, 3.5]}
          position={[0, 3.5, 0]}
          radius={0.05}
          castShadow
        >
          <meshStandardMaterial 
            color={baseColor} 
            emissive={baseColor} 
            emissiveIntensity={isSelected ? 0.2 : 0.05}
          />
        </RoundedBox>
        
        {/* Support Pillars */}
        {[[-2, 1.5], [2, 1.5], [-2, -1.5], [2, -1.5]].map(([x, z], i) => (
          <RoundedBox
            key={i}
            args={[0.1, 3.5, 0.1]}
            position={[x, 1.75, z]}
            radius={0.02}
            castShadow
          >
            <meshStandardMaterial color="#654321" />
          </RoundedBox>
        ))}
        
        {/* Shop Sign */}
        <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.05}>
          <group position={[0, 3.8, 0]}>
            <RoundedBox args={[3, 0.5, 0.1]} radius={0.05}>
              <meshStandardMaterial color="#2C1810" />
            </RoundedBox>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.25}
              height={0.05}
              position={[-1.2, -0.1, 0.1]}
            >
              {data.name}
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
            </Text3D>
          </group>
        </Float>
      </group>

      {/* Item Displays */}
      <group>
        {data.sections.map((section, sectionIndex) => {
          const sectionX = (sectionIndex - 1.5) * 1.2;
          
          return (
            <group key={section.name} position={[sectionX, 0, 0]}>
              {/* Section Display Stand */}
              <RoundedBox
                args={[1, 1.5, 0.8]}
                position={[0, 0.75, -0.8]}
                radius={0.05}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial 
                  color="#D2B48C" 
                  roughness={0.6}
                />
              </RoundedBox>
              
              {/* Section Label */}
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.08}
                height={0.02}
                position={[-0.3, 1.8, -0.8]}
              >
                {section.name}
                <meshStandardMaterial color={baseColor} emissive={baseColor} emissiveIntensity={0.2} />
              </Text3D>
              
              {/* Items Display */}
              {section.items.slice(0, 4).map((item, itemIndex) => {
                const itemX = (itemIndex % 2 - 0.5) * 0.4;
                const itemZ = Math.floor(itemIndex / 2) * 0.3 - 0.65;
                const itemY = 1.7;
                
                return (
                  <ItemDisplay
                    key={item}
                    item={item}
                    position={[itemX, itemY, itemZ]}
                    color={baseColor.clone().multiplyScalar(0.8 + itemIndex * 0.1)}
                  />
                );
              })}
            </group>
          );
        })}
      </group>

      {/* Shopkeeper Area */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <group position={[0, 2, 1]} onClick={onSelect}>
          {/* Shopkeeper Platform */}
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.2]} />
            <meshStandardMaterial color={baseColor} emissive={baseColor} emissiveIntensity={0.2} />
          </mesh>
          
          {/* Shopkeeper Indicator */}
          <Sphere args={[0.3, 16, 16]} position={[0, 0.5, 0]}>
            <meshStandardMaterial 
              color="#FFDBAC" 
              emissive={isSelected ? "#FFB366" : "#FFDBAC"} 
              emissiveIntensity={isSelected ? 0.3 : 0.1} 
            />
          </Sphere>
          
          {/* Chat Bubble */}
          {isSelected && (
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
              <group position={[0.8, 0.8, 0]}>
                <Sphere args={[0.2, 16, 16]}>
                  <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
                </Sphere>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={0.08}
                  height={0.01}
                  position={[-0.1, -0.05, 0]}
                >
                  Hi!
                  <meshStandardMaterial color={baseColor} />
                </Text3D>
              </group>
            </Float>
          )}
        </group>
      </Float>
      
      {/* Interactive Glow Effect */}
      {isSelected && (
        <pointLight
          position={[0, 2, 0]}
          intensity={0.5}
          distance={8}
          color={baseColor}
        />
      )}
    </group>
  );
};
