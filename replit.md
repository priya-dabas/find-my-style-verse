# Shopping Room 3D Game

## Overview
A 3D shopping experience with AI shopkeepers built using React Three.js, featuring multiple themed shops (Western, Ethnic, Home Decor) with interactive AI characters.

## Project Architecture
- **Frontend**: React 18 with Vite, Three.js/React Three Fiber for 3D rendering
- **Backend**: Express.js server with in-memory storage
- **Routing**: Migrating from React Router to Wouter (Replit standard)
- **State Management**: React Query for server state, local state for game logic
- **UI**: Shadcn/UI components with Tailwind CSS

## Recent Changes
- 2025-07-24: Successfully migrated from Lovable to Replit environment
- Fixed routing system to use Wouter for Replit compatibility
- Resolved dependency conflicts and created 2D fallback version
- User requested enhanced features: visual product displays, voice AI with human faces, 3D rooms
- Implemented 2D room environments with gamified pixel-art mall experience
- Added Meera as central AI assistant in each shop with product shelves around her
- Created organized product displays with 5 items per category as requested
- Optimized UI for mobile devices with responsive design and touch controls
- Redesigned shop layout with clean 4-rack system for better mobile experience
- Implemented cleaner visual design with card-based product racks and modern styling
- 2025-07-24: Completely redesigned for mobile-first experience based on user wireframes
- First screen: Clean mobile shop cards with compact layout and minimal design
- Second screen: Four corner categories with Meera AI assistant in center (wireframe layout)
- OpenAI integration working with API key for AI chat and virtual try-on features

## Current Development Status
- [x] Basic migration completed, app running
- [x] Add visual product lineup displays like in attached image
- [x] Implement voice AI with human avatar interface
- [x] Create 2D room environments for each shop with Meera as AI assistant
- [x] Add virtual try-on functionality with question mark icons
- [x] Gamify entire experience with pixel-art mall environment
- [x] Mobile-responsive design with touch-optimized controls
- [x] Clean mobile layout with organized 4-rack system for product display

## User Preferences
- Building a 3D shopping game with AI interactions
- Prefers rich visual experience with Three.js
- Wants visual product displays like physical mall stores
- Requires voice AI with human face avatars instead of text chat
- Wants 3D room environments for each shop
- Needs virtual try-on functionality for clothing items
- Wants 5 specific products per category with detailed display
- AI assistant should have Indian female voice and speak within the room (not redirect to new page)
- Virtual try-on should prompt for image upload and generate new images with AI saying "Wow, this looks so good on you"

## Dependencies
- Three.js ecosystem (@react-three/fiber, @react-three/drei) - for future 3D features
- AI chat functionality with toast notifications
- Speech Recognition API for voice interactions
- Web Speech API for text-to-speech responses
- Pixel-art styling with custom CSS for game UI
- OpenAI package installed for AI functionality and image generation