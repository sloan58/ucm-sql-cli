const inquirer = require("inquirer")

let choices = require('../configStore').loadUcms()

module.exports = () => {
    const questions = [
        {
            type: "list",
            name: "CLUSTER",
            message: "Which cluster would you like to remove?",
            choices: choices
        }, {
            type: "confirm",
            name: "CONFIRMED",
            message: "Remove UCM now?",
            default: false
        }
    ];
    return inquirer.prompt(questions);
}