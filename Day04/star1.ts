import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let points = 0;

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
    for (const myNum of myNums) {
        for (const winningNum of winningNums) {
            if (myNum === winningNum) {
                currentPoints = currentPoints === 0? 1 : currentPoints * 2;
            }

        }

    }
    points += currentPoints;

}


console.log("Answer:   " + points);
console.log("Expected: 13");