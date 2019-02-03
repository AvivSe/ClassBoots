try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}


var spooky = new Spooky({
    child: {
        command: 'casperjs.cmd',
        transport: 'http'
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function (err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    spooky.start(
        'https://www.youtube.com/watch?v=4ZHwu0uut3k');
    spooky.then(function () {

        this.emit('hello', 'Document title: ' + this.evaluate(function () {
            return document.title;
        }));
    });
    spooky.run();
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('hello', function (greeting) {
    console.log(greeting);
});


spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
