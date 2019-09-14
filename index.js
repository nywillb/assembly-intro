document.getElementById("date").innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

setInterval(() => {
    document.getElementById("time").innerText = new Date().toLocaleTimeString()
}, 1000)

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = prompt("What is your spotify token? Generate it here: https://bit.ly/2kkavm4");
    const player = new Spotify.Player({
        name: 'Assembly Site',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log("STATE")
        const track = state.track_window.current_track

        console.log(track)

        const artists = track.artists.map((artist, i) => {
            return artist.name;
        })

        let formattedArtists;

        if (artists.length > 1) {
            const last = artists.pop();
            formattedArtists = artists.join(', ') + ' and ' + last;
        } else {
            formattedArtists = artists[0]
        }

        document.getElementById("song-name").textContent = track.name;
        document.getElementById("song-artist").textContent = formattedArtists;
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
};
