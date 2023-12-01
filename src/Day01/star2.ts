import * as fs from 'fs';
import * as path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split('\n');
let total: number = 0;

const nums: string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const numVals: number[] = [1,2,3,4,5,6,7,8,9];

for (const line of lines) {
    let firstNumber: number = 0;
    let firstIdx: number = -1;
    for (let i = 0; i < line.length; i++) {
        const number: number = parseInt(line[i]);
        if (!isNaN(number)) {
            firstNumber = number;
            firstIdx = i;
            break;
        }
    }

    let lastIdx: number = line.length + 10;
    let lastNumber: number = 0;
    for (let i = line.length - 1; i >= 0; i--) {
        const number: number = parseInt(line[i]);
        if (!isNaN(number)) {
            lastNumber = number;
            lastIdx = i;
            break;
        }
    }

    let wordLast: string | undefined;
    let wordFirst: string | undefined;
    for (let i = 0; i < nums.length; i++) {
        const index: number = line.indexOf(nums[i]);
        const lastIndex: number = line.lastIndexOf(nums[i]);
        if (index !== -1) {
            if (index < firstIdx || firstIdx === undefined) {
                firstNumber = numVals[i];
                firstIdx = index;
                wordFirst = nums[i];
            }
            if (lastIndex > lastIdx || lastIdx === undefined) {
                lastNumber = numVals[i];
                lastIdx = lastIndex;
                wordLast = nums[i];
            }
        }
    }

    for (let i = 0; i < nums.length; i++) {
        let indexI: number = line.indexOf(nums[i]);
        let indexJ: number = line.indexOf(wordFirst as string);
        if (wordFirst !== undefined && indexI !== -1 && indexJ !== -1 && indexI < indexJ) {
            firstNumber = numVals[i];
        }
        indexI = line.lastIndexOf(nums[i]);
        indexJ = line.lastIndexOf(wordLast as string);
        if (wordFirst !== undefined && indexI !== -1 && indexJ !== -1 && indexI > indexJ) {
            lastNumber = numVals[i];
        }
    }

    const stringNumber: string = `${firstNumber}${lastNumber}`;
    total += parseInt(stringNumber);
}

console.log("Answer: " + total);