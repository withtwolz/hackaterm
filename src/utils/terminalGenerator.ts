// utils/terminalGenerator.ts
import { faker } from '@faker-js/faker';
import type { Difficulty } from 'types/game';

export function generateTerminal(difficulty: Difficulty) {
  // Step 1: Generate base jumble text (fixed total length)
  const totalChars = 1000; // 20 characters, 50 lines
  const jumbleText = generateJumbleText(totalChars);
  
  // Step 2: Get word list
  const wordConfig = getTerminalDifficulty(difficulty);
  const words = generateWords(wordConfig.count, wordConfig.length);

  // Step 3: Get brackets
  const brackets = getBrackets(difficulty);
  
  // Step 4: Insert words and brackets INTO the jumble (character-for-character replacement)
  const insertResult = insertIntoJumble(jumbleText, words, brackets);
  return {
        availableWords: words,
        clickableRegions: insertResult.clickableRegions,
        terminalText: insertResult.text, // insert some extra to fill
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

function generateWords(wordCount: number, wordLength: number): string[] {
    const words = new Set<string>();
  
    while (words.size < wordCount) {
      // Get individual words, not a sentence
      const word = faker.word.noun({length: wordLength, strategy: 'fail'}); 
      if (!words.has(word.toUpperCase())){
          words.add(word.toUpperCase());
      }
    }

    return Array.from(words);
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

function getTerminalDifficulty(difficulty: Difficulty): {count: number, length: number} {
    switch (difficulty) {
        case 1: return {count: 10, length: 5};
        case 2: return {count: 12, length: 6};
        case 3: return {count: 14, length: 7};
        case 4: return {count: 16, length: 8};
        case 5: return {count: 18, length: 9};
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
    let fillerText: string = generateJumbleText(1280 - splitText.length);

    return {"text": splitText.join('') + fillerText, clickableRegions};
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
