const commandLineUsage = require('command-line-usage')

const optionDefinitions = require('./optionsList')

module.exports  = function() {
    const usage = commandLineUsage([
        {
            header: 'Cicso UCM SQL Query Tool',
            content: 'A cli tool to send SQL queries to Cisco UCM servers.'
        }, {
            header: 'Options',
            optionList: optionDefinitions
        }, {
            content: 'Project home: {underline https://github.com/me/example}'
        }
    ])
    console.log(usage)
}