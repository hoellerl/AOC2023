import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let totalPower= 0;
for (const line of lines) {
    const games = line.split(":")[0].split(";");
    let red = 0;
    let blue = 0;
    let green = 0;
    for (const game of games) {
        const blocks = game.split(",");

        for (const block of blocks) {
            const blockData = block.trim().split(" ");
            const tempCol = parseInt(blockData[0]);
            if (blockData[1] === "red") {
                 if (red < tempCol){
                     red = tempCol;
                 }
            } else if (blockData[1]  === "blue") {
                if (blue < tempCol){
                    blue = tempCol;
                }
            } else if (blockData[1]  === "green") {
                if (green < tempCol){
                    green = tempCol;
                }
            }
        }
    }
    totalPower += red * blue * green;

}
console.log("Answer: " + totalPower);