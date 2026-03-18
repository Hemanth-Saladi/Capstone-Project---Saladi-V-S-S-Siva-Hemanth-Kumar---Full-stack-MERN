import { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function WorkoutTracker() {
    const [sets, setSets] = useState(0);
    const { seconds, start, stop, reset } = useTimer();

    return (
        <div className="card shadow p-3 mb-4">

            <h3 className="text-center mb-3">Workout Tracker</h3>

            <div className="text-center">

                <h5>Sets Completed</h5>
                <h2>{sets}</h2>

                <button
                    className="btn btn-success"
                    onClick={() => setSets(sets + 1)}
                >
                    Complete Set
                </button>

            </div>

            <hr />

            <div className="text-center">

                <h5>Rest Timer</h5>
                <h2 className="timer-text">{seconds}s</h2>

                <button className="btn btn-primary" onClick={start}>
                    Start
                </button>

                <button className="btn btn-warning" onClick={stop}>
                    Stop
                </button>

                <button className="btn btn-danger" onClick={reset}>
                    Reset
                </button>

            </div>

        </div>
    );
}