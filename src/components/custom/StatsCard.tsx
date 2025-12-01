'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className = ''
}: StatsCardProps) {
  return (
    <div 
      className={`
        bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] 
        border border-[#2A2A2A] rounded-2xl p-5
        hover:border-[#00FF7F]/30 transition-all duration-300
        hover:shadow-lg hover:shadow-[#00FF7F]/10
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-3xl font-bold font-inter">{value}</p>
          {subtitle && (
            <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        <div className="bg-[#00FF7F]/10 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-[#00FF7F]" strokeWidth={2} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-2">
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-[#00FF7F]' : 
            trend === 'down' ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
          <span className="text-gray-500 text-xs">vs yesterday</span>
        </div>
      )}
    </div>
  );
}
