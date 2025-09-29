
export function calculateLikeness(selected_word: string, password: string): string {
    let likeness: number = 0;
    for (let idx=0; idx < selected_word.length; idx++){
        if (selected_word[idx] === password[idx]){
            likeness++;
        }
    }
    return `LIKENESS=${likeness.toString()}`;
}

export function addLogs(logs: string[], logHistory: string[], input: boolean = true): string[] {
    return [...logHistory, ...logs];
}