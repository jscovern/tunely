// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");
console.log("in the seed.js");
var songsFromDB;

var albumsList =[
  /* hard-coded data */
{
  artistName: 'the Old Kanye',
  name: 'The College Dropout',
  releaseDate: '2004, February 10',
  genres: [ 'rap', 'hip hop' ],
  songs: []
},
{
  artistName: 'the New Kanye',
  name: 'The Life of Pablo',
  releaseDate: '2016, Febraury 14',
  genres: [ 'hip hop' ],
  songs: []
},
{
  artistName: 'the always rude Kanye',
  name: 'My Beautiful Dark Twisted Fantasy',
  releaseDate: '2010, November 22',
  genres: [ 'rap', 'hip hop' ],
  songs: []
},
{
  artistName: 'the sweet Kanye',
  name: '808s & Heartbreak',
  releaseDate: '2008, November 24',
  genres: [ 'r&b', 'electropop', 'synthpop' ],
  songs: []
}];

var sampleSongs = [];

sampleSongs.push({ name: 'Famous',
                   trackNumber: 1
});
sampleSongs.push({ name: "All of the Lights",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Guilt Trip',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Paranoid',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Ultralight Beam',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Runaway',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Stronger',
                   trackNumber: 7
});
db.Song.remove({}, function(err,songs) {
	if(err) res.json({message: "can't remove songs "+err});
});

// sampleSongs.forEach(addSongsToDB);

// var songsList = function(callback) {
// 	db.Song.find().exec(function(err,songs) {
// 		callback(err,songs);
// 	});
// };

function addSampleSongs(album,index) {
  console.log("in the addSampleSongs");
	// var songsList = db.Song.find({})
	// 	.exec(function(err, songsArray) {
 //      var parsedSongsArray = JSON.parse(songsArray);
      // for(var i=0; i<sampleSongs.length; i++) {
				albumsList[index].songs = sampleSongs;
        // albumsList[index].songs.trackNumber = sampleSongs[i].trackNumber;
      // }
      console.log("curr album, after adding in songs: "+albumsList[index]);
			db.Album.create(albumsList[index], function(err, albums){
			    if (err) return console.log('ERROR', err);
          console.log("on album "+albums.name + " "+albums.songs);
			    console.log("all albums:", albums);
			    console.log("created", albums.length, "albums");
			    process.exit();
		    });
    }

// 	var songList = songsList(function(err,songs) {
// 	if(err) res.json({message: "error" +err});
// 	console.log(songs);
// 	return songs;
// });
// 	albumsList[index].songs.push(songList);
	// db.Song.find({},function(err,songsList) {
	// 	if(err) res.json({message: "blah "+err});
	// 	console.log("albumsList[index]: "+albumsList[index].name+" has index: "+index+" songs list is "+songsList);
	// 	albumsList[index].songs.push(songsList);
	// });

// function addSongsToDB(song) {
	// var newSong = new db.Song();
	// newSong.name = song.name;
	// newSong.trackNumber = song.trackNumber;
// 	newSong.save(function(error) {
// 		if(error) res.json({message:"error creating songs "+error});
// 	});
// }

db.Album.remove({}, function(err, albums){
  console.log("in the album.remove");
	db.Song.remove({}, function(err, songsRemove) {
    console.log("in the song.remove");
		db.Song.create(sampleSongs, function(err, songsCreate) {
      console.log("in the song.create");
      songsFromDB = songsCreate;
			albumsList.forEach(addSampleSongs);
		});
	});
});