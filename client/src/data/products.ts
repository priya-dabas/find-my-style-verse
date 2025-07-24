import { Product } from '../types/shop';

export const westernProducts: Record<string, Product[]> = {
  'T-shirts - Men': [
    {
      id: 'tshirt-1',
      name: 'Classic White Tee',
      price: 25,
      image: '/api/placeholder/200/250',
      description: 'Premium cotton classic white t-shirt',
      rating: 4,
      category: 'T-shirts - Men'
    },
    {
      id: 'tshirt-2',
      name: 'Graphic Vintage Band',
      price: 35,
      image: '/api/placeholder/200/250',
      description: 'Vintage band graphic tee with distressed look',
      rating: 5,
      category: 'T-shirts - Men'
    },
    {
      id: 'tshirt-3',
      name: 'Polo Shirt Navy',
      price: 45,
      image: '/api/placeholder/200/250',
      description: 'Classic navy polo shirt for casual elegance',
      rating: 4,
      category: 'T-shirts - Men'
    },
    {
      id: 'tshirt-4',
      name: 'Sports Performance Tee',
      price: 40,
      image: '/api/placeholder/200/250',
      description: 'Moisture-wicking performance t-shirt',
      rating: 5,
      category: 'T-shirts - Men'
    },
    {
      id: 'tshirt-5',
      name: 'Henley Long Sleeve',
      price: 50,
      image: '/api/placeholder/200/250',
      description: 'Casual henley with long sleeves',
      rating: 4,
      category: 'T-shirts - Men'
    }
  ],
  'Jeans': [
    {
      id: 'jeans-1',
      name: 'Slim Fit Dark Wash',
      price: 80,
      image: '/api/placeholder/200/250',
      description: 'Modern slim fit jeans in dark wash',
      rating: 5,
      category: 'Jeans'
    },
    {
      id: 'jeans-2',
      name: 'Straight Cut Classic',
      price: 75,
      image: '/api/placeholder/200/250',
      description: 'Timeless straight cut denim jeans',
      rating: 4,
      category: 'Jeans'
    },
    {
      id: 'jeans-3',
      name: 'Ripped Style Distressed',
      price: 90,
      image: '/api/placeholder/200/250',
      description: 'Trendy ripped jeans with authentic distressing',
      rating: 4,
      category: 'Jeans'
    },
    {
      id: 'jeans-4',
      name: 'Bootcut Light Wash',
      price: 70,
      image: '/api/placeholder/200/250',
      description: 'Comfortable bootcut jeans in light wash',
      rating: 4,
      category: 'Jeans'
    },
    {
      id: 'jeans-5',
      name: 'Skinny Fit Black',
      price: 85,
      image: '/api/placeholder/200/250',
      description: 'Sleek skinny fit jeans in black',
      rating: 5,
      category: 'Jeans'
    }
  ],
  'Caps': [
    {
      id: 'cap-1',
      name: 'Baseball Cap Classic',
      price: 20,
      image: '/api/placeholder/200/200',
      description: 'Classic baseball cap with adjustable strap',
      rating: 4,
      category: 'Caps'
    },
    {
      id: 'cap-2',
      name: 'Snapback Urban',
      price: 25,
      image: '/api/placeholder/200/200',
      description: 'Urban style snapback with flat brim',
      rating: 5,
      category: 'Caps'
    },
    {
      id: 'cap-3',
      name: 'Beanie Winter',
      price: 15,
      image: '/api/placeholder/200/200',
      description: 'Warm winter beanie in soft wool',
      rating: 4,
      category: 'Caps'
    },
    {
      id: 'cap-4',
      name: 'Trucker Mesh',
      price: 22,
      image: '/api/placeholder/200/200',
      description: 'Classic trucker cap with mesh back',
      rating: 4,
      category: 'Caps'
    },
    {
      id: 'cap-5',
      name: 'Bucket Hat Safari',
      price: 30,
      image: '/api/placeholder/200/200',
      description: 'Safari-style bucket hat for outdoor adventures',
      rating: 4,
      category: 'Caps'
    }
  ],
  'Sport Shoes': [
    {
      id: 'shoes-1',
      name: 'Running Shoes Pro',
      price: 120,
      image: '/api/placeholder/200/200',
      description: 'Professional running shoes with advanced cushioning',
      rating: 5,
      category: 'Sport Shoes'
    },
    {
      id: 'shoes-2',
      name: 'Basketball High-tops',
      price: 140,
      image: '/api/placeholder/200/200',
      description: 'High-performance basketball shoes',
      rating: 5,
      category: 'Sport Shoes'
    },
    {
      id: 'shoes-3',
      name: 'Casual Sneakers',
      price: 80,
      image: '/api/placeholder/200/200',
      description: 'Comfortable casual sneakers for everyday wear',
      rating: 4,
      category: 'Sport Shoes'
    },
    {
      id: 'shoes-4',
      name: 'Training Cross-trainers',
      price: 110,
      image: '/api/placeholder/200/200',
      description: 'Versatile cross-training shoes',
      rating: 4,
      category: 'Sport Shoes'
    },
    {
      id: 'shoes-5',
      name: 'Tennis Court Shoes',
      price: 100,
      image: '/api/placeholder/200/200',
      description: 'Professional tennis court shoes',
      rating: 4,
      category: 'Sport Shoes'
    }
  ]
};

