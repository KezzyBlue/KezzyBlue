import { useState } from "react";
import HanoiTower from "../../components/visualizer/hanoiTower/HanoiTower";
import Dijkstra from "../../components/visualizer/dijkstra/Dijkstra.jsx";
import './Visualizer.css';
import { Info } from "lucide-react";


function Visualizer()
{
    const [visual, setVisual] = useState(null);

    function difficulty(rating)
    {
        return (
            <span className = "rating">
                {
                    [1, 2, 3, 4, 5].map((star) => (
                        <span key = {star} className = {`star ${star <= rating ? 'starActive' : ''}`}> ★ </span>
                    ))
                }
            </span>  
        );
    }

    function toggleVisual(event)
    {
        if(visual === event) setVisual(null);
        else
            setVisual(event);
    }

    return (
        <div className = "visualizerContainer">
            <div className = "visualizer">
                <div className = "visualTab"  onClick = {() => toggleVisual("TowerOfHanoi")}>
                    <div className = "visualizerTitle">
                        <h1> Tower of Hanoi</h1>
                        <div> Difficulty: 
                            {
                                difficulty(1)
                            }
                        </div>
                    </div>
                    <Info/>
                </div>
                {
                    visual == "TowerOfHanoi" ? (<HanoiTower/>) : (<></>)
                }
            </div>
            {/* <div className = "visualizer">
                <Dijkstra/>
            </div> */}
        </div>
    
    );
}
export default Visualizer;