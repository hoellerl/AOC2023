import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let sum = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++){
        if (lines[i][j].match(/\*/)){
            const nums:number[] = [];
            for (let k = -1; k < 2; k++){
                for (let l = -1; l < 2; l++){
                    if (i + k >= 0 && i + k < lines.length && j + l >= 0 && j + l < lines[i + k].length){
                        if (lines[i+k][j+l].match(/\d/)){
                            let currNumber = lines[i+k][j+l];
                            // check left and right of number
                            for (let m = 1; j + l + m < lines.length; m++){
                                const currChar = lines[i+k][j+l+m];
                                if (currChar.match(/\d/)){
                                    currNumber += currChar;
                                }
                                if (currChar.match(/\D/)){
                                    break;
                                }
                            }
                            for (let m = 1; j + l - m >= 0; m++){
                                const currChar = lines[i+k][j+l-m];
                                if (currChar.match(/\d/)){
                                    currNumber = currChar + currNumber;
                                }
                                if (currChar.match(/\D/)){
                                    break;
                                }
                            }
                            const currNumberAsInt = parseInt(currNumber);
                            if (!nums.includes(currNumberAsInt)) {
                                nums.push(currNumberAsInt);
                            }

                        }
                    }
                }
            }
            if (nums.length === 2){
                //console.log(` ${nums[0]} * ${nums[1]} = ${nums[0] * nums[1]}`);
                sum += nums[0] * nums[1];
            }
        }
    }
}
console.log("Answer:   " + sum);