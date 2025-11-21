# Streak Freak

A beautiful, personal habit tracker for wellness with AI-driven insights and motivational affirmations.

## Features

- 🎯 **Habit Tracking**: Track your daily habits with streak counters
- ⭐ **Priority System**: Set high, medium, or low priority for each habit
- 📅 **Calendar Editor**: Mark dates as complete retroactively from your streak start date
- 🤖 **AI Insights**: Get personalized insights and motivational affirmations based on your progress
- 🎨 **Beautiful Aurora Background**: Animated gradient background for a stunning visual experience
- 💾 **Local Storage**: All your data is saved locally in your browser
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Default Habits

The app comes with three default habits to get you started:
- Gym
- Meditate
- Drink Water

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/streak_freak.git
   cd streak_freak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (It's that easy)

## Usage

### Managing Habits

Each habit card has a kebab menu (three dots) with the following options:

- **Set Priority**: Change the priority level (High, Medium, Low)
- **Modify Habit**: Edit the habit name, change streak start date, or delete the habit
- **Set Streak Start Date**: Update when your streak began
- **Edit Calendar**: Mark previous dates as complete to build your streak

### Understanding Streaks

- Streaks are calculated based on consecutive completed days
- You can mark dates as complete retroactively from your streak start date
- The top 3 high-priority habits with the longest streaks appear at the top

### AI Insights

The AI Insights section provides:
- Performance-based motivational messages
- Personalized affirmations
- Statistics about your streaks

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **date-fns** - Date manipulation
- **lucide-react** - Icons
- **LocalStorage** - Data persistence

## Project Structure

```
streak_freak/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React Context for state management
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## License

This project is for personal use.

## Contributing

This is a personal project, but feel free to fork and customize for your own use!
