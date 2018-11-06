const inquirer = require("inquirer")

let choices = require('../ucm/ucmConfigStore').load()

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
            message: "Ready to roll?",
            default: false
        }
    ];
    return inquirer.prompt(questions);
}