// FitScan - Types
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  timestamp: Date;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyStats {
  date: string;
  totalCalories: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
}

export interface UserProfile {
  name: string;
  email: string;
  targetCalories: number;
  weight: number;
  height: number;
  age: number;
  badges: Badge[];
  dietaryRestrictions?: string[];
  healthGoals?: string[];
  allergies?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  meal: Meal;
  likes: number;
  comments: number;
  timestamp: Date;
}

// AI Integration Types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  success: boolean;
  response: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

export interface MealRecommendation {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
}

export interface DietPlan {
  duration: string;
  totalCalories: number;
  meals: {
    day: string;
    breakfast: MealRecommendation;
    lunch: MealRecommendation;
    dinner: MealRecommendation;
    snacks?: MealRecommendation[];
  }[];
}
