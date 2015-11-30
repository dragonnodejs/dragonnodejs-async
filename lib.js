'use strict';

let Promise = require('bluebird');

/**
 * Run the modules with the libraries and the services
 * @example
    let directory = __dirname + '/modules/';
    let modules = [
        [require('bundle'), [
            ['module',
                // Configuration for the module
            ]
        ]],
        ['module',
            // Configuration for the module
        ]
    ];
    let libraries = {
        library: require('library')
    };
    require('dragonnodejs')(directory, modules, libraries);
 */

module.exports = (directory, modules, libraries, services) => {
    services = services || {};
    let fns = [];
    for (let module of modules) {
        if (!(module[0] instanceof Function)) {
            module[0] = require(directory + module[0]);
        }
        fns.push(() => module[0](module[1], libraries, services));
    }
    return Promise.each(fns, fn => fn());
};
