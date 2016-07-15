/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

var songsArray = [];




$(document).ready(function() {
  console.log('app.js loaded!');
  getAlbums();

  $("form").on('submit', function() {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    $(this).trigger('reset');

    var currNumAlbums = $("[data-album-id]").length;

    $.ajax({
      method: "POST",
      url: "/api/albums",
      data: formData,
      success: function onSuccess(json) {
        renderAlbum(json,currNumAlbums);}
    });
  });
  var id;
  $('#albums').on('click', '.add-song', function(e) {
    id= $(this).parents('.album').data('album-id');
    console.log($(this).parents('.album'));
    console.log('id',id);
    $('#songModal').data('album-id', id).modal();
  });


  $('#saveSong').on('click', handleNewSongSubmit);


  $('#albums').on('click', '.delete-album', handleDeleteAlbumClick);


});



function createAlbum() {
  $.post("/api/albums", function(data,status) {
    event.preventDefault();

  });
}

function getAlbums() {
  $.ajax({
    method: "GET",
    url: "/api/albums",
    success: function onSuccess(json) {
      console.log(json);

      json.forEach(renderAlbum);
    }
  });
}

function handleNewSongSubmit() {
  var albumId = $('#songModal').data('album-id') + 1;
  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();

  var formData = {
    name: songName,
    trackNumber: trackNumber
  };
  console.log('album ID is '+albumId);
  var postUrl = '/api/albums/' + albumId + '/songs';
  console.log('posting to ', postUrl, ' with data ', formData);

  $.post(postUrl, formData)
    .success(function(song) {
      console.log('song', song);

      // re-get full album and render on page
      $.get('/api/albums/' + albumId).success(function(album) {
        //remove old entry
        $('[data-album-id='+ albumId + ']').remove();
        // render a replacement
        renderAlbum(album);
      });

      //clear form
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('hide');

    });
}

function handleDeleteAlbumClick() {
  var albumId = $(this).parents('.album').data('album-id');
  console.log('delete id=' + albumId );
  $.ajax({
    method: 'DELETE',
    url: ('/api/albums/' + albumId),
    success: function() {
      $('[data-album-id='+ albumId + ']').remove();
    }
  });
}

function buildSongsHtml(songs) {
  console.log(songs);
  var songLoopHTML = "";
  songs.forEach(function(song,index) {
      songLoopHTML += " &ndash; "+" ("+song.trackNumber+") "+song.name+" "; 
  });
  var songsHtml = 
    "<li class='list-group-item'>"+
    "<h4 class='inline-header'>Songs:</h4>"+
    "<span>"+songLoopHTML+"</span>"+
    "</li>";
    return songsHtml;
}


// function createSongList(songs) {
//   var songLoopHTML="";
//   songs.forEach(function(song,index) {
//     songLoopHTML += " &ndash; "+" ("+song.trackNumber+") "+song.name+" "; 
//   });
//   console.log("output of createsonglist html: "+songLoopHTML);
//   buildSongsHtml(songLoopHTML);
// }


// function returnHtml() {
//   globalSongsHtml += " &ndash; "+" ("+currSong.trackNumber+") "+currSong.name+" ";  
//   buildSongsHtml(globalSongsHtml);
// }

// function getSongList(id, index, callback) {
//   console.log("in the getSongList function, and the id is "+id);
//   var geturl = "/api/songsForAlbum/"+id;
//   $.ajax({
//     method: "GET", 
//     url: geturl,
//     success: function(data,status) {
//       console.log("the data on the app.js is "+data.trackNumber);
//       songsArray[index] = data;
//       callback(data);
//     }
//   });
// }

// this function takes a single album and renders it to the page
function renderAlbum(album, index) {
  //console.log('rendering album:', album);
  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + index + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName+ "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
                        buildSongsHtml(album.songs) +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
                  "<button class='btn btn-primary add-song'>Add Song</button>"+
                  "<button class='btn btn-primary delete-album'>Delete Album</button>"+
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
    //console.log($("#albums")+" - this is $#albums");
    // console.log(albumHtml);
    $("#albums").append(albumHtml);


}