export const ethnicProducts: Record<string, Product[]> = {
  'Sarees': [
    {
      id: 'saree-1',
      name: 'Silk Saree Royal',
      price: 150,
      image: '/api/placeholder/200/250',
      description: 'Luxurious royal silk saree with golden border',
      rating: 5,
      category: 'Sarees'
    },
    {
      id: 'saree-2',
      name: 'Cotton Saree Handloom',
      price: 80,
      image: '/api/placeholder/200/250',
      description: 'Traditional handloom cotton saree',
      rating: 4,
      category: 'Sarees'
    },
    {
      id: 'saree-3',
      name: 'Designer Georgette',
      price: 120,
      image: '/api/placeholder/200/250',
      description: 'Modern designer georgette saree',
      rating: 5,
      category: 'Sarees'
    },
    {
      id: 'saree-4',
      name: 'Wedding Banarasi',
      price: 200,
      image: '/api/placeholder/200/250',
      description: 'Exquisite Banarasi wedding saree',
      rating: 5,
      category: 'Sarees'
    },
    {
      id: 'saree-5',
      name: 'Chiffon Party Wear',
      price: 90,
      image: '/api/placeholder/200/250',
      description: 'Elegant chiffon saree for parties',
      rating: 4,
      category: 'Sarees'
    }
  ],
  'Kurti': [
    {
      id: 'kurti-1',
      name: 'Anarkali Floral',
      price: 60,
      image: '/api/placeholder/200/250',
      description: 'Beautiful floral anarkali kurti',
      rating: 5,
      category: 'Kurti'
    },
    {
      id: 'kurti-2',
      name: 'Straight Cut Cotton',
      price: 45,
      image: '/api/placeholder/200/250',
      description: 'Comfortable straight cut cotton kurti',
      rating: 4,
      category: 'Kurti'
    },
    {
      id: 'kurti-3',
      name: 'A-Line Designer',
      price: 70,
      image: '/api/placeholder/200/250',
      description: 'Trendy A-line designer kurti',
      rating: 5,
      category: 'Kurti'
    },
    {
      id: 'kurti-4',
      name: 'Printed Block Print',
      price: 55,
      image: '/api/placeholder/200/250',
      description: 'Traditional block print kurti',
      rating: 4,
      category: 'Kurti'
    },
    {
      id: 'kurti-5',
      name: 'Embroidered Festive',
      price: 85,
      image: '/api/placeholder/200/250',
      description: 'Festive embroidered kurti',
      rating: 5,
      category: 'Kurti'
    }
  ],
  'Sherwani': [
    {
      id: 'sherwani-1',
      name: 'Royal Silk Sherwani',
      price: 180,
      image: '/api/placeholder/200/250',
      description: 'Majestic royal silk sherwani for weddings',
      rating: 5,
      category: 'Sherwani'
    },
    {
      id: 'sherwani-2',
      name: 'Cream Brocade',
      price: 160,
      image: '/api/placeholder/200/250',
      description: 'Elegant cream brocade sherwani',
      rating: 5,
      category: 'Sherwani'
    },
    {
      id: 'sherwani-3',
      name: 'Maroon Velvet',
      price: 200,
      image: '/api/placeholder/200/250',
      description: 'Luxurious maroon velvet sherwani',
      rating: 5,
      category: 'Sherwani'
    },
    {
      id: 'sherwani-4',
      name: 'Gold Embroidered',
      price: 220,
      image: '/api/placeholder/200/250',
      description: 'Ornate gold embroidered sherwani',
      rating: 5,
      category: 'Sherwani'
    },
    {
      id: 'sherwani-5',
      name: 'Navy Blue Classic',
      price: 150,
      image: '/api/placeholder/200/250',
      description: 'Classic navy blue sherwani',
      rating: 4,
      category: 'Sherwani'
    }
  ],
  'Jootis': [
    {
      id: 'jooti-1',
      name: 'Mojari Leather',
      price: 40,
      image: '/api/placeholder/200/150',
      description: 'Traditional leather mojari shoes',
      rating: 4,
      category: 'Jootis'
    },
    {
      id: 'jooti-2',
      name: 'Punjabi Jutti Embroidered',
      price: 50,
      image: '/api/placeholder/200/150',
      description: 'Colorful embroidered Punjabi jutti',
      rating: 5,
      category: 'Jootis'
    },
    {
      id: 'jooti-3',
      name: 'Kolhapuri Chappal',
      price: 35,
      image: '/api/placeholder/200/150',
      description: 'Authentic Kolhapuri leather chappals',
      rating: 4,
      category: 'Jootis'
    },
    {
      id: 'jooti-4',
      name: 'Rajasthani Camel Leather',
      price: 60,
      image: '/api/placeholder/200/150',
      description: 'Premium Rajasthani camel leather jootis',
      rating: 5,
      category: 'Jootis'
    },
    {
      id: 'jooti-5',
      name: 'Velvet Party Jootis',
      price: 45,
      image: '/api/placeholder/200/150',
      description: 'Elegant velvet jootis for parties',
      rating: 4,
      category: 'Jootis'
    }
  ]
};

