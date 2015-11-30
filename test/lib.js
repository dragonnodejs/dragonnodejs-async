'use strict';

let assert = require('assert');

describe('dragonnodejs', () => {
    let dragonnodejs = require('../lib');

    it('should use a module already required', () => {
        let modules = [
            [require(__dirname + '/module')]
        ];
        let services = {};
        dragonnodejs('', modules, {}, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
        });
    });

    it('should use an asynchronously module already required', () => {
        let modules = [
            [require(__dirname + '/module-async')]
        ];
        let libraries = {
            Promise: require('bluebird')
        };
        let services = {};
        dragonnodejs('', modules, libraries, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
        });
    });

    it('should load a module with directory and relative path', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
        });
    });

    it('should load an asynchronously module with directory and relative path', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module-async']
        ];
        let libraries = {
            Promise: require('bluebird')
        };
        let services = {};
        dragonnodejs(directory, modules, libraries, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
        });
    });

    it('should allow a module to use the config', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module', 'config']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
            assert.equal(services.args[0].config, 'config');
        });
    });

    it('should allow a module to use the libraries', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let libraries = 'libraries';
        let services = {};
        dragonnodejs(directory, modules, libraries, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
            assert.equal(services.args[0].libraries, 'libraries');
        });
    });

    it('should allow a module to use the services', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module']
        ];
        let services = { service: 'service' };
        dragonnodejs(directory, modules, {}, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 1);
            assert.equal(services.args[0].services.service, 'service');
        });
    });

    it('should use several modules independently', () => {
        let directory = __dirname + '/';
        let modules = [
            ['module', 'A'],
            ['module', 'B']
        ];
        let services = {};
        dragonnodejs(directory, modules, {}, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 2);
            assert.equal(services.args[0].config, 'A');
            assert.equal(services.args[1].config, 'B');
        });
    });

    it('should not break if use all features together', () => {
        let directory = __dirname + '/';
        let modules = [
            [require(__dirname + '/module'), 'A'],
            [require(__dirname + '/module-async'), 'B'],
            ['module', 'C'],
            ['module-async', 'D'],
            [require(__dirname + '/module'), 'E'],
            [require(__dirname + '/module-async'), 'F'],
            ['module', 'G'],
            ['module-async', 'H']
        ];
        let libraries = {
            libraries: 'libraries',
            Promise: require('bluebird')
        };
        let services = { service: 'service' };
        dragonnodejs(directory, modules, libraries, services).then(() => {
            assert(Array.isArray(services.args));
            assert.equal(services.args.length, 8);
            assert.equal(services.args[0].config, 'A');
            assert.equal(services.args[0].libraries.libraries, 'libraries');
            assert.equal(services.args[0].services.service, 'service');
            assert.equal(services.args[1].config, 'B');
            assert.equal(services.args[1].libraries.libraries, 'libraries');
            assert.equal(services.args[1].services.service, 'service');
            assert.equal(services.args[2].config, 'C');
            assert.equal(services.args[2].libraries.libraries, 'libraries');
            assert.equal(services.args[2].services.service, 'service');
            assert.equal(services.args[3].config, 'D');
            assert.equal(services.args[3].libraries.libraries, 'libraries');
            assert.equal(services.args[3].services.service, 'service');
            assert.equal(services.args[4].config, 'E');
            assert.equal(services.args[4].libraries.libraries, 'libraries');
            assert.equal(services.args[4].services.service, 'service');
            assert.equal(services.args[5].config, 'F');
            assert.equal(services.args[5].libraries.libraries, 'libraries');
            assert.equal(services.args[5].services.service, 'service');
            assert.equal(services.args[6].config, 'G');
            assert.equal(services.args[6].libraries.libraries, 'libraries');
            assert.equal(services.args[6].services.service, 'service');
            assert.equal(services.args[7].config, 'H');
            assert.equal(services.args[7].libraries.libraries, 'libraries');
            assert.equal(services.args[7].services.service, 'service');
        });
    });
});
