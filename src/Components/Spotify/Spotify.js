class Spotify {
    constructor() {
        this.codeVerifier = this.generateRandomString(128);
        this.getCodeChallenge().then(challenge => {
            this.codeChallenge = challenge;
            this.initializeAuthorization();
        });
    }

    generateRandomString(length) {
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return Array.from(values).map(x => possible[x % possible.length]).join("");
    }
    
    async sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }
    
    base64encode(input) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    async getCodeChallenge() {
        const hashed = await this.sha256(this.codeVerifier);
        return this.base64encode(hashed);
    }

    initializeAuthorization() {
        if (!this.accessToken && !window.location.href.includes('access_token')) {
            this.redirectToSpotifyAuthorization();
        }
        // Else, you might want to handle extracting the access token from the URL here.
    }
  
    redirectToSpotifyAuthorization() {
        const clientId = '2a0b257ce8ec4d0ca3605005b22549fd'; 
        const redirectUri = 'http://localhost:12';
        const scope = 'user-read-private user-read-email'; // Adjust scopes as needed

        const authUrl = new URL("https://accounts.spotify.com/authorize");

        // Save the codeVerifier in localStorage for later use
        window.localStorage.setItem('code_verifier', this.codeVerifier);

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: this.codeChallenge,
            redirect_uri: redirectUri,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    async getAccessToken() {
        if (this.accessToken) {
            return this.accessToken;
        }

        // Extracting the code from URL
        const codeMatch = window.location.href.match(/code=([^&]*)/);
        if (!codeMatch) {
            console.error('Authorization code not found in URL');
            return;
        }

        const code = codeMatch[1];

        // Retrieve the stored code verifier
        const codeVerifier = window.localStorage.getItem('code_verifier');
        if (!codeVerifier) {
            console.error('Code verifier not found in localStorage');
            return;
        }

        const clientId = '2a0b257ce8ec4d0ca3605005b22549fd';
        const redirectUri = 'http://localhost:12';

        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        };

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', payload);
            const data = await response.json();

            if (data.access_token) {
                this.accessToken = data.access_token;
                localStorage.setItem('access_token', this.accessToken);

                // Optionally handle refresh token and expiration time
                // ...

                // Clear the URL parameters
                window.history.pushState('Access Token', null, '/');
            } else {
                console.error('Failed to retrieve access token');
            }
        } catch (error) {
            console.error('Error fetching access token', error);
        }
    }


    // Other methods for API requests would/will go here
}

export default Spotify;
  