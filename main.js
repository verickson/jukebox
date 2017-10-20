// * items are not required
// Jukebox :
//   methods :
//     play()
//     pause()
//     stop()
//     *next()
//     *prev()
//     *random()
//     *shuffle()
//   parameters:
//     songs []


// song:
//   properties:
//     name
//     genre
//     length
//     src
//     type



//function for the songs info
  //should capitalize the name of the function
  //in the () are the parameters
function Song(src, name, author, genre){
  this.src = src;
  this.name = name;
  this.genre = genre;
  this.author = author;
};

 //main class jukebox
 class Jukebox{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values
   //var songArray;

   //defines the variable within here
   constructor(){
     //everything that needs 'this' is coming from the constructor and allows you to look in the code for the value

    //list of the songs I have and any new songs that they upload
     this.songArray = [];

     var kano = new Song('songs/y2mate.com-_hello_how_are_you_cover_by_kano_english_subs_fNB8VRwCPTM.mp3', 'Hello/ How are you (cover by Kano)', 'Kano', 'pop');
     var dvbbs = new Song('songs/y2mate.com-dvbbs_dropgun_pyramids_ft_sanjin_official_music_video_UXcQF1205o8.mp3', 'Pyramids (ft. Sanjin)', 'DVBBS & Dropgun', 'Electro House');
     var jinx = new Song('songs/y2mate.com-get_jinxed_jinx_music_video_league_of_legends_0nlJuwO0GDs.mp3', 'Get Jinxed', 'League of Legends', 'Gaming');
     var attack = new Song('songs/y2mate.com-shingeki_no_kyojin_op_opening_guren_no_yumiya_linked_horizon_XMXgHfHxKVM.mp3', 'Shingeki no Kyojin', 'Linked Horizon', 'jpop');
     var taeyon = new Song('songs/y2mate.com-taeyeon___i_feat_verbal_jint_music_video_4OrCA1OInoo.mp3', 'I (feat. Verbal Jint)', 'TAEYEON', 'kpop');

     this.songArray.push(kano, dvbbs, jinx, attack, taeyon);
     //this.songArray.push(kano, dvbbs);

     this.currentSongIndex = 0;

     //created the element audio oject to pull the play, stop, pause info
     this.player = document.createElement('AUDIO');
   }

  //this displays the tracks on the page as a method
  displaySongs(){
    $('#playlist').html('');

    //loop through the songs in the playlist
    for(var i=0; i < this.songArray.length; i++){
      //the 1 is for the index of the songs that beign played
      $('#playlist').append('<h5 id="song_' + i + '">' + this.songArray[i].name + ' by ' + this.songArray[i].author + '</h5>');
    }
  }

  //this is a method
  addAudio(){
    this.player.src = this.songArray[0].src;
    $('#audio').append(this.player);
    this.setCurrent();
  }

  prev(){
    this.next(-1);
  }

  next(opt_val){
    this.stop();

    if (opt_val) {
        this.currentSongIndex += opt_val;
    } else {
        this.currentSongIndex++;
    }

    //this will loop through the remainder of the songs and circle back through the loop to that remainder is hit
    //modulo = %
    this.currentSongIndex = this.currentSongIndex % this.songArray.length;
    //fix for negative numbers to make them positive
    if (this.currentSongIndex < 0){
      this.currentSongIndex += this.songArray.length;
    }

    //this is how the song will get passed
    this.player.src = this.songArray[this.currentSongIndex].src;

    this.setCurrent();
    this.play();
  }

  //this is a method
  play(){
    //console.log('Now playing: ' + this.songArray[0].name);
    this.player.play();
  }

  //this is a method
  pause(){
    //console.log('Paused: ' + this.songArray[0].name);
    this.player.pause();
  }

  //this is a method
  stop(){
    //console.log('Stopped: ' + this.songArray[0].name);
    this.player.pause();
    this.player.currentTime = 0;
  }

  //this is a method
  setCurrent(){
    //clear the current song
    $('#playlist h5').removeClass('currentSong');

    $('#song_' + this.currentSongIndex).addClass('currentSong');
  }

  setSong(index){
    this.currentSongIndex = index;
    this.player.src = this.songArray[this.currentSongIndex].src;
    this.setCurrent();
    this.play();
  }

  //this is a method
  upload(t){
    // the order of this matters, it should update then display the updated song and then update the playing song

    this.stop();

    //items to go into the song values
    var songname = $('#Name').val();
    var songauth = $('#Author').val();
    var songgenre = $('#Genre').val();

    //this will generate the song
    //put the \\ to allow the song path to be after the split because it needs to escape the text \
    //pop gets the last item
    var newSong = new Song('songs/' + t.value.split('\\').pop(), songname, songauth, songgenre);
    this.songArray.push(newSong);
    console.log(t.value.split('\\').pop());

    //displays the song name
    this.displaySongs();

    //allows the song to be places in the code
    this.player.src = 'songs/' + t.value.split('\\').pop();
    $('#audio').append(this.player);

    //this is setting the value of the index to the last one
    this.currentSongIndex = this.songArray.length -1;

    //current song color
    this.setCurrent();

    //auto plays the song
    this.play();
    $('#PlayBtn').hide();
    $('#PauseBtn').show();

    //clear values
    $('#Name').val('');
    $('#Author').val('');
    $('#Genre').val('');
    $('#Upload').val('');
  }
 }


