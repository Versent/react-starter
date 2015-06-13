var sake         = require('sake');
var childProcess = require('child_process');
var Promise      = require('bluebird');
var fetch        = require('node-fetch');
var serverProcess;

function abortTask(task) {
	return function(err) {
		task.abort(err, 1);
	}
}

function feTestIntAssets() {
	return new Promise(function(resolve, reject) {
		childProcess.exec('make fe-dev-assets', function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			console.log('- Finished assets built')
			resolve();
		});
	});
}

function feTestIntServer(cb) {
	return new Promise(function(resolve, reject) {
		console.log('- Spawning localhost');
		var pingCount = 0;
		serverProcess = childProcess.spawn('node', ['index.js'], {});

		function ping() {
			console.log('- Checking localhost');
			pingCount++;

			if (pingCount > 50) {
				console.log('- too many pings');
				return reject('Max pings');
			}

			return fetch('http://0.0.0.0:9010/')
				.then(function(res) {
					if (res.status == 200) {
						resolve();
					} else {
						pingLater();
					}
				})
				.catch(function(err) {
					console.log('- Ping localhost error, trying again', err);
					pingLater();
				});
		}

		function pingLater() {
			setTimeout(ping, 500);
		}

		pingLater();
	});
}

function feTestIntServerKill(cb) {
	return new Promise(function(resolve, reject) {
		console.log('timeout', serverProcess.pid);
		serverProcess.kill();
		resolve();
	});
}

function feTestIntRun(cb) {
	return new Promise(function(resolve, reject) {
		childProcess.exec('node_modules/.bin/nightwatch', function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			resolve();
		});
	})
}

function feTestIntAll(cb) {
	return feTestIntAssets()
		.then(feTestIntServer)
		.then(feTestIntRun)
		.then(feTestIntServerKill)
}

task('fe:test:int:assets', function(t) {
	return feTestIntAssets()
		.then(t.done.bind(t))
		.catch(abortTask(t));
});

task('fe:test:int:server', function(t) {
	return feTestIntServer()
		.then(function() {
			t.done();
		})
		.catch(abortTask(t));
});

task('fe:test:int:all', function(t) {
	return feTestIntAll()
		.then(function() {
			t.done();
		})
		.catch(abortTask(t));
});
