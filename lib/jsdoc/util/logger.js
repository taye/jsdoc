/**
 * Logging tools for JSDoc.
 *
 * All log messages are printed to the console. By default, messages at level
 * `{@link module:jsdoc/util/logger.LEVELS.ERROR}` or above are logged; all other messages are
 * ignored.
 *
 * Each logger method accepts a `message` parameter that may contain zero or more placeholders. Each
 * placeholder is replaced by the corresponding argument following the message. If the placeholder
 * does not have a corresponding argument, the placeholder is not replaced.
 *
 * The following placeholders are supported:
 *
 * + `%s`: String.
 * + `%d`: Number.
 * + `%j`: JSON.
 *
 * @module jsdoc/util/logger
 * @example
 * var logger = require('jsdoc/util/logger');
 *
 * var data = {
 *   foo: 'bar'
 * };
 * var name = 'baz';
 *
 * logger.warn('%j %s', data, name);  // prints '{"foo":"bar"} baz'
 * @see http://nodejs.org/api/util.html#util_util_format_format
 */
'use strict';

var runtime = require('jsdoc/util/runtime');

/**
 * Logging levels for the JSDoc logger. The default logging level is
 * {@link module:jsdoc/util/logger.LEVELS.ERROR}.
 *
 * @enum
 * @type {number}
 */
var LEVELS = exports.LEVELS = {
    /** Do not log any messages. */
    SILENT: 0,
    /**
     * Log only errors.
     */
    ERROR: 10,
    /**
     * Log the following messages:
     *
     * + Warnings
     * + Errors
     */
    WARN: 20,
    /**
     * Log the following messages:
     *
     * + Informational messages
     * + Warnings
     * + Errors
     */
    INFO: 30,
    /**
     * Log the following messages:
     *
     * + Debugging messages
     * + Informational messages
     * + Warnings
     * + Errors
     */
    DEBUG: 40,
    /** Log all messages. */
    VERBOSE: 100
};

// map log levels to `console` method names
var levelMap = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'info',
    VERBOSE: 'info'
};

var DEFAULT_LEVEL = LEVELS.ERROR;
var logLevel;

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.DEBUG}.
 *
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
exports.debug = null;
/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.ERROR}.
 *
 * @name module:jsdoc/util/logger.error
 * @function
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
exports.error = null;
/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.INFO}.
 *
 * @name module:jsdoc/util/logger.info
 * @function
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
exports.info = null;
/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.VERBOSE}.
 *
 * @name module:jsdoc/util/logger.verbose
 * @function
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
exports.verbose = null;
/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.WARN}.
 *
 * @name module:jsdoc/util/logger.warn
 * @function
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
exports.warn = null;

function noOp() {}

/**
 * Set the log level.
 * 
 * @param {module:jsdoc/util/logger.LEVELS} level - The log level to use.
 */
var setLevel = exports.setLevel = function setLevel(level) {
    level = level || DEFAULT_LEVEL;
    logLevel = level;

    Object.keys(LEVELS).forEach(function(upper) {
        var lower = upper.toLowerCase();

        // assign the appropriate function to each logger method. skip SILENT, which doesn't have
        // a logger method.
        if (level >= LEVELS[upper]) {
            exports[lower] = console[levelMap[upper]];
        }
        else if (exports[lower] !== undefined) {
            exports[lower] = noOp;
        }
    });
};

/**
 * Get the current log level.
 *
 * @return {module:jsdoc/util/logger.LEVELS} The current log level.
 */
exports.getLevel = function getLevel() {
    return logLevel;
};

// Initialize module
setLevel(DEFAULT_LEVEL);
