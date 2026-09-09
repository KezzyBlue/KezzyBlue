export async function getTrack(trackId) {
    const response = await fetch(`/api/spotify/track?trackId=${encodeURIComponent(trackId)}`);
    const data = await response.json();

    return data;
}

export async function getAlbum(albumId) {
    const response = await fetch(`/api/spotify/album?albumId=${encodeURIComponent(albumId)}`);
    const data = await response.json();
    return data;
}

export async function getArtist(artistId) {
    const response = await fetch(`/api/spotify/artist?artistId=${encodeURIComponent(artistId)}`);
    const data = await response.json();

    return data;
}

export async function getPlaylist(playlistId) {
    const response = await fetch(`/api/spotify/playlist?playlistId=${encodeURIComponent(playlistId)}`);
    const data = await response.json();
    console.log(data);

    return data;
}