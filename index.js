#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import cowsay from 'cowsay';

let score = 0;
let name;
const wait = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(chalk.blue(`
  Hey there, I'm Pluto! welcome to my quiz.
`));

await wait();
await userName();
console.clear()


console.log(chalk.red(`
  RULES

  1. All of the questions are multiple choice
  2. You will get your score at the end of the quiz
  3. Have fun!
`));

await wait();
console.log(chalk.blue("Make sure you're ready, because the quiz is about to begin!"));
await wait();

async function userName() {
  const nameAns = await inquirer.prompt({
    name: "u_name",
    type: "input",
    message: "First off, we need to know your name!",
    deafult() {
      return 'User';
    },
  });
  name = nameAns.u_name;
  console.log(chalk.blue(`Hey ${name}. Let's get started!`));
}

let spinnerWords = [
  "Trying to remember the answer...",
  "Checking messages...",
  "Thinking about cats...",
  "Refreshing Twitter...",
  "Wondering what's for dinner...",
]

let wordOut = spinnerWords[Math.floor(Math.random() * spinnerWords.length)];

let planets = [
  'Mars',
  'Earth',
  'Venus',
  'Mercury',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto'
]

async function handleAnswer(correct) {
  const spinner = createSpinner(wordOut).start();
  await wait();

  if (correct) {
    score++;
    spinner.success({ text: `GADZOOKS! That's right! I guess you humans are smarter than you seem...` });
  } else {
    spinner.error({ text: `Oh no, that's wrong! Better luck next time.` });
  }
}

async function q0() {
  const answers = await inquirer.prompt({
    name: 'q0',
    type: 'list',
    message: '1. What is the name of the planet closest to the sun?',
    choices: planets
  });
  return handleAnswer(answers.q0 === 'Mercury');
};

async function q1() {
  const answers = await inquirer.prompt({
    name: 'q1',
    type: 'list',
    message: '2. What is the smallest planet in our Solar System?',
    choices: planets
  });
  return handleAnswer(answers.q1 === 'Pluto');
};

async function q2() {
  const answers = await inquirer.prompt({
    name: 'q2',
    type: 'list',
    message: '3. What country is NASA based in?',
    choices: [
      'Canada',
      'America',
      'China',
      'India',
      'England',
    ],
  });
  return handleAnswer(answers.q2 === 'America');
};

async function q3() {
  const answers = await inquirer.prompt({
    name: 'q3',
    type: 'list',
    message: '4. What is the hottest planet in our Solar System?',
    choices: planets
  });
  return handleAnswer(answers.q3 === 'Venus');
};

async function q4() {
  const answers = await inquirer.prompt({
    name: 'q4',
    type: 'list',
    message: '5. What is the coldest planet in our Solar System?',
    choices: planets
  });
  return handleAnswer(answers.q4 === 'Uranus');
};

async function end() {
  console.log(chalk.blue(cowsay.say({
    text : `CONGRATULATIONS, ${name}! your score was ${score}.`,
    e: '^^',
    T: 'U'
  })));
};

await q0();
await q1();
await q2();
await q3();
await q4();
await end();