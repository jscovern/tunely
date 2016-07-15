var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = mongoose.Schema({
	name: String,
	trackNumber: Number
});

module.exports = mongoose.model('Song', SongSchema);