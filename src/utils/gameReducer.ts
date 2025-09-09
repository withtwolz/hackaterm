import type { Difficulty, GameAction, GameState, GameStatus, Level } from "@/types/game.ts"
import { generateTerminal } from "./terminalGenerator";

//=============================
//======Functionalities========
//=============================

export function gameLost(state: GameState): GameState {
    return {
        ...state,
        currentLevel: 1,
        gameStatus: "GAME LOST",
        hasUsedAttemptReset: false,
        loading: false,
        logHistory: [],
        selectedText: "",
        terminalLines: [],
        terminalText: "THIS MACHINE HAS BEEN COMPROMISED/LOCKED. WILL REMAIN SECRETS. FIND ANOTHER MACHINE/RESTART?",
        xp: 0
    }
};

export function gameStart(state: GameState, difficulty: Difficulty): GameState {
    const terminalData = generateTerminal(difficulty)
    return {
        attempts: 4,
        availableWords: terminalData.availableWords,
        currentLevel: 1,
        difficulty: difficulty,
        gameStatus: "IN_PROGRESS",
        hasUsedAttemptReset: false,
        loading: false,
        password: terminalData.password,
        logHistory: [],
        highlightedText: state.highlightedText,
        selectedText: "",
        terminalLines: state.terminalLines,
        terminalText: terminalData.terminalText,
        xp: state.xp
    }
};

export function levelWon(state: GameState): GameState {
    let nextLevel = state.currentLevel + 1;
    let isGameComplete = nextLevel > 14;
    return {
        ...state,
        currentLevel: isGameComplete ? state.currentLevel : (nextLevel as Level),
        gameStatus: isGameComplete ? "GAME WON" : "LEVEL WON",
        xp: state.xp + 30
    }
};

export function highlightText(state: GameState, text: string): GameState {
    // User hovers over a character, word, or bracket set
    if (state.terminalText.indexOf(text) != -1){
        return {
            ...state,
            highlightedText: text
        }        
    }
    return {
        ...state
    }
};

export function selectBrackets(state: GameState, position: [number, number]): GameState {
    return {
        ...state,
        selectedText: state.terminalLines.slice(position[0], position[1]).join('\n')
    }
};

export function selectText(state: GameState, text: string): GameState {
    let gameStatus: GameStatus = state.gameStatus; // Start with current status
  
    if (state.attempts === 0) {
        gameStatus = "GAME LOST";
    } else if (text === state.password) {
        gameStatus = "LEVEL WON";
    }
    
    return {
        ...state,
        gameStatus: gameStatus
    }
};

//=============================
//=====MAIN GAME REDUCER=======
//=============================

export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "GAME LOST":
            return gameLost(state);
        
        case "GAME START":
            return gameStart(state, action.difficulty);

        case "LEVEL WON":
            return levelWon(state);

        case "HIGHLIGHT TEXT":
            return highlightText(state, action.text);

        case "SELECT BRACKETS":
            return selectBrackets(state, action.position);

        case "SELECT TEXT":
            return selectText(state, action.text);
        
        case "SELECT DIFFICULTY":
            return gameStart(state, action.difficulty);

        default:
            return state
    }
}