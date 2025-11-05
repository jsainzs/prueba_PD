
import React, { useState, useMemo } from 'react';
import { Slide } from './components/Slide';
import { PayoffMatrix } from './components/PayoffMatrix';
import { GeminiTutor } from './components/GeminiTutor';
import { ChevronLeftIcon } from './components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from './components/icons/ChevronRightIcon';
import { ShieldIcon } from './components/icons/ShieldIcon';
import { MedalIcon } from './components/icons/MedalIcon';
import { EyeIcon } from './components/icons/EyeIcon';
import { HandshakeIcon } from './components/icons/HandshakeIcon';
import { BrainIcon } from './components/icons/BrainIcon';
import { BuildingIcon } from './components/icons/BuildingIcon';
import type { SlideContent, Payoff } from './types';

const QuizSlideContent = () => {
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const correctAnswer: [number, number] = [1, 1];

  const payoffs: [[Payoff, Payoff], [Payoff, Payoff]] = [
      [[3, 3], [0, 4]],
      [[4, 0], [1, 1]],
  ];
  
  const isCorrect = selected && selected[0] === correctAnswer[0] && selected[1] === correctAnswer[1];

  const handleSelect = (row: number, col: number) => {
    setSelected([row, col]);
    setShowFeedback(true);
  };

  const getFeedback = () => {
      if (!selected) return null;
      if (isCorrect) {
          return {
              title: "¡Exacto!",
              text: "Este es el Equilibrio de Nash. Individualmente, la mejor estrategia es 'No Hacer Nada' por miedo a que el otro se aproveche. Cuando ambos piensan así, terminan en un resultado subóptimo."
          };
      } else {
           return {
              title: "Casi, pero no.",
              text: "Analiza desde la perspectiva de un estudiante. Sin importar lo que haga su compañero, ¿qué opción le da siempre un pago mayor? Esa es su estrategia dominante."
          };
      }
  }
  
  const feedback = getFeedback();

  return (
    <div className="flex flex-col items-center">
      <div className="text-left max-w-3xl mx-auto mb-6 bg-slate-900/50 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-cyan-400">Escenario: Proyecto en Equipo Calificado</h4>
          <p className="text-sm mt-2">Dos estudiantes deben entregar un proyecto. La nota es la misma para ambos, pero el esfuerzo es individual. El "pago" es la utilidad (nota obtenida - costo del esfuerzo).</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-slate-300">
              <li>Si ambos <strong>Hacen el Trabajo</strong>, sacan un 10. Gran resultado. Pago: <strong>(3, 3)</strong>.</li>
              <li>Si <strong>nadie Hace el Trabajo</strong>, sacan un 2. Mal resultado. Pago: <strong>(1, 1)</strong>.</li>
              <li>Si <strong>tú Haces el Trabajo y el otro no</strong>, tú haces todo solo, sacan un 8. Tu esfuerzo es máximo y tu pago es el peor <strong>(0)</strong>. Tu compañero se lleva un 8 gratis: su mejor pago <strong>(4)</strong>.</li>
          </ul>
      </div>
      <p className="mb-4 text-center font-semibold">Haz clic en la celda que representa el <strong>Equilibrio de Nash</strong>.</p>
      <div className="w-full max-w-lg mx-auto">
          <PayoffMatrix
            player1={{ name: 'Estudiante A', strategies: ['Hacer el Trabajo', 'No Hacer Nada'] }}
            player2={{ name: 'Estudiante B', strategies: ['Hacer el Trabajo', 'No Hacer Nada'] }}
            payoffs={payoffs}
            payoffLabels={{ higherIsBetter: true, label: 'Utilidad (Nota - Esfuerzo)' }}
          />
           <div className="grid grid-cols-2 gap-2 mt-[-148px] ml-[154px] w-[calc(100%-154px)] h-[132px] relative z-10">
            {[...Array(4)].map((_, i) => {
                const row = Math.floor(i / 2);
                const col = i % 2;
                const isSelected = selected && selected[0] === row && selected[1] === col;
                const isTheCorrectAnswer = showFeedback && row === correctAnswer[0] && col === correctAnswer[1];
                
                let cellClass = 'hover:bg-slate-500/20';
                if (isSelected && !isCorrect) cellClass = 'bg-red-500/30 ring-2 ring-red-500';
                if (isTheCorrectAnswer) cellClass = 'bg-green-500/30 ring-2 ring-green-500';

                return (
                    <button
                        key={i}
                        onClick={() => handleSelect(row, col)}
                        aria-label={`Seleccionar resultado para fila ${row + 1} columna ${col + 1}`}
                        className={`rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 ${cellClass}`}
                    />
                )
            })}
          </div>
      </div>
       {showFeedback && feedback && (
         <div className={`mt-6 p-4 rounded-lg max-w-lg w-full text-center transition-all duration-300 ${isCorrect ? 'bg-green-500/20 border border-green-500 text-green-300' : 'bg-red-500/20 border border-red-500 text-red-300'}`}>
           <h5 className="font-bold">{feedback.title}</h5>
           <p className="text-sm mt-1">{feedback.text}</p>
         </div>
       )}
    </div>
  );
};


