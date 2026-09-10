import { getSpotifyAccessToken } from './token.js';

export default async function handler(req, res) {
    const accessToken = await getSpotifyAccessToken();

    const {trackId} = req.query;

    const trackResponse = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }
    );

    const track = await trackResponse.json();
    return res.status(200).json(track);
}