function init(){
  //instance of jukebox
  var jukebox = new Jukebox();

  //displays the names
  jukebox.displaySongs();

  //loads the first song to the player
  jukebox.addAudio();

 //plays on page load
 jukebox.play();

 $('#PlayBtn').hide();
 $('#PauseBtn').show();

 //button click information for what should happen and show
 $('#PlayBtn').click(function(){
   jukebox.play();
   $(this).hide();
   $('#PauseBtn').show();
 });

 $('#PauseBtn').click(function(){
   jukebox.pause();
   $(this).hide();
   $('#PlayBtn').show();
 });

 $('#StopBtn').click(function(){
   jukebox.stop();
   $('#PauseBtn').hide();
   $('#PlayBtn').show();
 });

 $('#NextBtn').click(function(){
   jukebox.next();
   $('#PauseBtn').show();
   $('#PlayBtn').hide();
 });

 $('#PrevBtn').click(function(){
   jukebox.prev();
   $('#PauseBtn').show();
   $('#PlayBtn').hide();
 });

 $('#Upload').change(function(){
   $('#PauseBtn').hide();
   $('#PlayBtn').show();
   jukebox.upload(this);
 });

//grabs the element and do global click for any h5 inside the list
//dynamic
 $("#playlist").on('click', 'h5', function() {
   $('#PauseBtn').show();
   $('#PlayBtn').hide();

   //cuts the number of letters before that index
   //and converts the string of the index to an integer value
   var songId = parseInt($(this).attr('id').substring(5));

   jukebox.setSong(songId);
  });

  //allows for the next song to load when first ones finished
  $("audio").bind('ended', function(){
    jukebox.next();
  });
};

init();




//javascript working for songs
    // function Jukebox(songs) {
    //       this.songList = songs // bring in the array of song objects from outside
    //       this.index = 0 // setting up first (default) value of index
    //       this.currentSong = this.songList[0] // setting up first (default) value of song
    //
    //       this.prev = function() {
    //           this.next(-1);
    //       };
    //       this.play = function() {
    //           console.log('Now playing: ' + this.index);
    //           this.currentSong = this.songList[this.index];
    //           this.currentSong.play();
    //       }
    //       this.pause = function() {
    //            this.currentSong.pause();
    //       }
    //       this.stop = function() {
    //           this.pause();
    //           this.currentSong.currentTime = 0; // currentTime is a built-in method
    //       }
          // this.next = function(opt_val) {
          //     this.stop();
          //     if (opt_val) {
          //         this.index += opt_val;
          //     } else {
          //         this.index++;
          //     }
          //     if (this.index === this.songList.length) {
          //         this.index = 0;
          //     }
          //     if (this.index < 0) {
          //         this.index  = this.songList.length -1;
          //     }
          //     this.play();
          // }
    //   } // end constructor function Jukebox object
    //
    //
    //   // create variables and build an new instance of the Jukebox object
    //   var songArray = [new Audio('songs/y2mate.com - _hello_how_are_you_cover_by_kano_english_subs_fNB8VRwCPTM.mp3'),
    //                     new Audio('songs/y2mate.com - dvbbs_dropgun_pyramids_ft_sanjin_official_music_video_UXcQF1205o8.mp3'),
    //                     new Audio('songs/y2mate.com - get_jinxed_jinx_music_video_league_of_legends_0nlJuwO0GDs.mp3'),
    //                     new Audio('songs/y2mate.com - shingeki_no_kyojin_op_opening_guren_no_yumiya_linked_horizon_XMXgHfHxKVM.mp3'),
    //                     new Audio('songs/y2mate.com - taeyeon___i_feat_verbal_jint_music_video_4OrCA1OInoo.mp3')
    //                  ];
    //
    // var jukebox = new Jukebox(songArray);
