#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';

var score = 0;
let name;
const wait = (ms= 1500) => new Promise((resolve) => setTimeout(resolve, ms));
async function welcome() {
    const title = chalk.magenta (
        `Hi! I'm Pluto, welcome to my quiz!`);

        console.log(title);
        await wait();

        console.log(chalk.blue(`
        Here are some guidlines:
        1. All of the questions are multiple choice!
        2. You will get your score at the end of the quiz!
        3. Have fun!`));

        await wait();
        console.log (chalk.green( "Make sure you're ready, because the quiz is about to begin!"));
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
    console.log(chalk.yellow(`Hey ${name}. Let's get started!`));
}

// This function chooses a random word from the array of words displayed below and returns it in the console whilst searching for the correct answer.
const spinnerWords = [ 
    'Googling the answer...',
    'Checking messages...',
    'Thinking about cats...',
    'Refreshing Twitter...',
    "Wondering what's for dinner...",
]
var wordOut = spinnerWords[Math.floor(Math.random() * spinnerWords.length)];

async function handleAnswer(correct) {
    const spinner = createSpinner(wordOut).start();
    await wait();
  
    if (correct) {
    score++;
      spinner.success({ text: `GADZOOKS! THAT'S RIGHT! I guess you humans are smarter than you seem...` });
    } else {
      spinner.error({ text: `Oh no, you got that wrong! Better luck next time...` });
    }
  }

  async function q0() {
    const answers = await inquirer.prompt({
      name: 'q_0',
      type: 'list',
      message: 'What is the name of the planet closest to the sun?',
      choices: [
        'Earth',
        'Pluto',
        'Venus',
        'Mars',
        'Jupiter',
        'Mercury',
        'Uranus',
        'Neptune',
        'Saturn'
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
        'Mars',
        'Earth',
        'Venus',
        'Mercury',
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune',
        'Pluto'
      ],
    });
    return handleAnswer(answers.q_1 === 'Pluto');
};

    async function q2() {
        const answers = await inquirer.prompt({
          name: 'q_2',
          type: 'list',
          message: 'What country is NASA from?',
          choices: [
            'Canada',
            'America',
            'China',
            'India',
            'Russia',
          ],
        });

    return handleAnswer(answers.q_2 === 'America');
};

async function q3() {
    const answers = await inquirer.prompt({
      name: 'q_3',
      type: 'list',
      message: 'What is the hottest planet in our Solar System?',
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

return handleAnswer(answers.q_3 === 'Venus');
};

async function q4() {
    const answers = await inquirer.prompt({
      name: 'q_4',
      type: 'list',
      message: 'What is the coldest planet in our Solar System?',
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

return handleAnswer(answers.q_4 === 'Uranus');
};

// This is the congratulatory message at the end of the game

async function winner() {
    figlet ('CONGRATS!', function(err, data) {
        if (err) {
            console.log('UH OH, there was an error. Try again :(');
            console.dir(err);
            return;
        }
        console.log(data);
        console.log (chalk.red(`CONGRATULATIONS, ${name}! You finished the quiz. By the way, your score was ${score}! I'm gonna have to tell the other planets about this...`));
    });
  }

  await userName();
  await q0();
  await q1();
  await q2();
  await q3();
  await q4();
  await winner();

// Built by Toby Brown. (https://www.tobyb.xyz)