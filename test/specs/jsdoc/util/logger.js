/*global afterEach: true, beforeEach: true, describe: true, expect: true, it: true, jasmine: true */
describe('jsdoc/util/logger', function() {
    // TODO: add DI support so we can spy on the `console` dependency; this appears to be
    // more challenging on Node.js
    var logger = require('jsdoc/util/logger');

    var loggerMethods = ['error', 'warn', 'info', 'debug', 'verbose'];

    it('should exist', function() {
        expect(logger).toBeDefined();
        expect(typeof logger).toBe('object');
    });

    it('should export a "debug" method', function() {
        expect(logger.debug).toBeDefined();
        expect(typeof logger.debug).toBe('function');
    });

    it('should export an "error" method', function() {
        expect(logger.error).toBeDefined();
        expect(typeof logger.error).toBe('function');
    });

    it('should export a "getLevel" method', function() {
        expect(logger.getLevel).toBeDefined();
        expect(typeof logger.getLevel).toBe('function');
    });

    it('should export an "info" method', function() {
        expect(logger.info).toBeDefined();
        expect(typeof logger.info).toBe('function');
    });

    it('should export a "LEVELS" object', function() {
        expect(logger.LEVELS).toBeDefined();
        expect(typeof logger.LEVELS).toBe('object');
    });

    it('should export a "setLevel" method', function() {
        expect(logger.setLevel).toBeDefined();
        expect(typeof logger.setLevel).toBe('function');
    });

    it('should export a "verbose" method', function() {
        expect(logger.verbose).toBeDefined();
        expect(typeof logger.verbose).toBe('function');
    });

    it('should export a "warn" method', function() {
        expect(logger.warn).toBeDefined();
        expect(typeof logger.warn).toBe('function');
    });

    describe('getLevel', function() {
        it('should return LEVELS.ERROR by default', function() {
            expect( logger.getLevel() ).toBe(logger.LEVELS.ERROR);
        });
    });

    describe('LEVELS', function() {
        var LEVELS = logger.LEVELS;

        it('should include the correct properties', function() {
            expect(LEVELS.VERBOSE).toBeDefined();
            expect(LEVELS.DEBUG).toBeDefined();
            expect(LEVELS.INFO).toBeDefined();
            expect(LEVELS.WARN).toBeDefined();
            expect(LEVELS.ERROR).toBeDefined();
            expect(LEVELS.SILENT).toBeDefined();
        });

        it('should weight the logging levels correctly relative to one another', function() {
            expect(LEVELS.VERBOSE).toBeGreaterThan(LEVELS.DEBUG);
            expect(LEVELS.DEBUG).toBeGreaterThan(LEVELS.INFO);
            expect(LEVELS.INFO).toBeGreaterThan(LEVELS.WARN);
            expect(LEVELS.WARN).toBeGreaterThan(LEVELS.ERROR);
            expect(LEVELS.ERROR).toBeGreaterThan(LEVELS.SILENT);
        });
    });

    describe('setLevel', function() {
        it('should update the log level', function() {
            logger.setLevel(logger.LEVELS.VERBOSE);
            expect( logger.getLevel() ).toBe(logger.LEVELS.VERBOSE);
        });
    });
});
