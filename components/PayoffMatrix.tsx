import React, { useState } from 'react';
import type { PayoffMatrixProps } from '../types';

export const PayoffMatrix: React.FC<PayoffMatrixProps> = ({ player1, player2, payoffs, payoffLabels, interactive }) => {
  const [analysisFor, setAnalysisFor] = useState<'p1' | 'p2' | null>(null);
  const [assumedOpponentStrategy, setAssumedOpponentStrategy] = useState<0 | 1 | null>(null);

  const getPayoffColor = (value: number) => {
    if (payoffLabels?.higherIsBetter) {
      if (value >= 4 || value >= 50) return 'text-green-400';
      if (value <= 1 || value <= 20) return 'text-red-400';
      return 'text-yellow-400';
    } else {
      if (value >= -1) return 'text-green-400';
      if (value <= -8) return 'text-red-400';
      return 'text-yellow-400';
    }
  };
  
  const isBestResponse = (row: number, col: number) => {
    if (!analysisFor || assumedOpponentStrategy === null) return false;

    // For player 1's analysis, compare payoffs vertically within the assumed column
    if (analysisFor === 'p1' && col === assumedOpponentStrategy) {
      const myPayoff = payoffs[row][col][0];
      const otherRow = row === 0 ? 1 : 0;
      const otherPayoff = payoffs[otherRow][col][0];
      // Note: for jail time (-1 > -8), higher number is better. This logic holds for positive payoffs too.
      return myPayoff >= otherPayoff;
    }

    // For player 2's analysis, compare payoffs horizontally within the assumed row
    if (analysisFor === 'p2' && row === assumedOpponentStrategy) {
      const myPayoff = payoffs[row][col][1];
      const otherCol = col === 0 ? 1 : 0;
      const otherPayoff = payoffs[row][otherCol][1];
      return myPayoff >= otherPayoff;
    }
    return false;
  };


  const handleReset = () => {
    setAnalysisFor(null);
    setAssumedOpponentStrategy(null);
  };
  
  const startAnalysis = (player: 'p1' | 'p2') => {
    setAnalysisFor(player);
    setAssumedOpponentStrategy(null);
  }

  const getCellClasses = (row: number, col: number) => {
    let dimmed = false;
    if (analysisFor === 'p1' && assumedOpponentStrategy !== null) {
      dimmed = col !== assumedOpponentStrategy;
    } else if (analysisFor === 'p2' && assumedOpponentStrategy !== null) {
      dimmed = row !== assumedOpponentStrategy;
    }
    
    const highlight = isBestResponse(row, col);

    return `p-3 text-center bg-slate-700/50 rounded flex items-center justify-center font-mono text-lg transition-all duration-300 ${dimmed ? 'opacity-20 scale-95' : 'hover:scale-110 hover:bg-slate-700'} ${highlight ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-cyan-400' : ''}`;
  };

  const getPayoffSpanClasses = (payoffIndex: 0 | 1) => {
    let dimmed = false;
    // When analyzing for P1, dim P2's payoffs
    if (analysisFor === 'p1' && assumedOpponentStrategy !== null && payoffIndex === 1) {
      dimmed = true;
    } 
    // When analyzing for P2, dim P1's payoffs
    else if (analysisFor === 'p2' && assumedOpponentStrategy !== null && payoffIndex === 0) {
      dimmed = true;
    }
    return `transition-opacity duration-300 ${dimmed ? 'opacity-20' : ''}`;
  };

  const analysisText = () => {
      if (!interactive) return "";
      if (!analysisFor) return "Sigue los pasos para analizar la matriz.";
      if (assumedOpponentStrategy === null) {
          const opponentName = analysisFor === 'p1' ? player2.name : player1.name;
          return `Paso 1: Asume una acción de ${opponentName}.`;
      }
      const currentAnalyist = analysisFor === 'p1' ? player1.name : player2.name;
      return `Paso 2: Compara los pagos para ${currentAnalyist} y encuentra su mejor respuesta.`;
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative p-4 bg-slate-900 rounded-lg border border-slate-700">
        {payoffLabels?.label && <div className="absolute top-2 right-2 text-xs text-slate-500">Pagos en: {payoffLabels.label}</div>}
        <div className="grid grid-cols-[1fr,2fr] gap-2">
          {/* Empty corner */}
          <div />

          {/* Player 2 */}
          <div className="col-span-1">
            <div className="text-center font-bold text-cyan-400">{player2.name}</div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2 text-center bg-slate-800 rounded">{player2.strategies[0]}</div>
              <div className="p-2 text-center bg-slate-800 rounded">{player2.strategies[1]}</div>
            </div>
          </div>

          {/* Player 1 */}
          <div className="row-span-1 flex flex-col items-center justify-around">
            <div className="font-bold text-cyan-400 [writing-mode:vertical-rl] rotate-180">{player1.name}</div>
          </div>

          {/* Strategies and Payoffs */}
          <div className="grid grid-rows-2 gap-2">
            <div className="grid grid-cols-[1fr,2fr] gap-2">
              <div className="p-2 flex items-center justify-center text-center bg-slate-800 rounded">{player1.strategies[0]}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className={getCellClasses(0, 0)}>
                  (<span className={getPayoffSpanClasses(0)}><span className={getPayoffColor(payoffs[0][0][0])}>{payoffs[0][0][0]}</span></span>, <span className={getPayoffSpanClasses(1)}><span className={getPayoffColor(payoffs[0][0][1])}>{payoffs[0][0][1]}</span></span>)
                </div>
                <div className={getCellClasses(0, 1)}>
                  (<span className={getPayoffSpanClasses(0)}><span className={getPayoffColor(payoffs[0][1][0])}>{payoffs[0][1][0]}</span></span>, <span className={getPayoffSpanClasses(1)}><span className={getPayoffColor(payoffs[0][1][1])}>{payoffs[0][1][1]}</span></span>)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr,2fr] gap-2">
              <div className="p-2 flex items-center justify-center text-center bg-slate-800 rounded">{player1.strategies[1]}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className={getCellClasses(1, 0)}>
                  (<span className={getPayoffSpanClasses(0)}><span className={getPayoffColor(payoffs[1][0][0])}>{payoffs[1][0][0]}</span></span>, <span className={getPayoffSpanClasses(1)}><span className={getPayoffColor(payoffs[1][0][1])}>{payoffs[1][0][1]}</span></span>)
                </div>
                <div className={getCellClasses(1, 1)}>
                  (<span className={getPayoffSpanClasses(0)}><span className={getPayoffColor(payoffs[1][1][0])}>{payoffs[1][1][0]}</span></span>, <span className={getPayoffSpanClasses(1)}><span className={getPayoffColor(payoffs[1][1][1])}>{payoffs[1][1][1]}</span></span>)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {interactive && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-center space-y-3">
          <p className="text-slate-300 font-medium text-sm h-5 transition-all">{analysisText()}</p>
          {!analysisFor ? (
            <div className="flex justify-center gap-4">
              <button onClick={() => startAnalysis('p1')} className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-white transition-colors">Analizar para {player1.name}</button>
              <button onClick={() => startAnalysis('p2')} className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-white transition-colors">Analizar para {player2.name}</button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <div className="flex gap-2">
                {analysisFor === 'p1' && player2.strategies.map((strat, index) => (
                  <button key={index} onClick={() => setAssumedOpponentStrategy(index as 0 | 1)} className={`px-3 py-1 border rounded transition-colors text-sm ${assumedOpponentStrategy === index ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-slate-600 hover:bg-slate-700'}`}>{strat}</button>
                ))}
                {analysisFor === 'p2' && player1.strategies.map((strat, index) => (
                  <button key={index} onClick={() => setAssumedOpponentStrategy(index as 0 | 1)} className={`px-3 py-1 border rounded transition-colors text-sm ${assumedOpponentStrategy === index ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-slate-600 hover:bg-slate-700'}`}>{strat}</button>
                ))}
              </div>
              <button onClick={handleReset} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-white transition-colors text-xs">Reiniciar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
