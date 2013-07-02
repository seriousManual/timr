var timeUnits = require('./timeUnits');

function Task() {
    this._interval = null;
    this._modifier = null;
    this._client = null;
    this._timerHandle = null;
}

Task.prototype.run = function() {
    this._client.call();
};

Task.prototype.clear = function () {
    if (this._timerHandle) {
        clearTimeout(this._timerHandle);
    }
};

Task.prototype.timerHandle = function (handle) {
    if (handle) {
        this._timerHandle = handle;
    }

    return this._timerHandle;
};

Task.prototype.scheduled = function () {
    return this._timerHandle !== null;
};

Task.prototype.interval = function (interval) {
    this._interval = +interval;

    return this;
};

Task.prototype.days = Task.prototype.day = function () {
    this._modifier = 'd';

    return this;
};

Task.prototype.hour = Task.prototype.hours = function () {
    this._modifier = 'h';

    return this;
};

Task.prototype.minute = Task.prototype.minutes = function () {
    this._modifier = 'm';

    return this;
};

Task.prototype.second = Task.prototype.seconds = function () {
    this._modifier = 's';

    return this;
};

Task.prototype.run = function (client) {
    this._client = client || function () {
    };
};

module.exports = Task;