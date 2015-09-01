var config = require('./webpack.config')

// /build volume added in docker
config.output.path = '/bundles/'
config.output.publicPath = '/bundles/'

module.exports = config
