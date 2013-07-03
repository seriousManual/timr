var EventEmitter = require('events').EventEmitter;
var util = require('util');

var expect = require('chai').expect;

var TaskMock = function() {
    EventEmitter.call(this);

    this.ident = function() { return 'fooName' };
};
util.inherits(TaskMock, EventEmitter);

var Scheduler = require('../lib/Scheduler');

describe('timr', function() {

    describe('scheduler', function() {
        var myTask = new TaskMock();
        var myS = new Scheduler();

        myS.addTask(myTask);

        it('should add the task to the internal list', function() {
            expect(myS._tasks.length).to.equal(1);
        });

        it('should emit an event', function(done) {
            myS.on('execute', function(name, task) {
                expect(name).to.equal('fooName');
                done();
            });

            myTask.emit('execute');
        });
    });

});