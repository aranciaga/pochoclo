var async    = require('async')
	stream   = require('./lib/stream.js')
	subs     = require('./lib/subs.js')
	kat      = require('./lib/kat.js')
	spawn    = require('child_process').spawn
	fs       = require('fs')
	chalk	 = require('chalk')
	type     = process.argv[2]
	name     = process.argv[3]
	types    = ['--movie', '--tvshow']

var season, episode, subs_language

var help_screen = function(){

	var path = require('path').basename(__dirname);

	fs.readFile(path + '/' + 'logo.dat', 'utf8', function (err,data) {
	  	console.log(chalk.yellow(data)) 
		console.log(chalk.cyan("\nFor Movies:\npochoclo --movie [name]"))
		console.log(chalk.cyan("For TV Shows:\npochoclo --tvshow [name] [season] [episode]\n"))
		console.log(chalk.red("Optional Arg:\n--sub [spa,eng,fre,etc] (Use it at the end)"))
		process.exit() 
	}) 
	
}

if( types.indexOf(type) == -1){
	help_screen() 
}

if ( process.argv.indexOf("--subs") != -1 ) {  
	subs_language = process.argv[ process.argv.indexOf("--subs") + 1 ] 
}


if(type == "--tvshow"){

	season  = process.argv[process.argv.indexOf(type)+2]
	episode = process.argv[process.argv.indexOf(type)+3]

	if(!season || !episode)	{
		help_screen() 
	}

	if(season.toString().length<=1){
		season = "0" + season.toString()
	}

	if(episode.toString().length<=1){
		episode = "0" + episode.toString()
	}

}


async.waterfall([
	async.apply(kat.search, name, type, subs_language, season, episode),
	subs.searchSub,
	subs.downloadSub,
	stream.startStreaming,
], function(hash, sub){
	stream.startPlayer(sub) 
}) 
