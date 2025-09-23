import type { Difficulty, GameAction, GameState, GameStatus, Level } from "@/types/game.ts"
import { generateTerminal } from "./terminalGenerator";

//=============================
//======Functionalities========
//=============================


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
        selectedText: "",
        terminalText: terminalData.terminalText,
        xp: state.xp
    }
};

export function selectText(state: GameState, text: string): GameState {
    
    if (text !== state.password) {
        const attemptsLeft: number = state.attempts - 1;
        const gameStatus: GameStatus = attemptsLeft <= 0 ? "GAME LOST" : state.gameStatus;
        
        return {
            ...state,
            gameStatus: gameStatus,
            attempts: attemptsLeft
        };
    }
    
    const levelUp = (state.currentLevel + 1) as Level;
    const gameStatus = levelUp >= 14 ? "GAME WON" : "LEVEL WON";
    const xpUp = state.xp + 10;

    return {
        ...state,
        gameStatus: gameStatus,
        currentLevel: levelUp,
        xp: xpUp
    };
};

export function selectBrackets(state: GameState, position: [number, number]): GameState {
    const newTerminalText = state.terminalText.slice(position[0], position[1])
    return {
        ...state,
        selectedText: newTerminalText
    }
};


//=============================
//=====MAIN GAME REDUCER=======
//=============================

export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "GAME START": return gameStart(state, action.difficulty);
        case "SELECT TEXT": return selectText(state, action.text);
        case "SELECT BRACKETS": return selectBrackets(state, action.position);
        case "SELECT DIFFICULTY": return gameStart(state, action.difficulty);
        default: return state
    }
}