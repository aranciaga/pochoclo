var kickass  = require('kickass-torrent')

module.exports = {

	search: function(name, type, subs, season, episode, cb){

		var category = "movies";

		if(Number(season) && Number(episode)){ // I need to find a better way to manage args. Seriously.
			category = "tv";
			name     =  name + " S" + season + "E" + episode
		}

		kickass({
		    q: name + ' category:' + category,
		    field:'seeders',
		    order:'desc',
		    url: 'https://kat.cr'
		},function(e, data){ 

			if(!data.list[0] || e){
				console.log("[1] Torrent not found")
				process.exit()
			}

			cb(null, data.list[0].title, data.list[0].hash, subs) 
			console.log("[1] Torrent Found!")
			
		});		

	}

}