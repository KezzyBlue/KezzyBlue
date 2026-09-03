import './Valorant.css';
function Valorant() {
    return (
        <div className="tracker-container">
            <p className = "valorantNote"> The procedure to get Riot's API is really complicated and they don’t provide the API to individuals, so... 🤣 </p>
            <iframe
                src="https://tracker.gg/valorant/profile/riot/Ch%C3%A8%20kh%C3%B4ng%20n%E1%BB%8Bch%23Kezzy/overview?platform=pc&playlist=competitive&season=4f0864e2-40af-28a4-de2c-0e9e64e75f23"
                title="VALORANT Stats"
            />
        </div>
    );
}

export default Valorant;