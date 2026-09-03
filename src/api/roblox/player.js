export async function fetchPlayer(userId) {
    const response = await fetch(
        `/api/roblox/player?userId=${encodeURIComponent(userId)}`,
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch Roblox player');
    }

    console.log(data);

    return data;
}