import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PlayArrowIcon } from "../lib/Icons";
import Navbar from "./MuiNavbar";
import VideoPlayer from "../components/VideoPlayer";

export default function DashBoard() {
    const [video, setVideo] = useState('');
    const [playing, setPlaying] = useState(false);

    const handleChange = (e) => {
        const url = e.target.value.trim();
        if (url.startsWith('http')) {
            setVideo(url);
            setPlaying(false);
        } else {
            // Handle invalid URL
            console.error('Invalid video URL');
        }
    };

    const handleTogglePlay = () => setPlaying(prev => !prev);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen 
            bg-gradient-to-br from-blue-200 via-white to-purple-300 px-2">
                <div className="bg-white/80 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col mt-16 items-center w-full max-w-2xl">
                    <h1 className="font-bold text-gray-900 text-2xl sm:text-4xl mb-2 sm:mb-4 text-center drop-shadow">
                        Try Out Your Videos in the Browser
                    </h1>
                    <h3 className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-8 text-center">
                        Paste your video URL and check how it plays—simple, fast, and free.
                    </h3>
                    <div className="flex flex-col sm:flex-row w-full gap-2 mb-4 sm:mb-6">
                        <input
                            type="url"
                            value={video}
                            onChange={handleChange}
                            placeholder="Paste video url here..."
                            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-blue-400 
                            transition text-sm sm:text-base"
                        />
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<PlayArrowIcon />}
                            onClick={handleTogglePlay}
                            disabled={!video}
                            sx={{
                                borderRadius: '10px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            Play
                        </Button>
                    </div>
                    <div className="w-full flex justify-center">
                        <VideoPlayer
                            video={video}
                            playing={playing}
                            onTogglePlay={handleTogglePlay}
                            setPlaying={setPlaying}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}