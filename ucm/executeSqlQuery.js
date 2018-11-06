const fs = require('fs')
const path = require('path')
const chalk = require("chalk")
const dateFormat = require('dateformat')
const soap = require('strong-soap').soap
const stringify = require('csv-stringify')
const _ = require('lodash')

const homedir = require('os').homedir()
const baseFileDir = path.join(homedir, 'UCM-SQL')

module.exports = (cluster, QUERY) => {
    const clientConfig = {
        auth: "Basic " + Buffer
            .from(`${cluster.user}:${cluster.pass}`)
            .toString("base64"),
        args: {
            sql: QUERY
        },
        url: path.join(__dirname, `axl/${cluster.schema}/AXLAPI.wsdl`)
    }

    soap.createClient(clientConfig.url, (err, client) => {
        client.setEndpoint(`https://${cluster.ip}:8443/axl/`);
        client.addHttpHeader("Authorization", clientConfig.auth);
        client.addHttpHeader("Content-Type", "text/xml; charset=utf-8")
        client.addHttpHeader("SOAPAction", `CUCM:DB ver=${cluster.schema} executeSQLQuery`)
        client.setSecurity(new soap.ClientSSLSecurity(undefined, undefined, undefined, {
            rejectUnauthorized: false
        },));

        client.executeSQLQuery(clientConfig.args, (err, result) => {
            if (err) {

                let message
                let statusCode = _.get(err, 'response.statusCode', false)
                let faultString = _.get(err, 'root.Envelope.Body.Fault.faultstring', false)

                if (!statusCode) {
                    message = `Could not connect - Please check the IP address and try again.`
                } else if (statusCode == "401") {
                    message = `Unauthorized - Please check the AXL account information and try again.\n`
                } else if(faultString) {
                    message = faultString
                } else {
                    message = `An unknown error occurred - The remote system said: ${err.response.statusMessage}`
                }
                console.log(chalk.red(`\n(${cluster.name}) ${message}`))
                return
            }

            if (!result.return) {
                console.log('No results')
            } else {
                let rows = result.return.row instanceof Array
                    ? result.return.row
                    : [result.return.row]
                let columns = Object.keys(rows[0])
                rows.unshift(columns)

                if (!fs.existsSync(baseFileDir)) {
                    fs.mkdirSync(baseFileDir);
                }

                let fileName = path.join(baseFileDir, `${cluster.name}_${dateFormat(now, "yyyy-mm-dd-HH-MM")}.csv`)

                stringify(rows, (err, output) => {
                    fs
                        .writeFile(fileName, output, 'utf8', function (err) {
                            if (err) {
                                console.log(chalk.red('Some error occured - file either not saved or corrupted file saved.'));
                            } else {
                                console.log(`\n${chalk.green('Success!')}\nOutput saved to ${chalk.magenta(fileName)}`);
                            }
                        });
                });
            }
        });

        if (err) {
            console.log("soap client error is: " + err);
        }
    });
}