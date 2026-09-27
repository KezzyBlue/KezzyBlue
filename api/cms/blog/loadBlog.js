import supabase from "./database/supabase.js";

export default async function handler(req, res) {
    const { search } = req.query;

    if(!search){
        const {data, error} = await supabase
            .from("blogs")
            .select("*");
        return res.json(data);
    }

}