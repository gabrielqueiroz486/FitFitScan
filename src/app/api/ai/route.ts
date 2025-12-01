import { NextRequest, NextResponse } from 'next/server';
import { openai, SYSTEM_PROMPTS, AIRequest } from '@/lib/openai';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body: AIRequest = await request.json();
    const { type, message, userPreferences } = body;

    if (!message || !type) {
      return NextResponse.json(
        { error: 'Mensagem e tipo são obrigatórios' },
        { status: 400 }
      );
    }

    // Seleciona o prompt do sistema baseado no tipo
    let systemPrompt = SYSTEM_PROMPTS.nutritionConsultant;
    
    if (type === 'meal-recommendation') {
      systemPrompt = SYSTEM_PROMPTS.mealRecommendation;
    } else if (type === 'diet-plan') {
      systemPrompt = SYSTEM_PROMPTS.dietPlanning;
    }

    // Adiciona contexto das preferências do usuário
    let userContext = '';
    if (userPreferences) {
      const { dietaryRestrictions, healthGoals, allergies, targetCalories } = userPreferences;
      
      userContext = '\n\nContexto do usuário:';
      if (dietaryRestrictions?.length) {
        userContext += `\n- Restrições alimentares: ${dietaryRestrictions.join(', ')}`;
      }
      if (healthGoals?.length) {
        userContext += `\n- Objetivos de saúde: ${healthGoals.join(', ')}`;
      }
      if (allergies?.length) {
        userContext += `\n- Alergias: ${allergies.join(', ')}`;
      }
      if (targetCalories) {
        userContext += `\n- Meta de calorias diárias: ${targetCalories} kcal`;
      }
    }

    // Chama a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt + userContext,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';

    return NextResponse.json({
      success: true,
      response: aiResponse,
      usage: {
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
      },
    });

  } catch (error: any) {
    console.error('Erro na API da OpenAI:', error);

    // Tratamento de erros específicos
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Chave da API inválida. Verifique suas credenciais.' },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Limite de requisições atingido. Tente novamente em alguns instantes.' },
        { status: 429 }
      );
    }

    if (error?.status === 500) {
      return NextResponse.json(
        { error: 'Erro no servidor da OpenAI. Tente novamente mais tarde.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação. Tente novamente.' },
      { status: 500 }
    );
  }
}
