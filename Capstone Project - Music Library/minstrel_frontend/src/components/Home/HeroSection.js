import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import ColorThief from "color-thief-browser";

const HeroSection = () => {

    const { currentSong } = useContext(PlayerContext);

    const [gradient, setGradient] = useState(
        "linear-gradient(135deg,#1db954,#191414)"
    );

    useEffect(() => {

        if (!currentSong?.coverUrl) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = currentSong.coverUrl;

        img.onload = () => {

            const colorThief = new ColorThief();

            const [r, g, b] = colorThief.getColor(img);

            setGradient(
                `linear-gradient(135deg,rgb(${r},${g},${b}),#191414)`
            );

        };

    }, [currentSong]);

    return (

        <div
            className="hero"
            style={{ background: gradient }}
        >

            <div className="hero-overlay">

                <h1>Welcome to Minstrel</h1>

                <p>
                    Discover music and artists
                </p>

                {currentSong && (

                    <div className="hero-now-playing">

                        Now Playing: <b>{currentSong.title}</b>

                    </div>

                )}

            </div>

        </div>

    );

};

export default HeroSection;

