'use strict';

// Module to define a service asynchronously

module.exports = (config, libraries, services) => {
    let Promise = libraries.Promise;

    return new Promise(resolve => {
        setTimeout(() => {
            services.service = 'service';
            resolve();
        }, 0);
    });
};
