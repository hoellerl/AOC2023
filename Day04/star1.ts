import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './sample.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let points = 0;

for (const line of lines) {
    const nameAndInput = line.split(": ");
    const input = nameAndInput[1].split(" | ");
    let winningNums = input[0].split(" ");
    let myNums = input[1].split(" ");
    winningNums = winningNums.filter(Boolean);
    myNums = myNums.filter(Boolean);
    let currentPoints = 0;
    for (const myNum of myNums) {
        if (winningNums.includes(myNum)){
            currentPoints = currentPoints === 0? 1 : currentPoints * 2;
        }
    }
    points += currentPoints;

}


console.log("Answer:   " + points);