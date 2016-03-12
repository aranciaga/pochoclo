var Download = require('download'),
	OS       = require("opensubtitles-api"),
	os       = require('os'),
	chalk    = require('chalk'),
	opensub  = new OS('Popcorn Time v1')  // Thanks Popcorn!

module.exports = {

	searchSub: function(name, hash, subs, cb){

		if(subs) {
			
			opensub.search({ query: name, sublanguageid: subs }).then(function(sub){

				if(!sub[Object.keys(sub)]){
					console.log(chalk.red("✖ Subtitles not found: You can add them manually."))
					cb(null, null, hash) 
				} else {
					cb(null, sub[Object.keys(sub)].url, hash) 
					console.log(chalk.green("✔ Subtitles found"))
				}			

			}) 		

		} else {
	
			cb(null, null)
	
		}

	},

	downloadSub: function(subs, hash, cb){

		if(subs){

			var sub_file = os.tmpdir() + "/" + subs.substring(subs.lastIndexOf('/')+1) 

		 	new Download({mode: '755'})
			    .get(subs)
			    .dest(os.tmpdir())
			    .run(function(err, files){
			    	cb(null, sub_file, hash) 
			    	console.log(chalk.green("✔ Subtitles downloaded"))
			    }) 		

		} else {
			cb(null, null) 
		}

	}

} 
