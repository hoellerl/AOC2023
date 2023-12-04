import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let points = 0;

interface Card {
    winningNums: string[];
    myNums: string[];
    copies: number[];
}

const cards: Card[] = [];

for (const line of lines) {
    const input = line.split(": ")[1].split(" | ");
    let winningNums = input[0].split(" ");
    let myNums = input[1].split(" ");
    winningNums = winningNums.filter(Boolean);
    myNums = myNums.filter(Boolean);

    let currentPoints = 0;
    for (const myNum of myNums) {
       if (winningNums.includes(myNum)){
           currentPoints ++;
       }
    }
    const copies :number[]= [];
    for (let i = 1; i < currentPoints +1; i++){
        copies.push(cards.length + i);
    }
    cards.push({ winningNums, myNums, copies: copies });
}

function addCard(idx:number):void{
    points ++;
    const card = cards[idx];
    for (let i = 0; i < card.copies.length; i++) {
        addCard(card.copies[i]);
    }
}

for (let i = 0; i < cards.length; i++) {
    addCard(i);
}

console.log("Answer: " + points);