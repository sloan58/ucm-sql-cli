const inquirer = require("inquirer")
const chalk = require("chalk")

let choices = require('../configStore').loadUcms()

module.exports = () => {

    if (!choices.length) {
        console.log(chalk.green('\nSorry, no UCM servers have been configured yet.\nTry: '), chalk.red('node app.js --add'))
        process.exit()
    }

    if (choices.length >= 2) {
        choices.unshift("All")
    }

    const questions = [
        {
            type: "checkbox",
            name: "CLUSTERS",
            message: "Which cluster(s) should we query?",
            choices: choices
        }, {
            type: "input",
            name: "QUERY",
            message: "Enter your query here:"
        }, {
            type: "confirm",
            name: "CONFIRMED",
            message: "Send query now?",
            default: false
        }
    ];
    return inquirer.prompt(questions);
}