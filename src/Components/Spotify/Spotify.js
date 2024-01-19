// class Spotify {
//     constructor() {
//         // Generate a random string as a code verifier for the PKCE process
//         this.codeVerifier = this.generateRandomString(128);
//         // Generate a code challenge based on the code verifier
//         // and then initialize authorization once the challenge is ready
//         this.getCodeChallenge().then(challenge => {
//             this.codeChallenge = challenge;
//             this.initializeAuthorization();
//         });
//     }

//     generateRandomString(length) {
//         // Generates a random string of the given length using specified characters
//         // This string is used as the PKCE code verifier
//         let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         const values = crypto.getRandomValues(new Uint8Array(length));
//         return Array.from(values).map(x => possible[x % possible.length]).join("");
//     }
    
//     async sha256(plain) {
//         // Creates a SHA-256 hash of the provided plain text (used in the PKCE process)
//         // This is part of generating the code challenge
//         const encoder = new TextEncoder();
//         const data = encoder.encode(plain);
//         return window.crypto.subtle.digest('SHA-256', data);
//     }
    
//     base64encode(input) {
//         // Encodes the given input into a base64url format (URL safe)
//         // Used to format the code challenge
//         return btoa(String.fromCharCode(...new Uint8Array(input)))
//             .replace(/=/g, '')
//             .replace(/\+/g, '-')
//             .replace(/\//g, '_');
//     }

//     async getCodeChallenge() {
//         // Generates the PKCE code challenge by hashing the code verifier
//         // and then encoding the result in base64url format
//         const hashed = await this.sha256(this.codeVerifier);
//         return this.base64encode(hashed);
//     }

//     initializeAuthorization() {
//         // Starts the authorization process if there's no access token available
//         if (!this.accessToken && !window.location.href.includes('access_token')) {
//             this.redirectToSpotifyAuthorization();
//         }
//         // Otherwise, you might want to handle extracting the access token from the URL
//     }
  
//     redirectToSpotifyAuthorization() {
//         // Redirects the user to the Spotify authorization page
//         // Constructs the URL with necessary parameters for the PKCE flow
//         const clientId = '2a0b257ce8ec4d0ca3605005b22549fd'; // Spotify client ID
//         const redirectUri = 'http://localhost:3000'; // Redirect URI set in Spotify Developer Dashboard
//         const scope = 'user-read-private user-read-email'; // Spotify permissions

//         const authUrl = new URL("https://accounts.spotify.com/authorize");

//         // Stores the code verifier in localStorage for later use when exchanging the code for a token
//         window.localStorage.setItem('code_verifier', this.codeVerifier);

//         // Sets the search parameters for the authorization request
//         const params = {
//             response_type: 'code',
//             client_id: clientId,
//             scope: scope,
//             code_challenge_method: 'S256',
//             code_challenge: this.codeChallenge,
//             redirect_uri: redirectUri,
//         };

//         // Redirects the user to the authorization URL
//         authUrl.search = new URLSearchParams(params).toString();
//         window.location.href = authUrl.toString();
//     }

//     async getAccessToken() {
//         // Retrieves the access token from Spotify
//         // Checks if the token is already set, and if not, proceeds to get it
//         if (this.accessToken) {
//             return this.accessToken;
//         }

//         // Extracts the authorization code from the URL
//         const codeMatch = window.location.href.match(/code=([^&]*)/);
//         if (!codeMatch) {
//             console.error('Authorization code not found in URL');
//             return;
//         }

//         const code = codeMatch[1];

//         // Retrieves the code verifier from localStorage
//         const codeVerifier = window.localStorage.getItem('code_verifier');
//         if (!codeVerifier) {
//             console.error('Code verifier not found in localStorage');
//             return;
//         }

//         // Sets up the request to exchange the code for an access token
//         const clientId = '2a0b257ce8ec4d0ca3605005b22549fd';
//         const redirectUri = 'http://localhost:12';

//         const payload = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: new URLSearchParams({
//                 client_id: clientId,
//                 grant_type: 'authorization_code',
//                 code: code,
//                 redirect_uri: redirectUri,
//                 code_verifier: codeVerifier,
//             }),
//         };

