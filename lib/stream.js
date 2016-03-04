var peerflix = require('peerflix') 
	os       = require('os'),

module.exports =  {

	startStreaming: function(hash, subs, cb){

		var engine = peerflix("magnet:?xt=urn:btih:"+hash, { port: 8480 }) 

		engine.server.on('listening', function() {
				
				console.log("[4] Streaming torrent...") 
				cb(hash , subs) 

		}) 

	},

	startPlayer: function(hash, sub){

		if(sub){
			vlc = spawn('vlc', ['http://localhost:8480', '--sub-file', sub])
		} else {
			vlc = spawn('vlc', ['http://localhost:8480'])
		}

		vlc.on('close', (code, signal) => {
			process.exit() 
		}) 

	}

} 
