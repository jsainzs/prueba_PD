import type { ReactNode } from 'react';

export interface Player {
  name: string;
  strategies: [string, string];
}

export interface PayoffLabels {
  higherIsBetter?: boolean;
  label?: string;
}

export interface PayoffMatrixProps {
  player1: Player;
  player2: Player;
  payoffs: [[Payoff, Payoff], [Payoff, Payoff]];
  payoffLabels?: PayoffLabels;
  interactive?: boolean;
}

export type Payoff = [number, number];

export interface SlideContent {
  title: string;
  content: ReactNode;
}
