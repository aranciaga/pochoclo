var Download = require('download'),
	OS       = require("opensubtitles-api"),
	opensub  = new OS('Popcorn Time v1')  // Thanks Popcorn!

module.exports = {

	searchSub: function(name, hash, subs, cb){

		if(subs) {
			
			opensub.search({ query: name, sublanguageid: subs }).then(function(sub){

				if(!sub){
					console.log("[2] Subtitles not found: You can add them manually.")
					cb(null, hash, null) 
				} else {
					cb(null, hash, sub[Object.keys(sub)].url) 
					console.log("[2] Subtitles found!")
				}			

			}) 		

		} else {
	
			cb(null, hash, null)
	
		}

	},

	downloadSub: function(hash, subs, cb){

		if(subs){

			var sub_file = os.tmpdir() + "/" + subs.substring(subs.lastIndexOf('/')+1) 

		 	new Download({mode: '755'})
			    .get(subs)
			    .dest(os.tmpdir())
			    .run(function(err, files){
			    	cb(null, hash, sub_file) 
			    	console.log("[3] Subtitles downloaded!")
			    	console.log("[4] Waiting for streaming...")
			    }) 		

		} else {
			cb(null, hash, null) 
		}

	}

} 
