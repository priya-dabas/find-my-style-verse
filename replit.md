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
- 2025-07-24: Started migration from Lovable to Replit environment
- Identified dependency conflicts with React Three.js requiring legacy peer deps resolution
- Need to migrate routing from React Router to Wouter for Replit compatibility

## Current Migration Status
- [•] Installing required packages with dependency resolution
- [ ] Fix routing system to use Wouter
- [ ] Test 3D rendering and AI shopkeeper functionality
- [ ] Verify project runs cleanly in Replit environment

## User Preferences
- Building a 3D shopping game with AI interactions
- Prefers rich visual experience with Three.js
- Wants functional AI shopkeepers for each themed store

## Dependencies
- Three.js ecosystem (@react-three/fiber, @react-three/drei)
- AI chat functionality with toast notifications
- 3D fonts and assets for shop signage