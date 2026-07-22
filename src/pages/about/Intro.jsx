function Intro()
    {
        return (
            <>
                <div className = "box">
                    <h1> 🌠 About Me </h1>
                    <p> Hi! I'm KezzyBlue_VN, a nobody {((new Date()).getFullYear()) - 2008}-year-old developer from Vietnam. </p>
                    <p> I enjoy building web applications, solving algorithmic problems, and exploring anything related to computer science. </p>
                    <br/>
                    <p> Currently I'm focusing on: </p>
                    <ul> 
                        <li> Both Backend and Frontend Development. </li>
                        <li> 2000+ rating codeforces. </li>
                        <li> Learning new technologies every day </li>
                    </ul>
                    <br/>
                    <p> My goal is simple: </p>
                    <p> Keep learning, keep building, and eventually create projects that millions of people can use.</p>
                </div>
                <div className = "flex">
                    <div className = "box s1">
                        <h1> 🚀 What I'm doing now? </h1>
                        <h3> 📚 Learning</h3>
                        <ul>
                            <li> React • TypeScript • Next.js • Node.js </li>
                            <li> English </li>
                        </ul>
                        <h3> 💻 Coding </h3>
                        <ul>
                            <li> Personal Website </li>

                        </ul>
                        <h3> 🧠 Practicing </h3>
                        <ul>
                            <li> Competitive Programming </li>
                            <li> Data Structures and Algorithms </li>
                        </ul>
                    </div>
                    <div className = "box s2"> 
                        <h1> 📊 Fun Facts </h1>
                        <ul>
                            <li> 🎂 Born: 2008 </li>
                            <li> 🌏 Vietnam </li>
                            <li> 💻 Favorite Language: C++ </li>
                            <li> ⚛ Favorite Framework: React </li>
                            <li> 🎮 Minecraft automation lover </li>
                            <li> 🌌 Milky Way photography enthusiast </li>
                            <li> ☕ Coffee {'>'} Energy Drink </li>
                        </ul>
                    </div>
                </div>
                <div className = "box"> 
                    <h1> 💬 Quote </h1>
                    <ul>
                        <li> <h3> If I don't know it, I'll learn it. </h3> </li>
                    </ul>
                </div>
            </>
        );
    }
export default Intro;