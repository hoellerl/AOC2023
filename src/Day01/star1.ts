import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split('\n');
let total: number = 0;

for (const line of lines) {
    let firstNumber: number = 0;
    for (let i = 0; i < line.length; i++) {
        const number: number = parseInt(line[i], 10);
        if (!isNaN(number)) {
            firstNumber = number;
            break;
        }
    }

    let lastNumber: number = 0;
    for (let i = line.length; i >= 0; i--) {
        const number: number = parseInt(line[i], 10);
        if (!isNaN(number)) {
            lastNumber = number;
            break;
        }
    }

    const stringNumber: string = `${firstNumber}${lastNumber}`;
    total += parseInt(stringNumber);
}

console.log("Answer: " + total);