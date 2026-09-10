import { getSpotifyAccessToken } from './token.js';

export default async function handler(req, res) {
    const accessToken = await getSpotifyAccessToken();

    const {artistId} = req.query;

    const artistResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        }
    );

    const artist = await artistResponse.json();

    return res.status(200).json(artist);
}