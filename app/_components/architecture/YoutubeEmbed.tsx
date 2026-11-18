"use client";

import { ReactElement, useState } from "react";

/**
 * Let the user click on play to load the iframe with the youtube video.
 */
export function YouTubeEmbed(): ReactElement {
    const [play, setPlay] = useState<boolean>(false);

    return (
        <>
            {play ? (
                <iframe 
                    width="1120" 
                    height="630" 
                    src="https://www.youtube-nocookie.com/embed/PwZEBE66an0?si=vpFN433xh8l4Dptt" 
                    title="NES Hacker's NES architecture video" 
                    className="architecture-video"
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen 
                />
            ) : (
                <button onClick={() => setPlay(true)} className="authButton">
                    Play video about NES architecture
                </button>
            )}
        </>
    );
}