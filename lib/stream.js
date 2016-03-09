var peerflix = require('peerflix'),
    spawn = require('cross-spawn')

module.exports =  {

	startStreaming: function(title, hash, subs, cb){

		var engine = peerflix("magnet:?xt=urn:btih:"+hash, { port: 8480 }) 

		engine.server.on('listening', function() {
				console.log("Streaming: " + title) 
				cb(null, title, hash, subs)
		}) 

	},

	startPlayer: function(sub){
		
		vlc = (sub) ? spawn('vlc', ['http://localhost:8480', '--sub-file', sub], { stdio: 'inherit' }) : 
		              spawn('vlc', ['http://localhost:8480'], { stdio: 'inherit' })

		vlc.on('close', (code, signal) => {
			process.exit() 
		}) 

	}

} 
