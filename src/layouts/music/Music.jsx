import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Minimize, Disc3, Volume2, VolumeOff, List } from "lucide-react"
import axios from "axios";
import './Music.css';
import '../../styles/theme.css';
import { audio } from "framer-motion/client";

function Music() {
    const [songs, setSongs] = useState([]);
    const [originalSongs, setOriginalSongs] = useState([]);
    const [song, setSong] = useState(null);
    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSong, setCurrentSong] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const audioRef = useRef(null);
    const [minimized, setMinimized] = useState(true);
    const [showList, setShowList] = useState(false);
    const [volume, setVolume] = useState(1);
    const [activeVolume, setActiveVolume] = useState(false);
    const [long, setLong] = useState(17);
    const [shuffle, setShuffle] = useState(false);

    const fetchMusic = async () => {
        const data = await axios.get('/music/music.json');
        setSongs(data.data);
        setOriginalSongs(data.data);
        setSong(data.data[0]);
    }

    useEffect(() => {
        fetchMusic();
    }, []);

    useEffect(() => {
        if (!audioRef.current || !song || !play) return;
        audioRef.current.load();
        audioRef.current.play();
        setPlay(true);
    }, [song]);

    if (songs.length == 0 || song == null)
        return (<> Loadign... </>);

    function breakWord(text) {
        const maxLength = long;

        if (text.length <= maxLength) {
            return text;
        }

        return text.slice(0, maxLength - 2) + "...";
    }

    function playButton() {
        if (play == true) {
            return (<Pause className="musicIcon" />);
        }
        else {
            return (<Play className="musicIcon" />);
        }
    }

    function playMusic() {
        if (play)
            audioRef.current.pause();
        else
            audioRef.current.play();
        setPlay(prev => !prev);
    }

    function handleLoadedMetaData() {
        setDuration(audioRef.current.duration);
    }

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, "0")}`;
    }

    function handleSeek(e) {
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }

    function nextMusic() {
        const len = songs.length;
        setSong(songs[(currentSong + 1) % len]);
        setCurrentSong(prev => (prev + 1) % len);
    }

    function prevMusic() {
        const len = songs.length;
        setSong(songs[(currentSong - 1 + len) % len]);
        setCurrentSong(prev => (prev - 1 + len) % len);
    }
    function nextSong() {
        if (repeat) {
            setSong(songs[currentSong]);
            setCurrentTime(0);
            audioRef.current.play();
            return;
        }
        const len = songs.length;
        setSong(songs[(currentSong + 1) % len]);
        setCurrentSong(prev => (prev + 1) % len);
    }

    function repeatButton() {
        if (repeat)
            return (<Repeat1 className="musicIcon"></Repeat1>);
        else
            return (<Repeat className="musicIcon"></Repeat>);
    }

    function repeatMusic() {
        setRepeat(prev => !prev);
    }

    function selectSong(item, index) {
        setSong(item);
        setCurrentSong(index);
    }

    function handleVolume(e) {
        const value = Number(e.target.value);
        setVolume(value);
        audioRef.current.volume = value;
    }
    function toggleVolume() {
        setActiveVolume(prev => !prev);
        if (long == 17) setLong(7);
        else
            setLong(17);
    }

    function shuffleSongs() {
        const current = song;

        const shuffled = [...originalSongs];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }


        const currentIndex = shuffled.findIndex(
            item => item.src === current.src
        );

        [shuffled[0], shuffled[currentIndex]] =
            [shuffled[currentIndex], shuffled[0]];

        setSongs(shuffled);
        setCurrentSong(0);
    }

    function unshuffleSongs() {
        const current = song;

        const index = originalSongs.findIndex(
            item => item.src === current.src
        );

        setSongs(originalSongs);
        setCurrentSong(index);
    }

    function shuffleMusic() {
        if (!shuffle) {
            shuffleSongs();
        } else {
            unshuffleSongs();
        }

        setShuffle(prev => !prev);
    }

    return (
        <>
            <div className={`musicContainer ${minimized ? "minimize" : ""} ${play ? "playing" : ""}`}>
                <audio
                    src={song.src}
                    ref={audioRef}
                    onLoadedMetadata={handleLoadedMetaData}
                    onTimeUpdate={() => {
                        if (audioRef.current.currentTime <= duration)
                            setCurrentTime(audioRef.current.currentTime);
                    }
                    }
                    onEnded={nextSong}>
                </audio>
                {
                    minimized ? (
                        <button className="miniDisc" onClick={() => setMinimized(false)}>
                            <Disc3 className={`musicIcon miniDisc ${play ? "playing" : ""}`} />
                        </button>) : (
                        <div className="musicContent">
                            <div className="musicHeader">
                                <div className="musicLogo">
                                    <button className="disc">
                                        <Disc3 className={`musicIcon disc ${play ? "playing" : ""}`} />
                                    </button>

                                    <div className="musicInfo">
                                        {
                                            <>
                                                <p className="songName">
                                                    {breakWord(song.name)}
                                                </p>

                                                <p> {song.artist} </p>
                                            </>
                                        }
                                    </div>
                                </div>

                                <div className="musicExtension">
                                    <div className="volumeControl">
                                        <button onClick={() => toggleVolume()}>
                                            {volume === 0 ? (
                                                <VolumeOff className="musicIcon" />
                                            ) : (
                                                <Volume2 className="musicIcon" />
                                            )}
                                        </button>
                                        {
                                            activeVolume && (
                                                <input
                                                    type="range"
                                                    className="volumeSlider"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={volume}
                                                    onChange={handleVolume}
                                                ></input>
                                            )
                                        }
                                    </div>

                                    <button onClick={() => setShowList(prev => !prev)}> <List className="musicIcon" /> </button>
                                    <button onClick={() => setMinimized(true)}> <Minimize className="musicIcon" /></button>
                                </div>
                            </div>

                            <p className="musicDuration"> {formatTime(currentTime)} : {formatTime(duration)} </p>

                            <div className="musicDuration"> </div>

                            <input
                                type="range"
                                className="musicPB"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                            >

                            </input>

                            <div className="musicControl">
                                <button
                                    className={`shuffleButton ${shuffle ? "activeShuffle" : ""}`}
                                    onClick={shuffleMusic}
                                >
                                    <Shuffle className="musicIcon" />
                                </button>

                                <div className="mainControl">
                                    <button onClick={() => prevMusic()}> <SkipBack className="musicIcon" /> </button>
                                    <button onClick={() => playMusic()}> {playButton()} </button>
                                    <button onClick={() => nextMusic()} > <SkipForward className="musicIcon" /> </button>
                                </div>

                                <button onClick={() => repeatMusic()}> {repeatButton()} </button>
                            </div>
                            {
                                showList && (
                                    <div className="playList">
                                        {
                                            songs.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`playListItem ${item.src == song.src ? "activeSong" : ""}`}
                                                    onClick={() => selectSong(item, index)}
                                                >
                                                    <p className="songName"> {item.name}</p>
                                                    <p> {item.artist} </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </div>
        </>
    );
}
export default Music;