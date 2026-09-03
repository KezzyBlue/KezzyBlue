import { useEffect, useState } from 'react';
import { fetchPlayer } from '../../../../../api/roblox/player.js';
import './roblox.css';

function Roblox()
{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlayer(3998651960)
            .then(setData)
            .catch((requestError) => {
                console.error(requestError);
                setError(requestError.message);
            });
    }, []);

    if (error) return <p>Unable to load Roblox data: {error}</p>;
    if (!data) return <h1>Loading...</h1>;

    const joinedDate = data.created
        ? new Date(data.created).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : 'Unknown';
    const favouriteGames = data.favourite || [];

    return (
        <section className="robloxProfile" aria-label="Roblox profile">
            <div className="robloxProfileHeader">
                <div className="robloxIdentity">
                    <div className="robloxAvatarFrame">
                        <img
                            src={data.avatar}
                            alt={`${data.displayName || data.name} avatar`}
                            className="robloxAvatar"
                        />
                        <span className="robloxOnlineDot" aria-label="Roblox profile loaded" />
                    </div>
                    <div className="robloxIdentityText">    
                        <h1>{data.displayName || data.name || 'Unknown player'}</h1>
                        <p className="robloxUsername">@{data.name || 'unknown'}</p>
                    </div>
                </div>
                <div className="robloxJoined">
                    <span>Member since</span>
                    <strong>{joinedDate}</strong>
                </div>
            </div>

            <div className="robloxProfileBody">
                <div className="robloxAbout">
                    <span className="robloxSectionLabel">About</span>
                    <p>{data.description || 'This player has not added a description yet.'}</p>
                </div>

                <div className="robloxFavouriteSection">
                    <div className="robloxSectionHeading">
                        <div>
                            <span className="robloxSectionLabel">Currently playing</span>
                            <h2>Favourite experiences</h2>
                        </div>
                        <span className="robloxGameCount">{favouriteGames.length} games</span>
                    </div>
                    {favouriteGames.length > 0 ? (
                        <div className="robloxGameGrid">
                            {favouriteGames.map((game) => (
                                <article className="robloxGame" key={game.id}>
                                    {game.avatar ? (
                                        <img src={game.avatar} alt="" className="robloxGameAvatar" />
                                    ) : (
                                        <div className="robloxGameAvatar robloxGameAvatarFallback" aria-hidden="true">?</div>
                                    )}
                                    <div className="robloxGameDetails">
                                        <h3>{game.name || 'Unknown experience'}</h3>
                                        <p>{Number(game.placeVisits || 0).toLocaleString('en-US')} visits</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="robloxEmptyState">No favourite experiences found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
export default Roblox;