export const homeDecorProducts: Record<string, Product[]> = {
  'Lamps': [
    {
      id: 'lamp-1',
      name: 'Modern Table Lamp',
      price: 80,
      image: '/api/placeholder/200/200',
      description: 'Contemporary table lamp with adjustable brightness',
      rating: 5,
      category: 'Lamps'
    },
    {
      id: 'lamp-2',
      name: 'Floor Lamp Industrial',
      price: 120,
      image: '/api/placeholder/200/200',
      description: 'Industrial style floor lamp with metal finish',
      rating: 4,
      category: 'Lamps'
    },
    {
      id: 'lamp-3',
      name: 'Ceiling Pendant Light',
      price: 100,
      image: '/api/placeholder/200/200',
      description: 'Elegant ceiling pendant light fixture',
      rating: 5,
      category: 'Lamps'
    },
    {
      id: 'lamp-4',
      name: 'Himalayan Salt Lamp',
      price: 60,
      image: '/api/placeholder/200/200',
      description: 'Natural Himalayan salt decorative lamp',
      rating: 4,
      category: 'Lamps'
    },
    {
      id: 'lamp-5',
      name: 'LED Strip Lights',
      price: 40,
      image: '/api/placeholder/200/200',
      description: 'Smart LED strip lights with color changing',
      rating: 4,
      category: 'Lamps'
    }
  ],
  'Wall Paintings': [
    {
      id: 'painting-1',
      name: 'Abstract Canvas Art',
      price: 150,
      image: '/api/placeholder/200/200',
      description: 'Modern abstract canvas painting',
      rating: 5,
      category: 'Wall Paintings'
    },
    {
      id: 'painting-2',
      name: 'Landscape Photography',
      price: 90,
      image: '/api/placeholder/200/200',
      description: 'Beautiful landscape photography print',
      rating: 4,
      category: 'Wall Paintings'
    },
    {
      id: 'painting-3',
      name: 'Portrait Oil Painting',
      price: 200,
      image: '/api/placeholder/200/200',
      description: 'Classic portrait in oil painting style',
      rating: 5,
      category: 'Wall Paintings'
    },
    {
      id: 'painting-4',
      name: 'Geometric Modern Art',
      price: 120,
      image: '/api/placeholder/200/200',
      description: 'Contemporary geometric art piece',
      rating: 4,
      category: 'Wall Paintings'
    },
    {
      id: 'painting-5',
      name: 'Botanical Print Set',
      price: 80,
      image: '/api/placeholder/200/200',
      description: 'Set of 3 botanical prints',
      rating: 4,
      category: 'Wall Paintings'
    }
  ],
  'Plants': [
    {
      id: 'plant-1',
      name: 'Succulent Garden Kit',
      price: 30,
      image: '/api/placeholder/200/200',
      description: 'Complete succulent garden starter kit',
      rating: 5,
      category: 'Plants'
    },
    {
      id: 'plant-2',
      name: 'Boston Fern',
      price: 25,
      image: '/api/placeholder/200/200',
      description: 'Lush Boston fern in decorative pot',
      rating: 4,
      category: 'Plants'
    },
    {
      id: 'plant-3',
      name: 'Snake Plant Large',
      price: 40,
      image: '/api/placeholder/200/200',
      description: 'Large snake plant for air purification',
      rating: 5,
      category: 'Plants'
    },
    {
      id: 'plant-4',
      name: 'Peace Lily White',
      price: 35,
      image: '/api/placeholder/200/200',
      description: 'Elegant white peace lily plant',
      rating: 4,
      category: 'Plants'
    },
    {
      id: 'plant-5',
      name: 'Fiddle Leaf Fig',
      price: 60,
      image: '/api/placeholder/200/200',
      description: 'Trendy fiddle leaf fig tree',
      rating: 5,
      category: 'Plants'
    }
  ],
  'Rugs': [
    {
      id: 'rug-1',
      name: 'Persian Vintage Rug',
      price: 300,
      image: '/api/placeholder/200/200',
      description: 'Authentic vintage Persian rug',
      rating: 5,
      category: 'Rugs'
    },
    {
      id: 'rug-2',
      name: 'Modern Geometric',
      price: 180,
      image: '/api/placeholder/200/200',
      description: 'Contemporary geometric pattern rug',
      rating: 4,
      category: 'Rugs'
    },
    {
      id: 'rug-3',
      name: 'Shag Carpet Soft',
      price: 150,
      image: '/api/placeholder/200/200',
      description: 'Ultra-soft shag carpet',
      rating: 4,
      category: 'Rugs'
    },
    {
      id: 'rug-4',
      name: 'Jute Natural Rug',
      price: 100,
      image: '/api/placeholder/200/200',
      description: 'Eco-friendly natural jute rug',
      rating: 4,
      category: 'Rugs'
    },
    {
      id: 'rug-5',
      name: 'Oriental Traditional',
      price: 250,
      image: '/api/placeholder/200/200',
      description: 'Traditional oriental design rug',
      rating: 5,
      category: 'Rugs'
    }
  ]
};