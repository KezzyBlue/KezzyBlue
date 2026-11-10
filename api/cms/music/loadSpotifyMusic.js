import supabase from "./database/supabase.js";

export default async function loadSpotifyMusic(req, res) {
    const { data: albums } = await supabase
        .from("music_favourite_albums")
        .select("*");

    const {data: artists} = await supabase
        .from("music_favourite_artists")
        .select("*");
    
    const {data: tracks} = await supabase
        .from("music_favourite_tracks")
        .select("*");

    const {data: playlists} = await supabase
        .from("music_my_playlists")
        .select("*");

    const music = {
        favourite_albums : albums,
        favourite_artists: artists,
        favourite_tracks: tracks,
        my_playlists: playlists
    };



    return res.status(200).json(music ?? []);
}