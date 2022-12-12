import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';
import { getUsername } from './utils/utils.js';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const username = getUsername();
const currentDir = homedir();

// const commands = {
//   '.exit': () => rl.close(),
//   'add': (line) => console.log('create file', line)
// }

stdout.write(`Welcome to the File Manager, ${username}! \n`);
stdout.write(`You are currently in ${currentDir}! \n`);

rl.on('line', (line) => {
  const command = line.split(' ')[0];

  // const arr = Object.keys(commands);
  // for (let key of arr) {
  //   if (command == key) {
  //     commands[command].call(this, line);
  //   }
  // }

  // const error = arr.filter((item) => item === command);

  // if(error.length === 0) {
  //   console.log('Invalid input');
  // }
  switch (command) {
    case '.exit':
      rl.close();
      break;
    case 'add':
      stdout.write(`create file: ${line} \n`);
      break;
  
    default:
      stdout.write('Invalid input \n');
      break;
  }
});

rl.on('close', () => stdout.write(`Thank you for using File Manager, ${username}, goodbye!`));