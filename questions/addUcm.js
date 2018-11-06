const inquirer = require("inquirer")
const {lstatSync, readdirSync} = require('fs')
const {join} = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)

const directories = getDirectories(join(__dirname, '../ucm/axl/')).map(directory => {
    return directory.split('/').slice(-1)[0]
})

module.exports = () => {
    const questions = [
        {
            type: "input",
            name: "NAME",
            message: "UCM Friendly Name:"
        }, {
            type: "input",
            name: "IP",
            message: "IP Address:"
        }, {
            type: "input",
            name: "USER",
            message: "AXL Username:"
        }, {
            type: "password",
            name: "PASS",
            message: "AXL Password:"
        }, {
            type: "list",
            name: "SCHEMA",
            message: "Schema version:",
            choices: directories
        }, {
            type: "confirm",
            name: "CONFIRMED",
            message: "Add UCM?",
            default: false
        }
    ];
    return inquirer.prompt(questions);
}