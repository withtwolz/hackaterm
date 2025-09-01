export interface GameState {
  attempts: number;
  availableWords: string[];
  clickableRegions?: Array<{text: string, start: number, end: number, type: string}>;
  currentLevel: Level;
  difficulty: Difficulty;
  gameStatus: GameStatus;
  hasUsedAttemptReset: boolean;
  loading: boolean;
  password: string;
  logHistory: string[];
  selectedText: string;
  terminalLines: string[];
  terminalText: string;
  xp: number;
}

export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type GameStatus = "GAME LOST" | "GAME START" | "GAME WON" | "LEVEL WON" | "IN_PROGRESS";
export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type GameAction =
    | {type: "GAME LOST"}
    | {type: "GAME START", difficulty: Difficulty}
    | {type: "LEVEL WON"}
    | {type: "HIGHLIGHT TEXT", text: string}
    | {type: "SELECT BRACKETS", position: [number, number]}
    | {type: "SELECT DIFFICULTY", difficulty: Difficulty}
    | {type: "SELECT TEXT", text: string};