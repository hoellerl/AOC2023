import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let sum = 0;
for (let i = 0; i < lines.length; i++) {
    let usableNum = false;
    let numAsString = "";
    const testSymbol = (sym: string) => {
        return sym.match(/\D/) && sym !== ".";
    };

    for (let j = 0; j < lines[i].length; j++){
        if (lines[i][j].match(/\d/)){
            numAsString += lines[i][j];

            if (j !== 0){
                if (testSymbol( lines[i][j-1] )){
                    usableNum = true;
                }
            }
            if (j < lines.length - 2){
                if (testSymbol( lines[i][j+1])){
                    usableNum = true;
                }
            }

            for (let k = -1; k < 2; k++){
                for (let l = -1; l < 2; l++){
                    if (i + k >= 0 && i + k < lines.length && j + l >= 0 && j + l < lines[i + k].length){
                        if (testSymbol( lines[i+k][j+l])){
                            usableNum = true;
                        }
                    }
                }
            }
            /*if (i !== lines.length - 1 && j !== lines[i].length - 1){
                for (let k = -1; k < 2; k++){
                    if (lines[i+1][j+k].match(/\D/) && lines[i+1][j+k] !== "."){
                        usableNum = true;
                    }
                }
            }*/
        }
        if (lines[i][j].match(/\D/) || j === lines[i].length - 1){
            if (usableNum){
                sum += parseInt(numAsString);
                usableNum = false;
            }
            numAsString = "";
        }
    }
}
console.log("Answer: " + sum);