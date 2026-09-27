import supabase from "./database/supabase.js";
export default async function handler(req, res) {
    const {data, error} = await supabase
        .from('diaries')
        .select('*');

    if (error) {
        console.error("Load diary error:", error);
        return res.status(500).json({ error: "Failed to load diary entries" });
    }

    return res.status(200).json(data ?? []);
}