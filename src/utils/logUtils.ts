
export function calculateLikeness(selected_word: string, password: string): string {
    const wordLength = selected_word.length;
    let likeness: number = 0;
    for (let idx=0; idx < wordLength; idx++){
        if (selected_word[idx] === password[idx]){
            likeness++;
        }
    }
    return `${likeness.toString()}/${wordLength} correct.`;
}

export function addLogs(logs: string[], logHistory: string[]): string[] {
    return [...logHistory, ...logs];
}