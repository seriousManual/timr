var EventEmitter = require('events').EventEmitter;
var util = require('util');

var expect = require('chai').expect;

var TaskMock = function(name) {
    EventEmitter.call(this);

    this.ident = function() { return name };
};
util.inherits(TaskMock, EventEmitter);

var Scheduler = require('../lib/Scheduler');

describe('timr', function() {

    describe('scheduler', function() {
        var task1 = new TaskMock('fooName');
        var task2 = new TaskMock('barName');

        var names = [];

        var myS = new Scheduler();

        myS.addTask(task1);
        myS.addTask(task2);

        myS.on('execute', function(name, task) {
            names.push(name);
        });

        task1.emit('execute');
        task2.emit('execute');

        it('should add the task to the internal list', function() {
            expect(myS._tasks.length).to.equal(2);
        });

        it('should emit an event', function() {
            expect(names).to.deep.equal(['fooName', 'barName']);
        });
    });

});