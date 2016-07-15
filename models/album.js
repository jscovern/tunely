var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require("./song.js").schema;

var AlbumSchema = mongoose.Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: Array,
	songs: [Song]
	//songs: [{type: Schema.Types.ObjectId,
	//		ref: "Song"}]
});



module.exports = mongoose.model('Album', AlbumSchema);