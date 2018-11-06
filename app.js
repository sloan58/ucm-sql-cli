const chalk = require("chalk")
const figlet = require("figlet");

const add = require('./options/add')
const help = require('./options/help')
const list = require('./options/list')
const remove = require('./options/remove')

const executeSqlQuery = require('./ucm/executeSqlQuery')
const commandLineArgs = require('command-line-args')
const gatherQueryInfo = require('./questions/gatherQueryInfo')

const optionDefinitions = require('./options/optionsList')
const options = commandLineArgs(optionDefinitions)

const ucmConfigStore = require('./ucm/ucmConfigStore')
const ucms = ucmConfigStore.load()

now = new Date()

const init = () => {
    console.log(chalk.green(figlet.textSync("UCM SQL Query Tool", {
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
};

const run = async() => {
    init();

    const answers = await gatherQueryInfo();
    const {CLUSTERS, QUERY, CONFIRMED} = answers;

    if (!CONFIRMED) {
        console.log(chalk.green(`\nOkay...maybe next time? ¯\\_(ツ)_/¯`))
        process.exit()
    }

    let queryThese
    if (CLUSTERS[0] === "All") {
        queryThese = ucms
    } else {
        queryThese = CLUSTERS.map(cluster => {
            let c = ucms.find(a => a.name === cluster)
            return c
                ? c
                : false
        })
    }

    queryThese.forEach(cluster => {
        executeSqlQuery(cluster, QUERY)
    })
}

if (!Object.keys(options).length) {
    run();
} else if (options.help) {
    help()
} else if (options.add) {
    add()
} else if (options.list) {
    list()
} else if (options.remove) {
    remove()
}