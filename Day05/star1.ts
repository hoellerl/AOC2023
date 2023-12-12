import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

const [seeds, ...lines] = data.trim().split(/\r?\n\r?\n/);
let seedNums:number[] = seeds.trim().split("seeds:")[1].trim().split(" ").map(Number);

const maps = lines.map((num) => num.trim().split("\n").map((line) => line.trim().split(" ").map(Number)) as [number, number, number][]);

for (const map of maps){
    seedNums = calcSeedValues(map, seedNums);
}

console.log("Answer: " + Math.min(...seedNums));



function calcSeedValues(map: [number, number, number][], seeds: number[]): number[] {
    const seedValues: number[] = [];
    for (const seed of seeds) {
        let currentSeed = seed;
        for (const range of map) {
            if (currentSeed >= range[1] && currentSeed < range[1] + range[2]) {

                currentSeed = range[0] + currentSeed - range[1]; //range[0] + (currentSeed- range[1]);
                break;
            }
        }
        seedValues.push(currentSeed);
    }
    return seedValues;
}