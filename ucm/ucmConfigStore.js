const Configstore = require('configstore');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);
const _ = require('lodash')

module.exports = {
    load: () => {
        if (!conf.get('ucm')) {
            conf.set('ucm', [])
        }
        return conf.get('ucm')
    },

    add: (ucm) => {
        let ucms = conf.get('ucm')
        ucm = {'id': ucms.length + 1, ...ucm}
        ucms.push(ucm)
        conf.set('ucm', ucms)
    },

    remove: (ucmName) => {
        let ucms = conf.get('ucm')
        _.remove(ucms, ucm => ucm.name === ucmName)
        conf.set('ucm', ucms)
    }
}