var moment = require('moment');

/**
 * represents one task execution step, abstracts the fact that the
 * maximum setTimeout amount is 24.8days by dividing the time span in smaller parts
 *
 * @param showTime the time when the run should be executed
 * @constructor
 */
function Run(showTime) {
    this._showTime = showTime;
    this._handle = null;
    this._redo = false;
}

/**
 * a constant set by the runtime environment
 *
 * @type {number}
 */
Run.MAX_TIMEOUT = 2147483647;

/**
 * setter/getter for the handle of a scheduled timeout
 *
 * @param handle
 * @returns {*}
 */
Run.prototype.timerHandle = function(handle) {
    if(handle !== undefined) {
        this._handle = handle;
    }

    return this._handle;
};

/**
 * if a run is scheduled clears it
 */
Run.prototype.clear = function() {
    if(this._handle) {
        clearTimeout(this._handle);
    }
};

/**
 * for testing purposes, gets called on intermediate steps
 *
 * @private
 */
Run.prototype._stepCallback = function() {};

/**
 * execute a task run
 *
 * @param callback gets invoked when the task is actually executed
 */
Run.prototype.execute = function(callback) {
    var that = this;

    var timeToNextRun = this._showTime.valueOf() - moment().valueOf();

    if(timeToNextRun > Run.MAX_TIMEOUT) {
        this._redo = true;
        timeToNextRun = Run.MAX_TIMEOUT;
    } else {
        this._redo = false;
    }

    var timerHandle = setTimeout(function() {
        that.timerHandle(null);

        if(that._redo) {
            that._stepCallback();
            return that.execute(callback);
        } else {
            return callback();
        }
    }, timeToNextRun);

    that.timerHandle(timerHandle);
};

module.exports = Run;