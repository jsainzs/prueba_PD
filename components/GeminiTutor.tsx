
import React, { useState } from 'react';
import { explainConcept } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface GeminiTutorProps {
  slideContext: string;
}

export const GeminiTutor: React.FC<GeminiTutorProps> = ({ slideContext }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setAnswer('');

    try {
      const result = await explainConcept(slideContext, question);
      setAnswer(result);
    } catch (err) {
      setError('Hubo un error al contactar al tutor de IA. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <SparklesIcon />
          Pregúntale al Tutor de IA
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 border border-indigo-500/50 bg-slate-900/50 rounded-lg w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
        <SparklesIcon />
        Tutor de IA
      </h3>
      <p className="text-sm text-slate-400 mb-4">¿Tienes una pregunta sobre este tema? Escríbela aquí.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ej: ¿Por qué es un 'equilibrio' si ambos pierden?"
            className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Pensando...' : 'Preguntar'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}
      
      {answer && (
        <div className="mt-4 p-4 bg-slate-800 rounded-md">
          <p className="whitespace-pre-wrap text-slate-300">{answer}</p>
        </div>
      )}
    </div>
  );
};
