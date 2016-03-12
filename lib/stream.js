var peerflix = require('peerflix')
    spawn    = require('cross-spawn')
	path     = require('path').resolve(__dirname)

module.exports =  {

	startStreaming: function(sub, hash, cb){

		if(sub){
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       ["magnet:?xt=urn:btih:"+hash, '-t', sub, '--vlc'], { stdio: 'inherit' })
		} else {
			peerflix = spawn(path + '/../node_modules/.bin/peerflix', 
				       ["magnet:?xt=urn:btih:"+hash, '--vlc'], { stdio: 'inherit' })
		}

		peerflix.on('close', (code, signal) => {
			process.exit() 
		}) 

	}


} 
