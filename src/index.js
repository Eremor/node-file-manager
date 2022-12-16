import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';

import { getUsername, lineParser } from './utils/utils.js';
import { upDir } from './nwd/up.js';
import { changeDir } from './nwd/cd.js';
import { showDir } from './nwd/ls.js';
import { readFile } from './fs/read.js';
import { createFile } from './fs/create.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copy.js';
import { moveFile } from './fs/move.js';
import { deleteFile } from './fs/delete.js';
import { getOSInfo } from './os/os.js';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: '> ',
});

const username = getUsername();
let currentDir = homedir();

stdout.write(`Welcome to the File Manager, ${username}! \n\n`);
stdout.write(`You are currently in ${currentDir}! \n`);

rl.prompt();

rl.on('line', async (line) => {
  const [cmd, args] = lineParser(line);

  const command = line.split(' ')[0];

  try {
    switch (command) {
      case '.exit':
        rl.close();
        break;
      case 'up':
        currentDir = upDir(currentDir, line);
        break;
      case 'cd':
        currentDir = await changeDir(currentDir, line);
        break;
      case 'ls':
        await showDir(currentDir);
        break;
      case 'cat':
        await readFile(currentDir, line);
        break;
      case 'add':
        await createFile(currentDir, line);
        break;
      case 'rn':
        await renameFile(currentDir, line);
        break;
      case 'cp':
        await copyFile(line);
        break;
      case 'mv':
        await moveFile(currentDir, line);
        break;
      case 'rm':
        await deleteFile(currentDir, line);
        break;
      case 'os':
        await getOSInfo(line);
        break;
    
      default:
        stdout.write('Invalid input \n');
    }
  } catch (err) {
    stdout.write('Operation failed\n');
  }

  console.log(`You are currently in ${currentDir}\n`);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});