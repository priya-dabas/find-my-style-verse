import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, HelpCircle } from 'lucide-react';
import { Product } from '../types/shop';

interface ProductDisplayProps {
  products: Product[];
  categoryName: string;
  onPurchase: (product: Product) => void;
  onTryOn: (product: Product) => void;
  playerCoins: number;
}

export const ProductDisplay = ({ products, categoryName, onPurchase, onTryOn, playerCoins }: ProductDisplayProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white bg-black/80 px-4 py-2 rounded-lg inline-block">
          {categoryName}
        </h3>
      </div>
      
      {/* Product Grid - Mall Style Display */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-amber-400 bg-white"
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative mb-3">
                  <div 
                    className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-4xl"
                    style={{ 
                      backgroundImage: `url(${product.image})`, 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!product.image.includes('placeholder') && '📷'}
                  </div>
                  
                  {/* Try-On Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTryOn(product);
                    }}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm line-clamp-2 text-gray-800">
                    {product.name}
                  </h4>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-lg font-bold">
                      ₹{product.price}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPurchase(product);
                      }}
                      disabled={playerCoins < product.price}
                      className="text-xs"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div 
                className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-6xl"
                style={{ 
                  backgroundImage: `url(${selectedProduct.image})`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!selectedProduct.image.includes('placeholder') && '📷'}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-3">{selectedProduct.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(selectedProduct.rating)}
                <span className="text-sm text-gray-500">({selectedProduct.rating}/5)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className="text-xl font-bold">₹{selectedProduct.price}</Badge>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onTryOn(selectedProduct)}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Try On
                  </Button>
                  <Button
                    onClick={() => {
                      onPurchase(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={playerCoins < selectedProduct.price}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};