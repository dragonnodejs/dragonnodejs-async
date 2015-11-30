'use strict';

/**
 * Asynchronously module for unit testing which saves all arguments of all calls
 * @example
    ['module-async']
 */

module.exports = (config, libraries, services) => {
    let Promise = libraries.Promise;

    return new Promise(resolve => {
        setTimeout(() => {
            services.args = services.args || [];
            services.args.push({ config, libraries, services });
            resolve();
        }, 0);
    });
};
