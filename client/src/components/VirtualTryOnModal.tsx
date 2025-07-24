import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Loader2 } from 'lucide-react';
import { Product } from '../types/shop';
import { useToast } from '@/hooks/use-toast';

interface VirtualTryOnModalProps {
  product: Product;
  onClose: () => void;
  onTryOnComplete: (imageUrl: string, message: string) => void;
}

export const VirtualTryOnModal = ({ product, onClose, onTryOnComplete }: VirtualTryOnModalProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setUploadedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVirtualTryOn = async () => {
    if (!uploadedImage) {
      toast({
        title: "Please upload an image",
        description: "We need your photo to show how the item looks on you",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/virtual-tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.name,
          productCategory: product.category,
          userImageBase64: uploadedImage
        }),
      });

      const data = await response.json();

      if (data.success) {
        onTryOnComplete(data.imageUrl, data.message);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to generate try-on image');
      }
    } catch (error: any) {
      console.error('Virtual try-on error:', error);
      toast({
        title: "Try-on failed",
        description: error.message || "Failed to generate virtual try-on image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="max-w-md w-full bg-white max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">Virtual Try-On</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
          {/* Mobile-Optimized Product Info */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center text-3xl sm:text-4xl">
              {product.category.includes('T-shirt') && '👕'}
              {product.category.includes('Jeans') && '👖'}
              {product.category.includes('Cap') && '🧢'}
              {product.category.includes('Shoe') && '👟'}
              {product.category.includes('Saree') && '🥻'}
              {product.category.includes('Kurti') && '👗'}
              {product.category.includes('Sherwani') && '🤵'}
              {product.category.includes('Jooti') && '👞'}
            </div>
            <h3 className="font-bold text-sm sm:text-base">{product.name}</h3>
            <Badge className="mt-1 text-xs sm:text-sm">₹{product.price}</Badge>
          </div>

          {/* Mobile-Optimized Image Upload */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="font-semibold text-center text-sm sm:text-base">Upload Your Photo</h4>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-purple-400 transition-colors touch-manipulation"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="space-y-2">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-xs sm:text-sm text-green-600">✓ Photo uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto" />
                  <p className="text-xs sm:text-sm text-gray-600">Tap to upload your photo</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Mobile-Optimized Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 text-sm py-2"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVirtualTryOn}
              disabled={!uploadedImage || isGenerating}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm py-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 animate-spin" />
                  <span className="hidden sm:inline">Generating...</span>
                  <span className="sm:hidden">Gen...</span>
                </>
              ) : (
                <span>Try It On!</span>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="text-center text-xs sm:text-sm text-gray-600">
              <p>Creating your virtual try-on...</p>
              <p className="hidden sm:block">This may take a few moments</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};