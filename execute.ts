import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

const asyncExec = promisify(exec);

const executeStar = async (day: number, star: number) => {
  if (day < 1 || day > 25 || star < 1 || star > 2) {
    console.log(`Usage: ts-node execute.ts [day] [star]`);
    console.log(`or:    npm start [day] [star]\n`);
    console.log(`[day]  should be between 1 and 25`);
    console.log(`[star] should be either 1 or 2`);
    return;
  }

  const paddedDay = day.toString().padStart(2, '0');
  const directory = `./Day${paddedDay}/`;

  try {
    const files = await fs.promises.readdir(directory);
    const matchingFile = files.find(file => file.includes(`star${star}.ts`));

    if (matchingFile) {
      const filePath = `${directory}${matchingFile}`;
      const command = `ts-node ${filePath}`;

      try {
        const { stdout, stderr } = await asyncExec(command);
        console.log('Execution result:');
        console.log(stdout);
        console.error(stderr);
      } catch (error) {
        console.error('Error executing file:', error);
      }
    } else {
      console.error('File not found');
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log(`Usage: ts-node execute.ts [day] [star]`);
  console.log(`or:    npm start [day] [star]`);
} else {
  const day = parseInt(args[0]);
  const star = parseInt(args[1]);
  executeStar(day, star);
}
