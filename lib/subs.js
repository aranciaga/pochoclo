var Download = require('download'),
	OS       = require("opensubtitles-api"),
	opensub  = new OS('Popcorn Time v1')  // Thanks Popcorn!

module.exports = {

	searchSub: function(name, hash, subs, cb){

		if(subs) {
			
			opensub.search({ query: name, sublanguageid: subs }).then(function(sub){

				if(!sub[Object.keys(sub)]){
					console.log("Subtitles not found: You can add them manually.")
					cb(null, hash, null) 
				} else {
					cb(null, sub[Object.keys(sub)].url) 
					console.log("Subtitles found!")
				}			

			}) 		

		} else {
	
			cb(null, null)
	
		}

	},

	downloadSub: function(subs, cb){

		if(subs){

			var sub_file = os.tmpdir() + "/" + subs.substring(subs.lastIndexOf('/')+1) 

		 	new Download({mode: '755'})
			    .get(subs)
			    .dest(os.tmpdir())
			    .run(function(err, files){
			    	cb(null, sub_file) 
			    	console.log("Subtitles downloaded!")
			    }) 		

		} else {
			cb(null, null) 
		}

	}

} 
