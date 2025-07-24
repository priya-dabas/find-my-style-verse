import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Virtual try-on image generation
router.post('/virtual-tryon', async (req, res) => {
  try {
    const { productName, productCategory, userImageBase64 } = req.body;

    if (!userImageBase64 || !productName || !productCategory) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate a new image with the user wearing the product
    const prompt = `Generate a realistic image showing a person wearing ${productName} from the ${productCategory} category. The person should look happy and stylish. Make it look like a professional fashion photo with good lighting and composition. The clothing should fit well and look natural.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const generatedImageUrl = response.data[0]?.url;

    res.json({
      success: true,
      imageUrl: generatedImageUrl,
      message: "Wow, this looks so good on you!"
    });

  } catch (error: any) {
    console.error('Virtual try-on error:', error);
    res.status(500).json({ 
      error: 'Failed to generate virtual try-on image',
      details: error?.message || 'Unknown error' 
    });
  }
});

// AI voice chat responses
router.post('/chat', async (req, res) => {
  try {
    const { message, shopContext, productContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are Meera, a friendly Indian female AI shopping assistant working in a ${shopContext?.name || 'shopping'} store. You help customers find products and provide shopping advice. 

Current shop context: ${shopContext ? JSON.stringify(shopContext) : 'General shopping'}
Available products: ${productContext ? JSON.stringify(productContext) : 'Various items'}

Respond in a warm, helpful manner as an Indian female would. Keep responses concise and focused on helping the customer. Use natural, conversational language.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content;

    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error: any) {
    console.error('AI chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      details: error?.message || 'Unknown error' 
    });
  }
});

export default router;