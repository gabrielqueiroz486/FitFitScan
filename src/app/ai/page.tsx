'use client';

import { useState } from 'react';
import { Sparkles, Utensils, MessageCircle, Calendar, ChevronRight } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import { AIRequestType } from '@/lib/openai';

type AIMode = 'meal-recommendation' | 'nutrition-question' | 'diet-plan';

interface ModeConfig {
  id: AIMode;
  title: string;
  description: string;
  icon: any;
  placeholder: string;
  gradient: string;
}

const modes: ModeConfig[] = [
  {
    id: 'meal-recommendation',
    title: 'Recomendações de Refeições',
    description: 'Receba sugestões personalizadas de receitas e refeições',
    icon: Utensils,
    placeholder: 'Ex: Sugira um almoço rico em proteínas e baixo em carboidratos',
    gradient: 'from-[#00FF7F] to-[#00CC66]',
  },
  {
    id: 'nutrition-question',
    title: 'Consultas Nutricionais',
    description: 'Tire dúvidas sobre nutrição e alimentação saudável',
    icon: MessageCircle,
    placeholder: 'Ex: Qual a diferença entre proteína animal e vegetal?',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'diet-plan',
    title: 'Planejamento de Dietas',
    description: 'Crie planos alimentares diários ou semanais',
    icon: Calendar,
    placeholder: 'Ex: Crie um plano de 7 dias para ganho de massa muscular',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function AIPage() {
  const [selectedMode, setSelectedMode] = useState<AIMode | null>(null);
  const [userPreferences] = useState({
    targetCalories: 2000,
    dietaryRestrictions: [],
    healthGoals: ['Manter peso', 'Alimentação saudável'],
    allergies: [],
  });

  if (selectedMode) {
    const mode = modes.find((m) => m.id === selectedMode);
    if (!mode) return null;

    return (
      <div className="max-w-md mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => setSelectedMode(null)}
            className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Voltar
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center`}>
              <mode.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-inter">{mode.title}</h1>
              <p className="text-gray-400 text-sm">{mode.description}</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatInterface
            requestType={selectedMode as AIRequestType}
            placeholder={mode.placeholder}
            userPreferences={userPreferences}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-[#00FF7F]" />
          <h1 className="text-3xl font-bold font-inter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Assistente IA
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Escolha como deseja que a IA te ajude hoje
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="space-y-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="w-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#00FF7F]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1">{mode.title}</h3>
                  <p className="text-gray-400 text-sm">{mode.description}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-[#00FF7F]/10 to-[#00CC66]/10 border border-[#00FF7F]/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#00FF7F] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#00FF7F] mb-1">Powered by GPT-4</h4>
            <p className="text-gray-300 text-sm">
              Todas as recomendações são geradas por inteligência artificial avançada e personalizadas para você.
            </p>
          </div>
        </div>
      </div>

      {/* User Preferences Preview */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5">
        <h3 className="text-lg font-bold mb-3">Suas Preferências</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Meta de Calorias:</span>
            <span className="text-white font-medium">{userPreferences.targetCalories} kcal/dia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Objetivos:</span>
            <span className="text-white font-medium">{userPreferences.healthGoals.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
