import type { Difficulty, GameState } from "@/types/game";
import { gameReducer } from "@/utils/gameReducer";
import { useReducer } from "react";

const initialState: GameState = {
  attempts: 4,
  availableWords: [],
  clickableRegions: [],
  currentLevel: 0,
  difficulty: 1,
  gameStatus: "GAME START",
  hasUsedAttemptReset: false,
  loading: false,
  password: "",
  logHistory: [],
  highlightedText: "",
  selectedText: "",
  terminalLines: [],
  terminalText: "",
  xp: 0
}

export function useGameLogic(){
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const actions = {
        gameStart: (difficulty: Difficulty) => 
            dispatch({type: "GAME START", difficulty}),
        gameLost: () => 
            dispatch({type: "GAME LOST"}),
        levelWon: () => 
            dispatch({type: "LEVEL WON"}),
        highlightText: (text: string) => 
            dispatch({type: "HIGHLIGHT TEXT", text}),
        selectBrackets: (position: [number, number]) => 
            dispatch({type: "SELECT BRACKETS", position}),
        selectDifficulty: (difficulty: Difficulty) => 
            dispatch({type: "SELECT DIFFICULTY", difficulty}),
        selectText: (text: string) => 
            dispatch({type: "SELECT TEXT", text})
    }

    return {
        state,
        ...actions
    }
}