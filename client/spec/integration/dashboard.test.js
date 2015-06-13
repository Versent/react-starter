module.exports = {
	'It shows the dashboard': function(client) {
		client
			.url(client.launch_url)
			.assert.containsText('h1', 'Dashboard')
			.end();
	}
}
