// utils/terminalGenerator.ts
import { faker } from '@faker-js/faker';
import type { Difficulty } from 'types/game';

export function generateTerminal(difficulty: Difficulty) {
  // Step 1: Generate base jumble text (fixed total length)
  const totalChars = 1000; // 20 characters, 50 lines
  const jumbleText = generateJumbleText(totalChars);
  
  // Step 2: Get word list
  const wordLength = getWordDifficulty(difficulty);
  const words = generateWords(wordLength);

  // Step 3: Get brackets
  const brackets = getBrackets(difficulty);
  
  // Step 4: Insert words and brackets INTO the jumble (character-for-character replacement)
  const insertResult = insertIntoJumble(jumbleText, words, brackets);
    return {
        availableWords: words,
        clickableRegions: insertResult.clickableRegions,
        terminalText: insertResult.text,
        password: words[Math.floor(Math.random() * words.length)]
  };
}

function generateJumbleText(totalChars: number): string {
    let genText = "";
    let randChars = "!@#$%^&*";
    while (genText.length < totalChars) {
        genText+=randChars[Math.floor(Math.random() * randChars.length)]
    }
    return genText
}

function generateWords(targetLength: number): string[] {
    const words: string[] = [];
  
    while (words.length < 16) {
      // Get individual words, not a sentence
      const word = faker.word.noun({length: targetLength, strategy: 'fail'}); 
      if (words.lastIndexOf(word) == -1){
          words.push(word.toUpperCase());
      }
    }

    return words;
}

function getBrackets(difficulty: Difficulty): string[] {
  let numSets = 0;
  switch (difficulty) {
    case 1: numSets = 8; break;
    case 2: numSets = 6; break;
    case 3: numSets = 4; break;
    case 4: numSets = 2; break;
    case 5: numSets = 1; break;
  }
  
  const bracketTypes = ['()', '[]', '{}', '<>'];
  const brackets: string[] = [];
  
  for (let i = 0; i < numSets; i++) {
    const randomIndex = Math.floor(Math.random() * bracketTypes.length);
    brackets.push(bracketTypes[randomIndex]);
  }
  
  return brackets;
}

function getWordDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
        case 1: return 5;
        case 2: return 6;
        case 3: return 7;
        case 4: return 8;
        case 5: return 10;
    }
}

function insertIntoJumble(jumble: string, words: string[], brackets: string[]): {
    "text": string,
    "clickableRegions": Array<{"text": string, "start": number, "end": number, "type":string}>
} {
    const splitText = jumble.split('');
    const allItems = shuffle([...words, ...brackets]);
    const segSize = Math.floor(1000 / allItems.length);
    let currentSegStart: number = 0;
    let clickableRegions: Array<{text: string, start: number, end: number, type: string}> = [];

    for (let item of allItems) {
        const segEnd = currentSegStart + segSize;
        const maxStart = segEnd - item.length;
        const randomPos = currentSegStart + Math.floor(Math.random() * (maxStart - currentSegStart));
        insertIntoPosition(splitText, item, randomPos);

        clickableRegions.push({
            "text": item,
            "start": randomPos,
            "end": randomPos + item.length,
            type: words.includes(item) ? 'word' : 'bracket'
        });

        currentSegStart = segEnd;
    }

    return {"text": splitText.join(''), clickableRegions};
}

function insertIntoPosition(textArray: string[], item: string, positon: number) {
    for (let i = 0; i < item.length; i++) {
        textArray[positon + i] = item[i]
    }
}

function shuffle(array: string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
