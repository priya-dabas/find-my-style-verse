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

## Current Development Status
- [x] Basic migration completed, app running
- [ ] Add visual product lineup displays like in attached image
- [ ] Implement voice AI with human avatar interface
- [ ] Create 3D room environments for each shop
- [ ] Add virtual try-on functionality with question mark icons

## User Preferences
- Building a 3D shopping game with AI interactions
- Prefers rich visual experience with Three.js
- Wants visual product displays like physical mall stores
- Requires voice AI with human face avatars instead of text chat
- Wants 3D room environments for each shop
- Needs virtual try-on functionality for clothing items
- Wants 5 specific products per category with detailed display

## Dependencies
- Three.js ecosystem (@react-three/fiber, @react-three/drei)
- AI chat functionality with toast notifications
- 3D fonts and assets for shop signage