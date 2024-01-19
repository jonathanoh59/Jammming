const Spotify = {
    clientID: "2a0b257ce8ec4d0ca3605005b22549fd",
    redirectURI: 'http://localhost:3000/',
    scope: 'user-read-private user-read-email playlist-modify-public',
    accessToken: '', // Added access token property

    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },

    authorize() {
        const state = this.generateRandomString(16);
        localStorage.setItem('spotify_auth_state', state);

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(this.clientID); // Corrected to this.clientID
        url += '&scope=' + encodeURIComponent(this.scope);
        url += '&redirect_uri=' + encodeURIComponent(this.redirectURI); // Corrected to this.redirectURI
        url += '&state=' + encodeURIComponent(state);

        window.location.href = url;
    },

    getAccessToken(){
        if(this.accessToken){ // Referencing this.accessToken
            return this.accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/); // Removed extra space in regex
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/); // Removed extra space in regex
        if(urlAccessToken && urlExpiresIn){
            this.accessToken = urlAccessToken[1];
            const expiresIn = Number(urlExpiresIn[1]);
            window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
        }
        else{
            const redirect = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectURI}`; // Corrected property references
            window.location = redirect;
        }
    },

    search(term){
        const accessToken = this.getAccessToken(); // Use this.getAccessToken
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse =>{
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({ // Changed tracks to track
                id: track.id,
                name: track.name,
                artist: track.artists[0].name, // Corrected track.artist to track.artists
                album: track.album.name, // Corrected track.album
                uri: track.uri
            }));
        });
    },

    getUserId() {
        const accessToken = this.getAccessToken();
        return fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.id);
    },

    createPlaylist(userId, playlistName) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: playlistName })
        })
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.id);
    },

    addTracksToPlaylist(playlistId, trackUris) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: trackUris })
        });
    },

    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) {
            return;
        }
        this.getUserId()
            .then(userId => {
                if (!userId) {
                    return;
                }
                return this.createPlaylist(userId, playlistName);
            })
            .then(playlistId => {
                if (!playlistId) {
                    return;
                }
                return this.addTracksToPlaylist(playlistId, trackUris);
            });
    }
};

export default Spotify;