const chalk = require("chalk")
const figlet = require("figlet");
const Table = require('cli-table');

const ucmConfigStore = require('../ucm/ucmConfigStore')
const ucms = ucmConfigStore.load()

const init = () => {
    console.log(chalk.green(figlet.textSync("List UCM", {
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
};

const run = async() => {
    init();

    const table = new Table({
        head: [
            'Name', 'IP Address', 'AXL User', 'Schema Version'
        ],
        colWidths: [25, 25, 25, 25]
    });

    ucms.map(ucm => {
        return table.push([ucm.name, ucm.ip, ucm.user, ucm.schema])
    })
    console.log(table.toString());

}

module.exports = () => {
    return run()
}