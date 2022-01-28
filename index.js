#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let name;
const wait = (ms= 1500) => new Promise((resolve) => setTimeout(resolve, ms));
async function welcome() {
    const title = chalk.magenta (
        `Hi! I'm Pluto, welcome to my quiz!`);

        console.log(title);
        await wait();

        console.log(chalk.blue(`
        Here are some guidlines!
        1. Make sure to answer all of your questions with a capital letter (e.g Pluto)
        2. If you get a question wrong, the whole quiz terminates!
        3. Have fun!`));

        await wait();
        console.log (chalk.green( "Make sure you're ready, becuase the quiz is about to begin!"));
}

await welcome();

async function userName() {
    const nameAns = await inquirer.prompt({
    name: "u_name",
    type: "input",
    message: "What's your name?",
    deafult() {
        return 'User';
    },
});
    name = nameAns.u_name;
}

const spinnerWords = [ 
    'Dusting off old books...',
    'Finding answers...',
    'Thinking about cats...',
    'Refreshing Twitter...',
]
var wordOut = spinnerWords[Math.floor(Math.random() * spinnerWords.length)];

async function handleAnswer(correct) {
    const spinner = createSpinner(wordOut).start();
    await wait();
  
    if (correct) {
      spinner.success({ text: `GADZOOKS ${userName}! THAT'S RIGHT! I guess you humans are smater than you seem...` });
    } else {
      spinner.error({ text: `Oh no, ${userName} you got that wrong! Better luck next time...` });
      process.exit(1);
    }
  }

  async function q0() {
    const answers = await inquirer.prompt({
      name: 'q_0',
      type: 'list',
      message: 'What is the name of the planet closest to the sun?',
      choices: [
        'Mercury',
        'Earth',
        'Venus',
        'Mars',
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune',
        'Pluto'
      ],
    });

    return handleAnswer(answers.q_0 === 'Mercury');
};

async function q1() {
    const answers = await inquirer.prompt({
      name: 'q_1',
      type: 'list',
      message: 'What is the smallest planet in our Solar System?',
      choices: [
        'pluto',
        'Pluto'
      ],
    });

    return handleAnswer(answers.q_0 === 'Pluto');
};

  function winner() {
    figlet(`EPIC, ${userName} !\n YOU GOT EVERYTHING RIGHT!`, (data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
      process.exit(0);
    });
  }

  await q0();
