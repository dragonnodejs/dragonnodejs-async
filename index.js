'use strict';

let Promise = require('bluebird');

/**
 * Run the modules with the libraries and the services
 * @example
    let config = {
        libraries: {
            library: require('library')
        },
        directory: __dirname + '/',
        modules: [
            [require('bundle'), [
                ['modules/module', {}]
            ]],
            ['modules/module', {}]
        ]
    };
    require('dragonnodejs-async')(config);
 */

module.exports = (config, services) => {
    services = services || {};
    let fns = [];
    for (let module of config.modules) {
        if (typeof module[0] === 'string') {
            module[0] = require(config.directory + module[0]);
        }
        fns.push(() => module[0](module[1], config.libraries, services));
    }
    return Promise.each(fns, fn => fn());
};
