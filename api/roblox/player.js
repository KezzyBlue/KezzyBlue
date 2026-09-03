const fetchRoblox = async (url) => {
    const response = await fetch(url);
    let data;

    try {
        data = await response.json();
    } catch {
        data = undefined;
    }

    if (!response.ok) {
        const error = new Error('Roblox API request failed');
        error.status = response.status;
        throw error;
    }

    return data;
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { userId } = req.query;

    if (typeof userId !== 'string' || !/^\d+$/.test(userId)) {
        res.status(400).json({ error: 'userId must be a numeric string' });
        return;
    }

    try {
        const playerUrl = `https://users.roblox.com/v1/users/${userId}`;
        const avatarUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`;
        const favouriteUrl = `https://games.roblox.com/v2/users/${userId}/favorite/games?sortOrder=Desc&limit=10`;

        const [playerData, playerAvatar, favouriteData] = await Promise.all([
            fetchRoblox(playerUrl),
            fetchRoblox(avatarUrl),
            fetchRoblox(favouriteUrl),
        ]);

        const games = favouriteData?.data || [];
        const gameIds = games.map((game) => game?.id).filter(Boolean);
        const icons = gameIds.length > 0
            ? await fetchRoblox(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${gameIds.join(',')}&size=512x512&format=Png&isCircular=false`)
            : { data: [] };
        const iconById = new Map(
            (icons?.data || []).map((icon) => [icon?.targetId, icon?.imageUrl]),
        );

        res.status(200).json({
            id: playerData?.id,
            name: playerData?.name,
            displayName: playerData?.displayName,
            created: playerData?.created,
            description: playerData?.description,
            avatar: playerAvatar?.data?.[0]?.imageUrl,
            favourite: games.map((game) => ({
                id: game?.id,
                name: game?.name,
                placeVisits: game?.placeVisits,
                avatar: iconById.get(game?.id),
            })),
        });
    } catch (error) {
        console.error('Roblox player request failed:', error);
        res.status(error?.status || 500).json({
            error: error?.status
                ? 'Roblox API request failed'
                : 'Internal server error',
        });
    }
}