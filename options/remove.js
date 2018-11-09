const chalk = require("chalk")
const figlet = require("figlet");
const removeUcm = require('../questions/removeUcm')

const configStore = require('../configStore')

const init = () => {
    console.log(chalk.green(figlet.textSync("Remove UCM", {
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
};

const run = async() => {
    init();

    const answers = await removeUcm();

    const {CLUSTER, CONFIRMED} = answers;

    if (!CONFIRMED) {
        console.log(chalk.green(`\nOkay...maybe next time? ¯\\_(ツ)_/¯`))
        process.exit()
    }
    
    configStore.removeUcm(CLUSTER)
    console.log(`\n${chalk.green('UCM Removed!')}`);
}

module.exports = () => {
    return run()
}