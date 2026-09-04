import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Pause, Play, Plus, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { hanoiTower } from '../../../algorithms/hanoiTower.js';
import './HanoiTower.css';

const towerLabels = ['A', 'B', 'C'];

function HanoiTower() {
    const [diskCount, setDiskCount] = useState(4);
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(650);
    const moves = hanoiTower(diskCount);
    const totalSteps = moves.length;
    const towers = [Array.from({ length: diskCount }, (_, index) => diskCount - index), [], []];

    for (let index = 0; index < step; index += 1) {
        const { start, end } = moves[index];
        const disk = towers[start - 1].pop();

        if (disk !== undefined) {
            towers[end - 1].push(disk);
        }
    }

    useEffect(() => {
        if (!playing) return undefined;
        if (step >= totalSteps) return undefined;

        const timer = setTimeout(() => {
            setStep((currentStep) => currentStep + 1);
            if (step + 1 >= totalSteps) setPlaying(false);
        }, speed);
        return () => clearTimeout(timer);
    }, [playing, speed, step, totalSteps]);

    function changeDiskCount(nextCount) {
        setPlaying(false);
        setDiskCount(nextCount);
        setStep(0);
    }

    function reset() {
        setPlaying(false);
        setStep(0);
    }

    function togglePlaying() {
        if (step >= totalSteps) {
            setStep(0);
            setPlaying(true);
            return;
        }
        setPlaying((currentPlaying) => !currentPlaying);
    }

    function goToPreviousStep() {
        setPlaying(false);
        setStep((currentStep) => Math.max(0, currentStep - 1));
    }

    function goToNextStep() {
        setPlaying(false);
        setStep((currentStep) => Math.min(totalSteps, currentStep + 1));
    }

    const currentMove = step > 0 ? moves[step - 1] : null;

    return (
        <div className="hanoiTowerLayout">
            <header className="hanoiTowerHeader">
                <div className="hanoiTowerStatus">
                    <span className={`statusDot ${playing ? 'isPlaying' : ''}`} />
                    {playing ? 'Running' : step >= totalSteps ? 'Completed' : 'Paused'}
                </div>
            </header>

            <main className="hanoiTowerVisualizer">
                <section className="hanoiTowerBoard" aria-label="Tower of Hanoi visualization board">
                    <div className="boardTopline">
                        <span>CURRENT STATE</span>
                        <strong>Step {step} <small>/ {totalSteps}</small></strong>
                    </div>

                    <div className="towerGrid">
                        {towers.map((tower, towerIndex) => (
                            <div className="tower" key={towerLabels[towerIndex]}>
                                <div className="towerLabel">PEG {towerLabels[towerIndex]}</div>
                                <div className="towerStack">
                                    <div className="pole" />
                                    <div className="base" />
                                    <div className="disks">
                                        {tower.map((disk) => (
                                            <motion.div
                                                className="disk"
                                                key={disk}
                                                layout="position"
                                                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                                style={{ '--disk-size': `${34 + (disk / diskCount) * 58}%` }}
                                            >
                                                <span>{disk}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="hanoiTowerControl">
                    <div className="controlSection diskSettings">
                        <span className="controlLabel">NUMBER OF DISKS</span>
                        <div className="setDisk">
                            <button type="button" className="iconButton" onClick={() => changeDiskCount(Math.max(1, diskCount - 1))} disabled={diskCount === 1} aria-label="Decrease disks">
                                <Minus size={17} />
                            </button>
                            <strong className="totalDisk">{diskCount}</strong>
                            <button type="button" className="iconButton" onClick={() => changeDiskCount(Math.min(10, diskCount + 1))} disabled={diskCount === 10} aria-label="Increase disks">
                                <Plus size={17} />
                            </button>
                        </div>
                    </div>

                    <div className="hanoiTowerProcess">
                        <div className="calcStep">
                            <span>Time complexity</span>
                            <strong>O(2ⁿ)</strong>
                        </div>
                        <div className="calcStep">
                            <span>Minimum moves</span>
                            <strong>{totalSteps}</strong>
                        </div>
                    </div>

                    <div className="currentMove">
                        <span className="controlLabel">LATEST MOVE</span>
                        {currentMove ? (
                            <div className="moveRoute">
                                <strong>{towerLabels[currentMove.start - 1]}</strong>
                                <span>→</span>
                                <strong>{towerLabels[currentMove.end - 1]}</strong>
                            </div>
                        ) : <p>Start to see the first move</p>}
                    </div>

                    <div className="hanoiTowerButtonContainer">
                        <button type="button" className="controlButton" onClick={reset} aria-label="Reset"><RotateCcw size={18} /></button>
                        <button type="button" className="controlButton" onClick={goToPreviousStep} disabled={step === 0} aria-label="Previous step"><SkipBack size={18} /></button>
                        <button type="button" className="mainControlButton" onClick={togglePlaying} aria-label={playing ? 'Pause' : 'Play'}>
                            {playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}
                        </button>
                        <button type="button" className="controlButton" onClick={goToNextStep} disabled={step >= totalSteps} aria-label="Next step"><SkipForward size={18} /></button>
                    </div>

                    <label className="speedControl">
                        <span>SPEED</span>
                        <input type="range" min="150" max="1500" step="50" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
                        <strong>{speed}ms</strong>
                    </label>
                </aside>
            </main>
        </div>
    );
}

export default HanoiTower;