const slideDeck: SlideContent[] = [
  {
    title: 'Teoría de Juegos en Instituciones Políticas',
    content: (
      <div className="text-center">
        <h2 className="text-5xl font-bold text-cyan-400">El Dilema del Prisionero</h2>
        <p className="mt-4 text-xl text-slate-300">Una presentación interactiva para entender cómo la racionalidad individual puede llevar a resultados colectivamente subóptimos.</p>
        <p className="mt-8 text-lg animate-pulse">Usa las flechas para navegar</p>
      </div>
    ),
  },
  {
    title: 'La Historia Clásica',
    content: (
      <div>
        <p className="mb-4">Dos sospechosos de un crimen son arrestados y puestos en celdas separadas. No pueden comunicarse. El fiscal les ofrece un trato a cada uno, sin que el otro lo sepa.</p>
        <ul className="list-disc list-inside space-y-3 text-slate-300">
          <li>Si uno confiesa (<strong>Defecta</strong>) e implica al otro, y el otro no confiesa (<strong>Coopera</strong> con su cómplice), el que confiesa sale libre y el otro recibe 10 años de cárcel.</li>
          <li>Si ambos no confiesan (<strong>Cooperan</strong> entre sí), ambos reciben una pena menor de 1 año por un cargo menor.</li>
          <li>Si ambos confiesan (<strong>Defectan</strong>), ambos reciben una pena de 8 años de cárcel.</li>
        </ul>
        <p className="mt-6 font-semibold text-cyan-400">La pregunta es: ¿Qué deberían hacer?</p>
      </div>
    ),
  },
  {
    title: 'La Matriz de Pagos',
    content: (
      <div className="flex flex-col items-center">
        <p className="mb-6 text-center">Visualizamos las opciones y resultados en una "matriz de pagos". Los pagos se muestran como (Prisionero A, Prisionero B) en años de cárcel (un número más bajo es mejor).</p>
        <PayoffMatrix
          player1={{ name: 'Prisionero A', strategies: ['No Confesar (Cooperar)', 'Confesar (Defectar)'] }}
          player2={{ name: 'Prisionero B', strategies: ['No Confesar (Cooperar)', 'Confesar (Defectar)'] }}
          payoffs={[
            [[-1, -1], [-10, 0]],
            [[0, -10], [-8, -8]],
          ]}
        />
        <GeminiTutor slideContext="La matriz de pagos del Dilema del Prisionero clásico. Los pagos son años de cárcel, por lo que números más bajos son preferibles." />
      </div>
    ),
  },
  {
    title: 'Análisis: Encontrando la Estrategia Dominante',
    content: (
      <div className="flex flex-col items-center">
        <p className="mb-4 text-center">Para tomar una decisión racional, cada jugador debe pensar: "sin importar lo que haga el otro, ¿cuál es mi mejor jugada?".</p>
        <p className="mb-6 text-center text-slate-300">Usa la herramienta interactiva para "tapar" la información irrelevante y analizar las opciones, tal como lo haríamos en un pizarrón.</p>
        <PayoffMatrix
          player1={{ name: 'Prisionero A', strategies: ['No Confesar (Cooperar)', 'Confesar (Defectar)'] }}
          player2={{ name: 'Prisionero B', strategies: ['No Confesar (Cooperar)', 'Confesar (Defectar)'] }}
          payoffs={[
            [[-1, -1], [-10, 0]],
            [[0, -10], [-8, -8]],
          ]}
          interactive={true}
        />
        <div className="mt-6 p-4 bg-slate-800/80 rounded-lg border border-cyan-500/50 max-w-lg w-full">
            <h4 className="font-bold text-cyan-400">Observación Clave</h4>
            <p className="text-slate-300 mt-2">Te darás cuenta de que, sin importar la elección del otro prisionero, la mejor opción individual es siempre <strong>Confesar (Defectar)</strong>. Esta es una <strong>estrategia dominante</strong>.</p>
            <p className="mt-2">Cuando ambos jugadores tienen una estrategia dominante, el resultado es un <strong>Equilibrio de Nash</strong>. En este caso: (Confesar, Confesar).</p>
        </div>
        <GeminiTutor slideContext="Análisis interactivo de la estrategia dominante y el Equilibrio de Nash en el Dilema del Prisionero." />
      </div>
    ),
  },
  {
    title: 'Ejemplo 1: Carrera Armamentista (Guerra Fría)',
    content: (
       <div className="flex flex-col items-center">
        <p className="mb-6 text-center">Dos países rivales deben decidir si aumentan su arsenal militar o no. La seguridad es el "pago".</p>
        <PayoffMatrix
          player1={{ name: 'País A', strategies: ['Desarmarse', 'Armarse'] }}
          player2={{ name: 'País B', strategies: ['Desarmarse', 'Armarse'] }}
          payoffs={[
            [[3, 3], [1, 4]],
            [[4, 1], [2, 2]],
          ]}
          payoffLabels={{ higherIsBetter: true, label: 'Nivel de Seguridad' }}
        />
         <p className="mt-4 text-sm text-slate-400 text-center">Aquí un pago mayor significa mayor seguridad. El resultado (2,2) es un equilibrio estable pero subóptimo comparado con la confianza mutua de (3,3).</p>
      </div>
    ),
  },
  {
    title: 'Ejemplo 2: Guerra Comercial',
    content: (
      <div className="flex flex-col items-center">
        <p className="mb-6 text-center">Dos países deciden entre mantener el libre comercio o imponer aranceles para proteger su industria. El "pago" es la prosperidad económica.</p>
        <PayoffMatrix
          player1={{ name: 'País A', strategies: ['Libre Comercio', 'Poner Aranceles'] }}
          player2={{ name: 'País B', strategies: ['Libre Comercio', 'Poner Aranceles'] }}
          payoffs={[
            [[3, 3], [1, 4]],
            [[4, 1], [2, 2]],
          ]}
          payoffLabels={{ higherIsBetter: true, label: 'Prosperidad Económica' }}
        />
        <p className="mt-4 text-sm text-slate-400 text-center">Poner aranceles es la estrategia dominante, llevando a una guerra comercial donde ambos están peor que con libre comercio.</p>
      </div>
    ),
  },
  {
    title: 'Ejemplo 3: Guerra de Marketing',
    content: (
      <div className="flex flex-col items-center">
        <p className="mb-6 text-center">Dos empresas en un duopolio deciden si lanzar una costosa campaña de publicidad. El "pago" son las ganancias.</p>
        <PayoffMatrix
          player1={{ name: 'Empresa A', strategies: ['No Hacer Publicidad', 'Hacer Publicidad'] }}
          player2={{ name: 'Empresa B', strategies: ['No Hacer Publicidad', 'Hacer Publicidad'] }}
          payoffs={[
            [[50, 50], [20, 70]],
            [[70, 20], [30, 30]],
          ]}
          payoffLabels={{ higherIsBetter: true, label: 'Ganancias (en millones)' }}
        />
        <p className="mt-4 text-sm text-slate-400 text-center">Ambas empresas terminan gastando en publicidad para no perder cuota de mercado, pero sus ganancias son menores.</p>
      </div>
    ),
  },
  {
    title: '¿Cómo Escapar del Dilema?',
    content: (
      <div>
        <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">El Rol de las Instituciones</h3>
        <p className="mb-8 text-center text-slate-300 max-w-3xl mx-auto">El dilema surge por la falta de confianza. Las instituciones actúan como un "tercero" que cambia la estructura de incentivos para fomentar la cooperación a través de tres mecanismos clave:</p>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-center text-cyan-400 mb-4"><ShieldIcon /></div>
            <h4 className="text-xl font-bold">1. Crear Castigos</h4>
            <p className="mt-2 text-slate-400 text-sm">Imponer multas, sanciones o penas por defectar. Esto hace que la traición sea más "costosa" que la cooperación.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-center text-cyan-400 mb-4"><MedalIcon /></div>
            <h4 className="text-xl font-bold">2. Ofrecer Recompensas</h4>
            <p className="mt-2 text-slate-400 text-sm">Otorgar subsidios o beneficios por cooperar, haciendo la colaboración la opción más atractiva.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-center text-cyan-400 mb-4"><EyeIcon /></div>
            <h4 className="text-xl font-bold">3. Aumentar Transparencia</h4>
            <p className="mt-2 text-slate-400 text-sm">Asegurar que las acciones de todos sean visibles, reduciendo la incertidumbre y permitiendo verificar acuerdos.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'La Matriz Modificada',
    content: (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-center mb-2">Original (Sin Tercero)</h4>
          <PayoffMatrix
            player1={{ name: 'Prisionero A', strategies: ['Cooperar', 'Defectar'] }}
            player2={{ name: 'Prisionero B', strategies: ['Cooperar', 'Defectar'] }}
            payoffs={[
              [[-1, -1], [-10, 0]],
              [[0, -10], [-8, -8]],
            ]}
          />
          <p className="text-center mt-2 text-sm">Equilibrio: (-8, -8)</p>
        </div>
        <div className="text-4xl font-bold text-cyan-400 transform transition-transform duration-500 hover:scale-125">→</div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-center mb-2">Modificada (Con Tercero)</h4>
          <p className="text-xs text-center mb-2 text-slate-400">El tercero impone una sanción de -3 por confesar (defectar).</p>
          <PayoffMatrix
            player1={{ name: 'Prisionero A', strategies: ['Cooperar', 'Defectar'] }}
            player2={{ name: 'Prisionero B', strategies: ['Cooperar', 'Defectar'] }}
            payoffs={[
              [[-1, -1], [-10, -3]], // 0 - 3 = -3
              [[-3, -10], [-11, -11]], // -8 - 3 = -11
            ]}
          />
           <p className="text-center mt-2 text-sm">Nuevo Equilibrio: (-1, -1)</p>
        </div>
        <div className="w-full lg:w-auto pt-4 lg:pt-0">
         <GeminiTutor slideContext="Cómo la intervención de un tercero (institución) modifica la matriz de pagos del Dilema del Prisionero, cambiando los incentivos y el equilibrio resultante de 'Defectar, Defectar' a 'Cooperar, Cooperar'." />
        </div>
      </div>
    ),
  },
  {
    title: 'Conclusiones',
    content: (
       <div className="max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Lecciones Clave del Dilema del Prisionero</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="text-cyan-400 pt-1"><BrainIcon /></div>
            <div>
              <h4 className="text-xl font-bold">Racionalidad Individual ≠ Colectiva</h4>
              <p className="text-slate-300">La búsqueda del interés propio por parte de individuos racionales no siempre conduce al mejor resultado para el grupo. A menudo, lleva a equilibrios subóptimos.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-cyan-400 pt-1"><HandshakeIcon /></div>
            <div>
              <h4 className="text-xl font-bold">La Fragilidad de la Cooperación</h4>
              <p className="text-slate-300">La cooperación es difícil de sostener cuando no hay confianza y existen incentivos para traicionar los acuerdos en busca de una ganancia personal a corto plazo.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-cyan-400 pt-1"><BuildingIcon /></div>
            <div>
              <h4 className="text-xl font-bold">El Poder de las Instituciones</h4>
              <p className="text-slate-300">Las instituciones (leyes, gobiernos, normas sociales) son cruciales. Pueden alterar los pagos para alinear el interés individual con el bien común, haciendo cumplir los acuerdos y fomentando la confianza.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
   {
    title: 'Pon a Prueba tu Conocimiento',
    content: <QuizSlideContent />
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slideDeck.length - 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };
  
  const currentSlideContent = useMemo(() => slideDeck[currentSlide], [currentSlide]);

  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400 text-center">
          {currentSlideContent.title}
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-5xl">
            <Slide key={currentSlide}>
                {currentSlideContent.content}
            </Slide>
        </div>
      </main>

      <footer className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
        <button
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-cyan-500 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon />
          Anterior
        </button>
        <div className="text-sm text-slate-400">
          Diapositiva {currentSlide + 1} de {slideDeck.length}
        </div>
        <button
          onClick={goToNext}
          disabled={currentSlide === slideDeck.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-cyan-500 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
          <ChevronRightIcon />
        </button>
      </footer>
    </div>
  );
}
