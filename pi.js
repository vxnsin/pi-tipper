import readline from 'readline';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

const PI = Math.PI.toString().substring(2); 
let currentIndex = 0; 
let progress = '3.'; 

function showBanner() {
  console.clear();

  console.log(gradient(["blue", "pink"])(figlet.textSync('PI Tipper!', { horizontalLayout: 'default' })));
  console.log(chalk.cyan('Type as many digits of PI as you can correctly.'));
  console.log(chalk.yellow('A wrong input will end the game.'));
  console.log(gradient.pastel('🌟 Made by Vensin 🌟'));
  console.log('');
}

function updateProgress() {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0); 
  process.stdout.write(`❯ ${progress}`);
}

function setupInput() {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true); 

  process.stdin.on('keypress', (str, key) => {
    if (key.sequence === '\u0003') { 
      console.log(chalk.red('\nGame Over.'));
      process.exit();
    }

    if (!/^\d$/.test(str)) return; 

    const currentDigit = PI[currentIndex];

    if (str === currentDigit) {
      currentIndex++; 
      progress += chalk.green(str); 
      updateProgress();

      if (currentIndex === PI.length) {
        console.log(chalk.blue('\n\nUnbelievable! You guessed all known digits of PI.'));
        process.exit();
      }
    } else {
      progress += chalk.red(str); 
      updateProgress();
      console.log(chalk.red(`\n\n✘ Incorrect! The correct digit was: ${chalk.yellow(currentDigit)}`));
      process.exit();
    }
  });
}

process.stdout.write('\x1b]0;PI Tipper by Vensin\x07');

showBanner();
updateProgress();
setupInput();
