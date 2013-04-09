var youTubeObject = document.getElementById("movie_player");
if (youTubeObject.getPlayerState() === 1) {
    youTubeObject.pauseVideo();
} else if (youTubeObject.getPlayerState() === 2) {
    youTubeObject.playVideo();
};
