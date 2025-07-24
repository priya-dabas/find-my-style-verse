export interface ShopSection {
  name: string;
  items: string[];
}

export interface Shopkeeper {
  name: string;
  personality: string;
  greeting: string;
}

export interface ShopData {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  theme: 'western' | 'ethnic' | 'home';
  shopkeeper: Shopkeeper;
  sections: ShopSection[];
}

export interface PlayerStats {
  coins: number;
  experience: number;
  level: number;
  achievements: string[];
}

export interface GameEvent {
  type: 'purchase' | 'discovery' | 'conversation';
  shop: string;
  item?: string;
  reward: {
    coins?: number;
    experience?: number;
    achievement?: string;
  };
}