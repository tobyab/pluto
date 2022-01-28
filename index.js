#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let name;

const wait = (ms= 1500) => new Promise((resolve) => setTimeout(resolve, ms));
async function welcome() {
    const title = chalk.magenta(
        "Hi! I'm Pluto, welcome to my quiz!"
        );

        await wait();
        title.stop();

    console.log("Make sure you're ready, becuase the quiz is about to begin!");

}

await welcome();

async function name() {
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

async function handleAnswer(correct) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (correct) {
      spinner.success({ text: `Nice work ${name}. That's a legit answer` });
    } else {
      spinner.error({ text: `Oh no, ${name} you got that wrong! Better luck next time...` });
      process.exit(1);
    }
  }

  function winner() {
    figlet(`EPIC, ${playerName} !\n YOU GOT EVERYTHING RIGHT!`, (data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
      process.exit(0);
    });
  }