'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Sparkles, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/capture', icon: Camera, label: 'Scan' },
  { href: '/ai', icon: Sparkles, label: 'AI' },
  { href: '/profile', icon: User, label: 'Profile' }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#1A1A1A] z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-[#00FF7F]' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon 
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
