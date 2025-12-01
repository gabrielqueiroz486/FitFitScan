'use client';

import { useState } from 'react';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { AIRequestType } from '@/lib/openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  requestType: AIRequestType;
  placeholder: string;
  userPreferences?: {
    dietaryRestrictions?: string[];
    healthGoals?: string[];
    allergies?: string[];
    targetCalories?: number;
  };
}

export default function ChatInterface({ requestType, placeholder, userPreferences }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: requestType,
          message: input,
          userPreferences,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar solicitação');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'Erro ao se comunicar com a IA');
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
            <Sparkles className="w-16 h-16 text-[#00FF7F] mb-4" />
            <h3 className="text-xl font-bold mb-2">Assistente Nutricional IA</h3>
            <p className="text-gray-400 text-sm">
              Faça perguntas sobre nutrição, peça recomendações de refeições ou solicite um plano alimentar personalizado.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black'
                  : 'bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className={`text-xs mt-2 block ${
                message.role === 'user' ? 'text-black/60' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#2A2A2A] rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 text-[#00FF7F] animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-500 text-sm font-medium">Erro</p>
              <p className="text-red-400 text-xs mt-1">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl px-4 py-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F]/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-black p-2 rounded-xl hover:shadow-lg hover:shadow-[#00FF7F]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}
