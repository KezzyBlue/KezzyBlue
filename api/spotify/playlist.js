import { getSpotifyAccessToken } from './token.js';

export default async function handler(req, res) {
    const accessToken = await getSpotifyAccessToken();

    const {playlistId} = req.query;

    const playlistResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        }
    );

    const playlist = await playlistResponse.json();

    return res.status(200).json(playlist);
}