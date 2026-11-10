export async function loadMusic() {
    const response = await fetch("/api/cms/music/loadSpotifyMusic.js");
    const data = await response.json();
    return data;
}