import type { Difficulty, GameAction, GameState, GameStatus, Level } from "@/types/game.ts"
import { generateTerminal } from "./terminalGenerator";
import { addLogs, calculateLikeness } from "./logUtils";

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
        xp: state.xp,
        clickableRegions: terminalData.clickableRegions
    }
}

export function selectText(state: GameState, selected_word: string): GameState {

    let logHistory: string[] = [...state.logHistory];
    if (selected_word !== state.password) {
        const attemptsLeft: number = state.attempts - 1;
        const availableWords: string[] = [...state.availableWords].filter(word => word !== selected_word);
        const gameStatus: GameStatus = attemptsLeft <= 0 ? "GAME LOST" : state.gameStatus;
        let textUpdate: string = state.terminalText;
        
        if (gameStatus === "GAME LOST"){
            logHistory = addLogs(["TERMINAL LOCKED"], logHistory);
        } else {
            logHistory = addLogs(
                [`> ${selected_word}`, "Entry Denied.", calculateLikeness(selected_word, state.password)], 
                logHistory
            );
            textUpdate = textUpdate.replace(selected_word, '.'.repeat(selected_word.length));
            console.log(`selected: ${selected_word}, ${textUpdate}`)
        }

        return {
            ...state,
            availableWords: availableWords,
            gameStatus: gameStatus,
            attempts: attemptsLeft,
            logHistory: logHistory,
            terminalText: textUpdate
        }
    }
    
    const levelUp = (state.currentLevel + 1) as Level;
    const gameStatus = levelUp >= 14 ? "GAME WON" : "LEVEL WON";
    const xpUp = state.xp + 10;
    logHistory = addLogs(["Access granted."], []);

    return {
        ...state,
        gameStatus: gameStatus,
        currentLevel: levelUp,
        xp: xpUp,
        logHistory: logHistory
    }
}

export function selectBrackets(state: GameState, position: [number, number]): GameState {
    const attemptReset: boolean = !state.hasUsedAttemptReset && Math.random() > 0.6;

    if (attemptReset === true){
        const newLogs: string[] = addLogs(["ATTEMPTS RESET"], [...state.logHistory]);
        let newTerminalText: string = state.terminalText.substring(0, position[0]) + 
            '.'.repeat(position[1] - position[0]) + 
            state.terminalText.substring(position[1]);
        return {
            ...state,
            attempts: 4,
            logHistory: newLogs,
            hasUsedAttemptReset: true,
            terminalText: newTerminalText
        }
    } else {
        const randomWord: string = state.availableWords[Math.floor(Math.random() * state.availableWords.length)];
        let newTerminalText: string = state.terminalText.substring(0, position[0]) + 
            '.'.repeat(position[1] - position[0]) + 
            state.terminalText.substring(position[1]);
        newTerminalText = newTerminalText.replace(randomWord, '.'.repeat(randomWord.length));
        const newAvailableWords = [...state.availableWords].filter(word => word !== randomWord);
        const newLogs: string[] = addLogs(["DUD REMOVED"], [...state.logHistory]);
        return {
            ...state,
            availableWords: newAvailableWords,
            terminalText: newTerminalText,
            logHistory: newLogs
        }
    }
}


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