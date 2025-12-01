'use client';

import { Flame, Target, TrendingUp, Zap, Camera, Award } from 'lucide-react';
import StatsCard from '@/components/custom/StatsCard';
import { mockDailyStats, weeklyCaloriesData, mockBadges } from '@/lib/mock-data';

export default function Dashboard() {
  const stats = mockDailyStats;
  const caloriesPercentage = (stats.totalCalories / stats.targetCalories) * 100;
  const remainingCalories = stats.targetCalories - stats.totalCalories;

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-inter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          FitScan
        </h1>
        <p className="text-gray-400 text-sm">Track your nutrition with AI precision</p>
      </div>

      {/* Main Calorie Ring */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF7F]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#1A1A1A"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${caloriesPercentage * 5.53} 553`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF7F" />
                  <stop offset="100%" stopColor="#00CC66" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Flame className="w-8 h-8 text-[#00FF7F] mb-2" />
              <p className="text-4xl font-bold font-inter">{stats.totalCalories}</p>
              <p className="text-gray-400 text-sm">of {stats.targetCalories} kcal</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-[#00FF7F] mb-1">
              {remainingCalories} kcal left
            </p>
            <p className="text-gray-500 text-sm">Keep going! You're doing great 🔥</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          title="Protein"
          value={`${stats.protein}g`}
          icon={Zap}
          trend="up"
          trendValue="+12g"
        />
        <StatsCard
          title="Carbs"
          value={`${stats.carbs}g`}
          icon={Target}
          trend="neutral"
          trendValue="±0g"
        />
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-inter">Weekly Progress</h3>
          <TrendingUp className="w-5 h-5 text-[#00FF7F]" />
        </div>
        
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyCaloriesData.map((day, index) => {
            const percentage = (day.calories / day.target) * 100;
            const isToday = index === weeklyCaloriesData.length - 1;
            
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#1A1A1A] rounded-lg overflow-hidden relative h-full">
                  <div
                    className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                      isToday 
                        ? 'bg-gradient-to-t from-[#00FF7F] to-[#00CC66]' 
                        : percentage > 100 
                          ? 'bg-gradient-to-t from-red-500 to-red-400'
                          : 'bg-gradient-to-t from-[#00FF7F]/40 to-[#00CC66]/40'
                    }`}
                    style={{ height: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${
                  isToday ? 'text-[#00FF7F]' : 'text-gray-500'
                }`}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Meals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-inter">Today's Meals</h3>
          <span className="text-sm text-gray-400">{stats.meals.length} meals</span>
        </div>

        {stats.meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#00FF7F]/30 transition-all duration-300"
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#1A1A1A]">
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white truncate">{meal.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{meal.type}</p>
                  </div>
                  <span className="text-[#00FF7F] font-bold text-sm whitespace-nowrap ml-2">
                    {meal.calories} kcal
                  </span>
                </div>
                
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Scan Button */}
      <button className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#00FF7F]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
        <Camera className="w-6 h-6" />
        Scan New Meal
      </button>

      {/* Badges Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-inter">Achievements</h3>
          <Award className="w-5 h-5 text-[#00FF7F]" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {mockBadges.map((badge) => (
            <div
              key={badge.id}
              className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${
                badge.unlockedAt
                  ? 'bg-gradient-to-br from-[#00FF7F]/20 to-[#00CC66]/20 border-2 border-[#00FF7F]/50'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] opacity-40'
              }`}
            >
              <span className="text-2xl">
                {badge.unlockedAt ? '🏆' : '🔒'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
