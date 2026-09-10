import dotenv from 'dotenv';

dotenv.config();

let cachedToken = null;
let tokenExpiresAt = 0;
let tokenRequest = null;

async function requestAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Spotify credentials are not configured');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' })
    });

    if (!response.ok) {
        throw new Error(`Spotify token request failed with status ${response.status}`);
    }

    const data = await response.json();
    const expiresIn = Number(data.expires_in);

    if (!data.access_token || !Number.isFinite(expiresIn)) {
        throw new Error('Spotify returned an invalid access token');
    }

    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + Math.max(expiresIn - 60, 1) * 1000;

    return cachedToken;
}

export function getSpotifyAccessToken() {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return Promise.resolve(cachedToken);
    }

    if (!tokenRequest) {
        tokenRequest = requestAccessToken().finally(() => {
            tokenRequest = null;
        });
    }

    return tokenRequest;
}