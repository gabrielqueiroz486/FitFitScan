// OpenAI Client Configuration
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY não configurada. Configure nas variáveis de ambiente.');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompts para diferentes funcionalidades
export const SYSTEM_PROMPTS = {
  mealRecommendation: `Você é um nutricionista especializado em recomendações alimentares personalizadas.
Forneça sugestões de refeições saudáveis, balanceadas e adequadas aos objetivos do usuário.
Sempre inclua informações nutricionais estimadas (calorias, proteínas, carboidratos, gorduras).
Seja específico, prático e motivador.`,

  nutritionConsultant: `Você é um consultor nutricional experiente.
Responda perguntas sobre nutrição de forma clara, precisa e baseada em evidências científicas.
Seja educativo e forneça dicas práticas que o usuário possa aplicar no dia a dia.`,

  dietPlanning: `Você é um planejador de dietas profissional.
Crie planos de refeições detalhados, balanceados e personalizados.
Considere as preferências, restrições alimentares e objetivos de saúde do usuário.
Forneça um plano estruturado com horários, porções e informações nutricionais.`,
};

// Tipos para as requisições
export type AIRequestType = 'meal-recommendation' | 'nutrition-question' | 'diet-plan';

export interface AIRequest {
  type: AIRequestType;
  message: string;
  userPreferences?: {
    dietaryRestrictions?: string[];
    healthGoals?: string[];
    allergies?: string[];
    targetCalories?: number;
  };
}
