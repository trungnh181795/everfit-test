# Workout Planning & Training Calendar App

A full-featured web application for managing workout plans, sessions, and training schedules with an intuitive drag-and-drop calendar interface.

## Overview

This application helps users efficiently manage their workout routines through three core features:

1. **Dashboard** - View key statistics (sessions completed, weekly volume, exercises performed) and today's scheduled workouts
2. **Sessions Manager** - Full CRUD interface for creating, editing, and managing workout sessions independently from calendar scheduling
3. **Training Calendar** - Interactive weekly view (Monday-Sunday) with drag-and-drop functionality to schedule and reorder workout sessions

### Key Features

- **Drag & Drop Interface**: Move sessions between days and reorder within columns
- **Session Management**: Create reusable workout sessions with exercises and sets
- **Exercise Library**: Pre-defined exercises with details (muscle groups, equipment, descriptions)
- **Responsive Design**: Pixel-perfect UI matching design specifications
- **Real-time Updates**: Immediate visual feedback with database persistence

## Technical Notes

### Design & Implementation Decisions

- **Pixel Precision**: Design specifications included decimal pixel values (e.g., 1.5px). All values have been rounded up to the nearest whole number for consistent rendering across browsers.
  
- **Drag & Drop**: Implemented using `react-dnd` with `react-dnd-html5-backend` for robust drag-and-drop functionality through React hooks. This approach provides:
  - Clean separation of concerns with `useDrag` and `useDrop` hooks
  - Built-in hover detection and preview management
  - Cross-browser compatibility
  - Type-safe item transfers

- **Font Configuration**: Uses Open Sans as the primary font family, configured via `next/font/google` with Tailwind CSS variable mapping

- **Data Architecture**: Clear separation between:
  - Session/Exercise master data (stored in JSON files)
  - Calendar scheduling (sessionId → date mappings)
  - Order management (preserved through drag operations)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gym-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
gym-app/
├── app/                      # Next.js App Router pages
│   ├── calendar/            # Calendar view page
│   ├── api/                 # API routes (user, exercises, workout-sessions)
│   └── layout.tsx           # Root layout with font and providers
├── components/
│   ├── features/            # Feature-specific components
│   │   ├── Calendar/        # CalendarView, DayColumn, WeekNavigator
│   │   ├── Exercises/       # ExerciseCard
│   │   └── WorkoutSessions/ # WorkoutSessionCard
│   ├── ui/                  # Reusable UI components
│   ├── icons/               # Custom SVG icons
│   ├── common/              # Common components (AddIcon)
│   └── layout/              # Layout components (Header)
├── services/                # Business logic layer
│   ├── user.service.ts
│   ├── exercise.service.ts
│   ├── workoutSession.service.ts
│   └── storage.service.ts
├── data/                    # JSON data files
├── types/                   # TypeScript definitions
└── config/                  # Configuration files
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Library**: React 19.2
- **Drag & Drop**: react-dnd 16.0.1 + react-dnd-html5-backend 16.0.1
- **Icons**: Lucide React + Custom SVG components
- **Data Storage**: File-based JSON storage
- **Code Quality**: ESLint + Prettier

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React DnD Documentation](https://react-dnd.github.io/react-dnd/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
