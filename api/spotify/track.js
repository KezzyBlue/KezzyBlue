import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials"
            })
        }
    );

    const data = await response.json();

    const {trackId} = req.query;

    const trackResponse = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
            headers : {
                Authorization : `Bearer ${data.access_token}`
            }
        }
    );

    const track = await trackResponse.json();
    return res.status(200).json(track);
}