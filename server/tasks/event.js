/**
 * Created by ollie on 2018/6/26.
 */
const EventEmitter = require('events');

class WithLog extends EventEmitter {
    execute(taskFunc) {
        console.log('Before executing');
        this.emit('begin');
        taskFunc();
        this.emit('end');
        console.log('After executing');
    }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

// withLog.execute(() => console.log('*** Executing task ***'));
withLog.execute(() => {
    setImmediate(() => {
        console.log('*** Executing task ***')
    });
});