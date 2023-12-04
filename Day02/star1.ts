import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);
let gameIds= 0;
for (const line of lines) {
    const nameGame = line.split(":");
    const id = parseInt(nameGame[0].replace("Game ", ""));
    const games = nameGame[1].split(";");
    let allCombosPossible = true;
    for (const game of games) {
        const blocks = game.split(",");
        let red = 0;
        let blue = 0;
        let green = 0;
        for (const block of blocks) {

            const blockData = block.trim().split(" ");
            if (blockData[1] === "red") {
                red += parseInt(blockData[0]);
            } else if (blockData[1]  === "blue") {
                blue += parseInt(blockData[0]);
            } else if (blockData[1]  === "green") {
                green += parseInt(blockData[0]);
            }
        }
        if ( red > 12 || green > 13 || blue > 14) {
            allCombosPossible = false;
            break;
        }
    }
    if (allCombosPossible) {
        gameIds += id;
    }
}
console.log("Answer: " + gameIds);