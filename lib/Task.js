var timeUnits = require('./timeUnits');

function Task() {
    this._interval = null;
    this._modifier = null;
    this._client = null;
}

Task.prototype.interval = function(interval) {
    this._interval = +interval;

    return this;
};

Task.prototype.days = Task.prototype.day = function() {
    this._modifier = 'd';

    return this;
};

Task.prototype.hour = Task.prototype.hours = function() {
    this._modifier = 'h';

    return this;
};

Task.prototype.minute = Task.prototype.minutes = function() {
    this._modifier = 'm';

    return this;
};

Task.prototype.second = Task.prototype.seconds = function() {
    this._modifier = 's';

    return this;
};

Task.prototype.run = function(client) {
    this._client = client || function() {};
};

module.exports = Task;