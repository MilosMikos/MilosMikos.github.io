window.addEventListener("DOMContentLoaded", function () {
    const langContainer = document.getElementById("language-container");
  
    // Position originale par rapport au haut de la page
    const containerTop = langContainer.getBoundingClientRect().top + window.scrollY;
  
    function handleScroll() {
      const scrollTop = window.scrollY;
  
      if (scrollTop >= containerTop) {
        langContainer.classList.add("sticky");
      } else {
        langContainer.classList.remove("sticky");
      }
    }
  
    window.addEventListener("scroll", handleScroll);
  });
  
  function playSound(src, volume = 0.5) {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  }

  window.IDDQD = function() {
    playSound("/sounds/haaax.mp3");
    console.log("Degreelessness mode on");
  };


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
    }
  ];
  let isPlaying=true;
  let currTrack=document.createElement("audio");
  function loadTrack(trackIndex) {
    currTrack.src = trackList[trackIndex].path;
    currTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    currTrack.addEventListener("ended", nextTrack());
  }

  loadTrack(trackIndex);

  function playPauseMusic() {
    if(!isPlaying) playMusic();
    else pauseMusic();
  }
  function playMusic() {
    currTrack.play();
    isPlaying=true;
  }
  function pauseMusic() {
    currTrack.pause();
    isPlaying = false;
  }
  
  function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (trackIndex < trackList.length - 1)
    trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
  }
  
  
