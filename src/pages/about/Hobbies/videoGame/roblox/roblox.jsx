import { useEffect, useState } from 'react';
import { fetchPlayer } from '../../../../../api/roblox/player.js';

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

    return (
        <div className = "robloxContainer">
            <p> Username: {data?.name || 'Loading...'} </p>
        </div>
    );
}
export default Roblox;