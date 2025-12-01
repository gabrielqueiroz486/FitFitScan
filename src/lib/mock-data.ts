// FitScan - Mock Data
import { DailyStats, Badge, CommunityPost, Meal } from './types';

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Avocado Toast',
    calories: 320,
    protein: 12,
    carbs: 35,
    fat: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    timestamp: new Date('2024-01-15T08:30:00'),
    type: 'breakfast'
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 42,
    carbs: 28,
    fat: 15,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    timestamp: new Date('2024-01-15T12:45:00'),
    type: 'lunch'
  },
  {
    id: '3',
    name: 'Protein Smoothie',
    calories: 280,
    protein: 25,
    carbs: 32,
    fat: 8,
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    timestamp: new Date('2024-01-15T15:20:00'),
    type: 'snack'
  }
];

export const mockDailyStats: DailyStats = {
  date: '2024-01-15',
  totalCalories: 1050,
  targetCalories: 2000,
  protein: 79,
  carbs: 95,
  fat: 41,
  meals: mockMeals
};

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Scan',
    description: 'Scanned your first meal',
    icon: 'Camera',
    unlockedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Tracked meals for 7 days straight',
    icon: 'Trophy',
    unlockedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Protein Master',
    description: 'Hit protein goal 10 times',
    icon: 'Zap'
  },
  {
    id: '4',
    name: 'Calorie Champion',
    description: 'Stay within calorie goal for 30 days',
    icon: 'Target'
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    meal: mockMeals[0],
    likes: 24,
    comments: 5,
    timestamp: new Date('2024-01-15T09:00:00')
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mike Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    meal: mockMeals[1],
    likes: 18,
    comments: 3,
    timestamp: new Date('2024-01-15T13:00:00')
  }
];

export const weeklyCaloriesData = [
  { day: 'Mon', calories: 1850, target: 2000 },
  { day: 'Tue', calories: 2100, target: 2000 },
  { day: 'Wed', calories: 1920, target: 2000 },
  { day: 'Thu', calories: 1780, target: 2000 },
  { day: 'Fri', calories: 2050, target: 2000 },
  { day: 'Sat', calories: 1650, target: 2000 },
  { day: 'Sun', calories: 1050, target: 2000 }
];
