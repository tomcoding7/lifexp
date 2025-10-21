# 🚀 Quick Start Guide

Get your LifeXP tracker up and running in 3 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Canvas Confetti (celebrations!)

## Step 2: Run Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

## Step 3: Start Logging XP!

1. **Click the `+` button** in the bottom-right corner
2. **Choose a category** (Connection, Creative, Clarity, etc.)
3. **Select Quick Action or Custom**
   - Quick Actions: Pre-defined activities with fixed XP
   - Custom: Create your own activity and set XP amount
4. **Submit** and watch your progress grow!

## 🎮 Features Overview

### Dashboard
- View all 6 stat categories with progress bars
- See your overall Player Level
- Track your daily streak
- Monitor total XP earned

### Adding XP
- **Quick Actions**: One-click logging for common activities
- **Custom Entries**: Flexible logging with custom descriptions and XP amounts

### Leveling System
- 100 XP = 1 Level (customizable in `types/index.ts`)
- Confetti celebration on level-up! 🎉
- Motivational messages after each log

### Dark Mode
- Toggle between light and dark themes
- Auto-detects system preference

## 📝 Customization Tips

### Change XP Per Level
Edit `types/index.ts`:
```typescript
export const XP_PER_LEVEL = 150; // Change from 100
```

### Add Your Own Preset Actions
Edit `PRESET_ACTIONS` in `types/index.ts`:
```typescript
{
  id: 'my-action',
  statId: 'discipline',
  label: 'Cold shower',
  xp: 30
}
```

### Modify Colors
Edit `tailwind.config.ts` to change stat colors.

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Run on different port
npm run dev -- -p 3001
```

### Build errors?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Data not persisting?
Data is stored in browser LocalStorage. Check that:
- You're using the same browser
- LocalStorage isn't disabled
- You haven't cleared browser data

## 🚀 Production Build

```bash
npm run build
npm run start
```

## 📱 Mobile Experience

The app is fully responsive! Just open the URL on your phone.

For a better mobile experience, you can:
1. Open the app in your mobile browser
2. Tap the browser menu (⋮ on Android, Share button on iOS)
3. Select "Add to Home Screen"
4. Access like a native app!

## 🔥 Pro Tips

1. **Daily Logging**: Log at least one activity daily to maintain your streak
2. **Quick Actions**: Use presets for speed, custom for unique activities
3. **Balance Stats**: Try to level up all categories equally
4. **Set Goals**: Aim for specific levels in each category
5. **Track Progress**: Check the Recent Activity feed regularly

## 🎯 Next Steps

- Explore all 6 stat categories
- Try both Quick Actions and Custom logging
- Level up and see the confetti! 🎊
- Build a daily streak
- Share your progress with friends

**Happy leveling! 🚀✨**

