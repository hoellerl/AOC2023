import * as fs from 'fs';
import path from 'path';

const data: string = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines: string[] = data.split(/\r?\n/);

console.log("Answer: ");