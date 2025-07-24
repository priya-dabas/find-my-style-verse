export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
}

export interface ShopSection {
  name: string;
  products: Product[];
}

export interface Shopkeeper {
  name: string;
  personality: string;
  greeting: string;
  avatar: string;
  voiceId?: string;
}

export interface ShopData {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  theme: 'western' | 'ethnic' | 'home';
  shopkeeper: Shopkeeper;
  sections: ShopSection[];
  environment: '2d' | '3d';
}

export interface PlayerStats {
  coins: number;
  experience: number;
  level: number;
  achievements: string[];
  inventory: Product[];
}

export interface GameEvent {
  type: 'purchase' | 'discovery' | 'conversation' | 'try-on';
  shop: string;
  item?: string;
  reward: {
    coins?: number;
    experience?: number;
    achievement?: string;
  };
}