//         try {
//             // Sends the request and handles the response
//             const response = await fetch('https://accounts.spotify.com/api/token', payload);
//             const data = await response.json();

//             // If the access token is retrieved, it's stored for future use
//             if (data.access_token) {
//                 this.accessToken = data.access_token;
//                 localStorage.setItem('access_token', this.accessToken);

//                 // Clears the URL parameters to clean up the address bar
//                 window.history.pushState('Access Token', null, '/');
//             } else {
//                 console.error('Failed to retrieve access token');
//             }
//         } catch (error) {
//             console.error('Error fetching access token', error);
//         }
//     }



    
//     async search(term) {
//         // Ensure the access token is available
//         const accessToken = await this.getAccessToken();
//         if (!accessToken) {
//             console.error('Access token is not available.');
//             return [];
//         }

//         // Define the API endpoint with the search term and type=track
//         const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

//         try {
//             // Make a GET request to the Spotify API
//             const response = await fetch(endpoint, {
//                 headers: { 'Authorization': `Bearer ${accessToken}` }
//             });

//             // Check if the response is OK
//             if (!response.ok) {
//                 throw new Error(`Request failed: ${response.status}`);
//             }

//             // Convert the response to JSON format
//             const jsonResponse = await response.json();

//             // Map the tracks from the JSON response to an array of track objects
//             return jsonResponse.tracks.items.map(track => ({
//                 id: track.id,
//                 name: track.name,
//                 artist: track.artists[0].name,
//                 album: track.album.name,
//                 uri: track.uri
//             }));
//         } catch (error) {
//             console.error('Error occurred while fetching tracks:', error);
//             return [];
//         }
//     }
// }

// export default Spotify;

// class Spotify {
//     constructor() {
//         this.client_id = '2a0b257ce8ec4d0ca3605005b22549fd';
//         this.redirect_uri = 'http://localhost:3000/';
//         this.scope = 'user-read-private user-read-email playlist-modify-public';
//     }

//     generateRandomString(length) {
//         let text = '';
//         const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//         for (let i = 0; i < length; i++) {
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         }

//         return text;
//     }

//     authorize() {
//         const state = this.generateRandomString(16);
//         localStorage.setItem('spotify_auth_state', state);

//         let url = 'https://accounts.spotify.com/authorize';
//         url += '?response_type=token';
//         url += '&client_id=' + encodeURIComponent(this.client_id);
//         url += '&scope=' + encodeURIComponent(this.scope);
//         url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri);
//         url += '&state=' + encodeURIComponent(state);

//         window.location.href = url; // Redirect to Spotify's authorization page
//     }
// }

// export default Spotify;

// let accessToken = "";
// const clientID = "2a0b257ce8ec4d0ca3605005b22549fd";
// const redirectURI = "http://localhost:3000/";
// const Spotify = {
//     getAccessToken(){
//         if(accessToken){
//             return accessToken;
//         }
//         const urlAccessToken = window.location.href.match(/access_token=( [^&]*)/);
//         const urlExpiresIn = window.location.href.match(/expires_in=( [^&]*)/);
//         if(urlAccessToken && urlExpiresIn){
//             accessToken = urlAccessToken[1];
//             const expiresIn = Number(urlExpiresIn[1]);
//             window.setTimeout(()=>(accessToken=""), expiresIn * 1000);
//             window.history.pushState("Access Token", null, "/");
//         }
//         else{
//             const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
//             window.location = redirect;
//         }
//     },

//     search(term){
//         const accessToken = Spotify.getAccessToken();
//         return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
//             headers: {Authorization: `Bearer ${accessToken}`}
//         })
//         .then(response => {
//             return response.json();
//         })
//         .then(jsonResponse =>{
//             if(!jsonResponse.tracks){
//                 return [];
//             }
//             return jsonResponse.tracks.items.map(tracks =>({
//                 id: tracks.id,
//                 name: tracks.name,
//                 artist: tracks.artist[0].name,
//                 album: tracks.name,
//                 uri: tracks.uri
//             }));
//         });
//     }
// }


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
    }
};

export default Spotify;
