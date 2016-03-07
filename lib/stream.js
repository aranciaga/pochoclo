var peerflix = require('peerflix') 
	os       = require('os'),

module.exports =  {

	startStreaming: function(title, hash, subs, cb){

		var engine = peerflix("magnet:?xt=urn:btih:"+hash, { port: 8480 }) 

		engine.server.on('listening', function() {
				console.log("Streaming: "+title) 
				cb(null, title, hash, subs)
		}) 

	},

	startPlayer: function(sub){
		
		vlc = (sub) ? spawn('vlc', ['http://localhost:8480', '--sub-file', sub]) : 
		              spawn('vlc', ['http://localhost:8480'])

		vlc.on('close', (code, signal) => {
			process.exit() 
		}) 

	}

} 
