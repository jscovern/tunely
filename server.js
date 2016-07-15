// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ObjectId = require('mongodb').ObjectID;


/************
 * DATABASE *
 ************/
 var db = require('./models');
/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function(req,res) {
  db.Album.find({}, function(err, albums) {
  if(err) res.json({message: "can't find albums "+err});
    res.json(albums);
  });
}
);

app.get('/api/albums/:id', function albumShow(req, res) {
  var myID = req.params.id;
  db.Album.find({}, function(err, albums) {
    var album=albums[myID-1];
    res.json(album);
  });
});

app.post('/api/albums', function(req,res) {
  var postName = req.body.name;
  var postArtistName = req.body.artistName;
  var postReleaseDate = req.body.releaseDate;
  var postGenres = req.body.genres.split(",");
  console.log("genres are: "+postGenres[0]);
  var newAlbum = new db.Album();
  newAlbum.name = postName; 
  newAlbum.artistName = postArtistName;
  newAlbum.releaseDate = postReleaseDate;
  newAlbum.genres = postGenres;
  newAlbum.save(function(error) {
    if(error) res.json({message: "Couldn't create new album b/c "+error});
  });
  res.json(newAlbum);
});

app.post('/api/albums/:albumId/songs', function songsCreate(req, res) {
  console.log('body', req.body);
  var myID = req.params.albumId;
  db.Album.find({}, function(err, albums) {
    if (err) { console.log('error', err); }
    var album = albums[myID - 1];
    console.log("the album is "+album);
    var song = new db.Song(req.body);
    album.songs.push(song);
    album.save(function(err, savedAlbum) {
      if (err) { console.log('error', err); }
      console.log('album with new song saved:', savedAlbum);
      res.json(song);
    });
  });

});

app.get('/api/songsForAlbum/:id', function(req,res) {
  var myId = req.params.id;
  console.log(myId.length);
  var songObjId = ObjectId(myId);
  console.log(songObjId+" is the songObjId");
  db.Song.findOne({"_id": myId}, function(err, song) {
    console.log("songs inside the findOne is "+song);
    res.json(song);
  });
  console.log("req.body is "+req.body);
  console.log("req.params.id is "+req.params.id);
});

app.delete('/api/albums/:id', function deleteAlbum(req, res) {
  var myID = req.params.id;
  console.log('delete id: ', req.params.id);
  var album;
  db.Album.find({}, function(err,albums) {
    album=albums[myID];
    console.log("album to delete is "+album);
    db.Album.remove({_id: album._id}, function(err) {
      if (err) { return console.log(err); }
      console.log("removal of id=" + req.params.id  + " successful.");
      res.status(200).send(); 
    });
  });
  console.log("do I have album out here? "+album);
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
