const socket = io();

// setup player ui
const controls = [
  'play-large', // The large play button in the center
  'restart', // Restart playback
  'rewind', // Rewind by the seek time (default 10 seconds)
  'play', // Play/pause playback
  'fast-forward', // Fast forward by the seek time (default 10 seconds)
  'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'mute', // Toggle mute
  'volume', // Volume control
  'captions', // Toggle captions
  'settings', // Settings menu
  'pip', // Picture-in-picture (currently Safari only)
  'airplay', // Airplay (currently Safari only)
  'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
  'fullscreen' // Toggle fullscreen
];

document.addEventListener('DOMContentLoaded', () => {
  const player = new Plyr('#player', { controls });
  
  socket.emit('connection', "ready to received");
  
  socket.on('status', function (status) {
    console.log('status :', status);
    switch (status) {
      case 'play':
        player.play();
        break;
      case 'pause':
        player.pause();
        break;
      default:
        console.error('Unknown request : ' + msg)
        break;
    }
  });

  socket.on('volume', function (volume) {
    console.log('volume :', Number(volume) / 100);
    player.volume = Number(volume) / 100;
  });

  socket.on('time', function (time) {
    console.log('time :', Number(time));
    player.currentTime = Number(time);
  });

  socket.on('media', function (media) {
    console.log('media :', media);
    switch (media.service) {
      case 'youtube':
        displayYoutube(media);

        break;
      default:
        break;
    }
  });
});