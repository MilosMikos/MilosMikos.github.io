  let pausePlayButton = document.querySelector("#pauseMusicImg");
  let trackName = document.querySelector("#musicPlayerTitle");
  let trackIndex=0;
  let trackList = [
    {
      name: "Upgrade Station Music",
      path: "music/song01.mp3"
    },
    {
      name: "test music 2",
      path: "music/song01.mp3"
    },
    {
      name: "test music 3",
      path: "music/song01.mp3"
    }
  ];
  let isPlaying=false;
  let currTrack=document.createElement("audio");
  function loadTrack(trackIndex) {
    currTrack.src = trackList[trackIndex].path;
    currTrack.load();
    trackName.innerHTML = trackList[trackIndex].name;
    currTrack.addEventListener("ended", nextTrack);
    playMusic();
  }
  
  loadTrack(trackIndex); // this loads the music track upon first opening the site

  function playPauseMusic() {
    if(!isPlaying) playMusic();
    else pauseMusic();
  }
  function playMusic() {
    currTrack.play();
    isPlaying=true;
    pausePlayButton.src="images/pause.svg"
  }
  function pauseMusic() {
    currTrack.pause();
    isPlaying = false;
    pausePlayButton.src="images/play.svg"
  }
  
  function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (trackIndex < trackList.length - 1)
    trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playMusic();
  }

  function prevTrack() {
    // goes back to the last track if the current one is the first one
    if (trackIndex == 0)
      trackIndex = trackList.length - 1;
    else trackIndex -= 1;
    loadTrack(trackIndex);
    playMusic();
  }

  // script for changing the volume
  let volume = document.querySelector("#volume");
  volume.addEventListener("change", function(e) {
  currTrack.volume = e.currentTarget.value / 100;
  })
  
