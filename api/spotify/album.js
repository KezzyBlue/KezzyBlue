import { getSpotifyAccessToken } from './token.js';

export default async function handler(req, res) {
    const accessToken = await getSpotifyAccessToken();

    const {albumId} = req.query;

    const albumResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        }
    );

    const artist = await albumResponse.json();

    return res.status(200).json(artist);
}