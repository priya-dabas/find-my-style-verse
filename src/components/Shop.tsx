import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, RoundedBox, Float } from '@react-three/drei';
import { Group, Color } from 'three';
import { ShopData } from '../types/shop';

interface ShopProps {
  data: ShopData;
  isSelected: boolean;
  onSelect: () => void;
}

export const Shop = ({ data, isSelected, onSelect }: ShopProps) => {
  const groupRef = useRef<Group>(null);
  const baseColor = new Color(data.color);
  
  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={data.position}>
      {/* Shop Building */}
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        <RoundedBox
          args={[2.5, 3, 2.5]}
          radius={0.1}
          smoothness={4}
          position={[0, 1.5, 0]}
          onClick={onSelect}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
            metalness={0.2}
            roughness={0.8}
          />
        </RoundedBox>
      </Float>
      
      {/* Shop Sign */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, 3.5, 1.3]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.05}
            curveSegments={12}
          >
            {data.name}
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.2}
            />
          </Text3D>
        </group>
      </Float>
      
      {/* Section Indicators */}
      {data.sections.map((section, index) => {
        const angle = (index / data.sections.length) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={section.name} speed={2 + index * 0.5} rotationIntensity={0.1}>
            <group position={[x, 0.5, z]}>
              {/* Section Pillar */}
              <RoundedBox
                args={[0.3, 1, 0.3]}
                radius={0.05}
                smoothness={4}
                castShadow
              >
                <meshStandardMaterial
                  color={baseColor.clone().multiplyScalar(0.7)}
                  emissive={baseColor}
                  emissiveIntensity={0.1}
                />
              </RoundedBox>
              
              {/* Section Label */}
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.08}
                height={0.02}
                position={[0, 1.2, 0]}
                rotation={[0, -angle + Math.PI, 0]}
              >
                {section.name.split(' ')[0]}
                <meshStandardMaterial color="#ffffff" />
              </Text3D>
            </group>
          </Float>
        );
      })}
      
      {/* Entrance Portal */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[0, 1, 1.3]}>
          <RoundedBox
            args={[1, 2, 0.1]}
            radius={0.1}
            smoothness={4}
          >
            <meshStandardMaterial
              color={baseColor}
              transparent
              opacity={0.3}
              emissive={baseColor}
              emissiveIntensity={0.5}
            />
          </RoundedBox>
        </group>
      </Float>
      
      {/* Shopkeeper Avatar Indicator */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <group position={[0, 4, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#ffdd44"
            emissive="#ffdd44"
            emissiveIntensity={0.3}
          />
        </group>
      </Float>
    </group>
  );
};
