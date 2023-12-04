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
    const nameAndInput = line.split(": ");
    const input = nameAndInput[1].split(" | ");
    const winningNums = input[0].split(" ");
    const myNums = input[1].split(" ");
    winningNums.forEach((num, index) => {
        if (num === "") {
            winningNums.splice(index, 1);
        }
    });
    myNums.forEach((num, index) => {
        if (num === "") {
            myNums.splice(index, 1);
        }
    });

    let currentPoints = 0;
    console.log("NEW CARD:");
    console.log("Winning: " + winningNums);
    console.log("Mine:    " + myNums);
    for (const myNum of myNums) {
        for (const winningNum of winningNums) {
            if (myNum === winningNum) {
                currentPoints++;
            }
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

console.log("Answer:   " + points);
console.log("Expected: 30");