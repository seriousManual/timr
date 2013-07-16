var moment = require('moment');

function Run(showTime) {
    this._showTime = showTime;
    this._handle = null;
    this._redo = false;
}

Run.MAX_TIMEOUT = 2147483647;

Run.prototype.timerHandle = function(handle) {
    if(handle !== undefined) {
        this._handle = handle;
    }

    return this._handle;
};

Run.prototype.clear = function() {
    if(this._handle) {
        clearTimeout(this._handle);
    }
};

Run.prototype._stepCallback = function() {};

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