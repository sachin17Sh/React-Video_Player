import { useState, useRef } from "react";
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReactPlayer from "react-player";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import IconButton from '@mui/material/IconButton';
import CastIcon from '@mui/icons-material/Cast';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import Navbar from "./MuiNavbar";


export default function DashBoard() {
    const [video, setVideo] = useState('');
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8)
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const clickTimer = useRef(null);


    const handleChange = (e) => {
        setVideo(e.target.value);
        setPlaying(false);
    };
    const handlePlay = () => {
        if (video) {
            setPlaying(true);
        }
    };

    const handleMute = () => {
        setMuted(m => !m)
    }
    const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));
    const handleFullScreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };
    const handleBackwardDoubleClick = () => {
        if (playerRef.current) {
            const current = playerRef.current.getCurrentTime()
            playerRef.current.seekTo(current - 10, "seconds")

        }
    }
    const handleDoubleForwardClick = () => {
        if (playerRef.current) {
            const current = playerRef.current.getCurrentTime()
            playerRef.current.seekTo(current + 10, "seconds")

        }
    }


    const handleOverlayClick = (e) => {

        if (e.detail === 2) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX < rect.width / 2) {
                handleBackwardDoubleClick();
            } else {
                handleDoubleForwardClick();
            }
        } else {
            clickTimer.current = setTimeout(() => {
                setPlaying(prev => !prev);
                clickTimer.current = null;
            }, 200);
        }
    };


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br
             from-blue-200 via-white to-purple-300">
                <div className="bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center  max-w-xxl">
                    <h1 className="font-bold text-gray-900 text-4xl mb-4 text-center drop-shadow">
                        Try Out Your Videos in the Browser
                    </h1>
                    <h3 className="text-lg text-gray-600 mb-8 text-center">
                        Paste your video URL and check how it plays—simple, fast, and free.
                    </h3>
                    <div className="flex w-full gap-2 mb-6">
                        <input
                            type="url"
                            value={video}
                            onChange={handleChange}
                            placeholder="Paste video url here..."
                            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <Button
                            variant="contained"
                            color="info"
                            endIcon={<PlayArrowIcon />}
                            onClick={handlePlay}
                            disabled={!video}
                            sx={{
                                borderRadius: '10px 10px 10px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}
                        >
                            Play
                        </Button>
                    </div>
                    <div className="w-full flex justify-center">
                        {video && (
                            <div
                                ref={containerRef}
                                className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 bg-black"
                                style={{ width: 620, height: 340 }}
                            >
                                <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 bg-black">
                                    <ReactPlayer
                                        ref={playerRef}
                                        url={video}
                                        playing={playing}
                                        controls
                                        width="100%"
                                        height="100%"
                                        muted={muted}
                                        volume={volume}
                                    />
                                    <div
                                        className="absolute inset-0 cursor-pointer"
                                        style={{ zIndex: 2 }}
                                        onClick={handleOverlayClick}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-2 flex flex-col gap-2 z-10">
                                    <div className="flex items-center gap-2">
                                        <IconButton onClick={handleMute} sx={{ color: "white" }}>
                                            {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                        </IconButton>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className="w-20 accent-blue-400"
                                            title="Volume"
                                        />
                                        <IconButton sx={{ color: "white" }}>
                                            <CastIcon />
                                        </IconButton>
                                        <IconButton onClick={handleFullScreen} sx={{ color: "white" }}>
                                            <FullscreenIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}