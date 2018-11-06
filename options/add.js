const chalk = require("chalk")
const figlet = require("figlet");
const gatherUcm = require('../questions/addUcm')

const ucmConfigStore = require('../ucm/ucmConfigStore')

const init = () => {
    console.log(chalk.green(figlet.textSync("Add UCM", {
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
};

const run = async() => {
    init();

    const answers = await gatherUcm();

    const {NAME, IP, USER, PASS, SCHEMA, CONFIRMED} = answers;

    if (!CONFIRMED) {
        console.log(chalk.green(`\nOkay...maybe next time? ¯\\_(ツ)_/¯`))
        process.exit()
    }

    let newUcm = {
        name: NAME,
        ip: IP,
        user: USER,
        pass: PASS,
        schema: SCHEMA
    }

    ucmConfigStore.add(newUcm)
    console.log(`\n${chalk.green('New UCM Added!')}`);
}

module.exports = () => {
    return run()
}