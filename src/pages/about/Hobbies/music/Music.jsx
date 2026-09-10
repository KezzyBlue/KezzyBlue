import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Disc3,
    Headphones,
    LoaderCircle,
    Music2,
    Radio,
    Users,
} from "lucide-react";
import { getTrack, getAlbum, getArtist, getPlaylist } from "../../../../api/spotify/spotify.js";
import './Music.css';
import { useEffect, useState } from "react";

const favouriteTracks = [
    '1yo967mk7CpjvruNxBecOY',
    '4jee49YwJGT8HAPxBF6jcx',
    '6yLbighkE0kn1OH9zd4aBi',
    '7zoC3uP4Ngs3bLFrEobSTl',
    '0ON38MgDpAMcRC9ULx7NOf',
    '36JZa2LFSw6dEVUZO7a8wl'
];

const favouriteArtists = [
    '0V2DfUrZvBuUReS1LFo5ZI',
    '1oD9fKbb7qQ2nhn9JJC24F',
    '3Myoe574gxIKLU5bKqjkFk',
    '5dfZ5uSmzR7VQK0udbAVpf',
    '5xY6E5PMZNtz9jDvxTRiGI'
];

const favouriteAlbums = [
    '1ZnJrvDY8ih3ppPWR2Tc2a',
    '5ER34Rd6OkCwXBD7SOMB97',
    '4WSRrfRR3G8eAyZuBpWQ7H',
    '5jDZKqgoVRbob6A3omYTG5'
];

const myPlaylists = [
    '6VOEgYvAbCvh6uyYPrqe6Y',
    '26O6CD0Ufg3t0QW5LMG0Rq'
];

const imageOf = (item) => item?.images?.[0]?.url;
const artistNames = (artists = []) => artists.map((artist) => artist.name).join(', ');

function SpotifyLink({ href, children }) {
    if (!href) return children;

    return (
        <a href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
}

function Artwork({ src, alt, fallback = <Music2 size={30} aria-hidden="true" /> }) {
    return src ? <img src={src} alt={alt} loading="lazy" /> : <span className="music-artworkFallback">{fallback}</span>;
}

function Music() {
    const [catalog, setCatalog] = useState({ tracks: [], artists: [], albums: [], playlists: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadMusic() {
            const [tracks, artists, albums, playlists] = await Promise.all([
                Promise.all(favouriteTracks.map(getTrack)),
                Promise.all(favouriteArtists.map(getArtist)),
                Promise.all(favouriteAlbums.map(getAlbum)),
                Promise.all(myPlaylists.map(getPlaylist)),
            ]);

            if (active) setCatalog({ tracks, artists, albums, playlists });
        }

        loadMusic()
            .catch(() => {
                if (active) setError('Spotify is taking a little longer than usual. Please refresh and try again.');
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, []);

    const featuredTrack = catalog.tracks[0];

    return (
        <div className="hobby-musicPage hobbySubpage">
            <Link to=".." className="comebackButton">
                <ArrowLeft aria-hidden="true" size={18} />
                Click here to back
            </Link>
            <div className="hobby-musiccontainer">
                <header className="hobbySubpageHeader hobby-musicHeader">
                    <div className="hobbySubpageHeading">
                        <span className="hobbySubpageIcon"><Headphones aria-hidden="true" /></span>
                        <div>
                            <p className="hobbySubpageKicker">A personal soundtrack</p>
                            <h1 className="hobbySubpageTitle">Music</h1>
                        </div>
                    </div>
                    <p className="hobbySubpageDescription music-intro">Press play. Escape reality.</p>
                </header>
                <div className="hobbySubpageRule" />

                {loading && <div className="music-status"><LoaderCircle className="music-spinner" size={22} /> Tuning into Spotify...</div>}
                {error && <div className="music-status music-statusError">{error}</div>}

                {!loading && !error && (
                    <>
                        {featuredTrack && (
                            <section className="music-featured" aria-labelledby="featured-title">
                                <Artwork src={imageOf(featuredTrack.album)} alt={`${featuredTrack.album.name} cover`} />
                                <div className="music-featuredContent">
                                    <p className="music-kicker">On repeat</p>
                                    <h2 id="featured-title">{featuredTrack.name}</h2>
                                    <p className="music-featuredArtist">{artistNames(featuredTrack.artists)}</p>
                                    <SpotifyLink href={featuredTrack.external_urls?.spotify}>
                                        <span className="music-listenButton"><Radio size={17} /> Listen on Spotify</span>
                                    </SpotifyLink>
                                </div>
                                <Disc3 className="music-record" size={170} aria-hidden="true" />
                            </section>
                        )}

                        <MusicSection icon={<Music2 size={19} />} title="Favourite tracks" count={catalog.tracks.length}>
                            <div className="music-trackList">
                                {catalog.tracks.map((track, index) => (
                                    <SpotifyLink key={track.id} href={track.external_urls?.spotify}>
                                        <article className="music-trackItem">
                                            <span className="music-trackNumber">{String(index + 1).padStart(2, '0')}</span>
                                            <Artwork src={imageOf(track.album)} alt="" />
                                            <span className="music-itemText"><strong>{track.name}</strong><small>{artistNames(track.artists)}</small></span>
                                        </article>
                                    </SpotifyLink>
                                ))}
                            </div>
                        </MusicSection>

                        <div className="music-columns">
                            <MusicSection icon={<Disc3 size={19} />} title="Favourite albums" count={catalog.albums.length}>
                                <div className="music-cardGrid">
                                    {catalog.albums.map((album) => <SpotifyLink key={album.id} href={album.external_urls?.spotify}>
                                        <article className="music-card"><Artwork src={imageOf(album)} alt={`${album.name} cover`} /><strong>{album.name}</strong><small>{artistNames(album.artists)}</small></article>
                                    </SpotifyLink>)}
                                </div>
                            </MusicSection>
                            <MusicSection icon={<Users size={19} />} title="Favourite artists" count={catalog.artists.length}>
                                <div className="music-cardGrid music-artistGrid">
                                    {catalog.artists.map((artist) => <SpotifyLink key={artist.id} href={artist.external_urls?.spotify}>
                                        <article className="music-card music-artistCard">
                                            <Artwork src={imageOf(artist)} alt={artist.name} fallback={<Users size={25} />} />
                                            <strong>
                                                {artist.name}
                                            </strong>
                                            <small>
                                                {artist.genres?.[0] || 'Artist'}
                                            </small>
                                        </article>
                                    </SpotifyLink>)}
                                </div>
                            </MusicSection>
                        </div>

                        <MusicSection icon={<Headphones size={19} />} title="My playlists" count={catalog.playlists.length}>
                            <div className="music-playlistGrid">
                                {catalog.playlists.map((playlist) => <SpotifyLink key={playlist.id} href={playlist.external_urls?.spotify}>
                                    <article className="music-playlist"><Artwork src={imageOf(playlist)} alt={`${playlist.name} cover`} /><span><strong>{playlist.name}</strong><small>{playlist.tracks?.total || 0} tracks</small></span></article>
                                </SpotifyLink>)}
                            </div>
                        </MusicSection>
                    </>
                )}

            </div>
        </div>
    );
}

function MusicSection({ icon, title, count, children }) {
    return <section className="music-section" aria-labelledby={`music-${title}`}>
        <div className="music-sectionHeading"><h2 id={`music-${title}`}>{icon}{title}</h2><span>{count}</span></div>
        {children}
    </section>;
}

export default Music;