import { useState, useEffect, useRef } from "react";

export default function useTimer() {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    const start = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        }
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const reset = () => {
        stop();
        setSeconds(0);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return { seconds, start, stop, reset };
}