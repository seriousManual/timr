//TODO: introduce enum for interval identifiers

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

var timeUnits = require('./timeUnits');

function Task() {
    EventEmitter.call(this);

    this._from = moment();
    this._to = null;
    this._interval = null;
    this._modifier = null;
    this._timerHandle = null;
}
util.inherits(Task, EventEmitter);

Task.prototype.execute = function() {
    this.emit('execute');
};

Task.prototype.clear = function () {
    if (this._timerHandle) {
        clearTimeout(this._timerHandle);
    }
};

Task.prototype.timerHandle = function (handle) {
    if (handle !== undefined) {
        this._timerHandle = handle;
    }

    return this._timerHandle;
};

Task.prototype.scheduled = function () {
    return this._timerHandle !== null;
};

Task.prototype.run = function (client) {
    this.schedule();

    if(client) {
        this.on('execute', client);
    }


    return this;
};

Task.prototype.schedule = function() {
    if(this.scheduled()) {
        return;
    }

    var that = this;
    var nextRun = this._calculateNextRun();

    if(!nextRun) {
        return;
    }

    var timeToNextRun = nextRun.valueOf() - moment().valueOf();

    var timerHandle = setTimeout(function() {
        that.timerHandle(null);

        that.execute();

        //rescheduling
        that.schedule();
    }, timeToNextRun);

    that.timerHandle(timerHandle);
};

Task.prototype._calculateNextRun = function() {
    var now = moment();

    if(this._to && now.valueOf() > this._to.valueOf()) {
        return;
    }

    if(this._from && now.valueOf() < this._from.valueOf()) {
        return this._from;
    } else {
        return now.add(this._modifier, this._interval);
    }
};

//------------------------ modifiers -------------------------------------

Task.prototype.every = function(interval) {
    this._interval = (interval ? +interval : 1);

    return this;
};

Task.prototype.days = Task.prototype.day = function () {
    this._modifier = 'days';

    return this;
};

Task.prototype.hour = Task.prototype.hours = function () {
    this._modifier = 'hours';

    return this;
};

Task.prototype.minute = Task.prototype.minutes = function () {
    this._modifier = 'minutes';

    return this;
};

Task.prototype.second = Task.prototype.seconds = function () {
    this._modifier = 'seconds';

    return this;
};

Task.prototype.from = function(from) {
    if(moment(from).isValid()) {
        this._from = moment(from);
    } else {
        throw new Error('invalid from date');
    }

    return this;
};

Task.prototype.to = function(to) {
    if(moment(to).isValid()) {
        this._to = moment(to);
    } else {
        throw new Error('invalid to date');
    }

    return this;
};

module.exports = Task;