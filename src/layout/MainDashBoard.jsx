import { useState, useRef } from "react";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";
import { VolumeUpIcon, PlayArrowIcon, VolumeOffIcon, IconButton, CastIcon, FullscreenIcon, PauseIcon, PlayCircleOutlineRoundedIcon, FastForwardIcon, FastRewindIcon } from "../lib/Icons"

import Navbar from "./MuiNavbar";



export default function DashBoard() {
    const [video, setVideo] = useState('');
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0)
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

    const handleSeekChange = (e) => {
        const seekTo = e.target.value
        setPlayed(seekTo)
        playerRef.current.seekTo(seekTo)
    }

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
            const duration = playerRef.current.getDuration();
            const newTime = current - 10
            playerRef.current.seekTo(newTime, "seconds")
            setPlayed(newTime / duration)
        }
    }

    const handleDoubleForwardClick = () => {
        if (playerRef.current) {
            const current = playerRef.current.getCurrentTime()
            const duration = playerRef.current.getDuration();
            const newTime = current + 10
            playerRef.current.seekTo(newTime, "seconds")
            setPlayed(newTime / duration)
        }
    }

    const handleOverlayClick = () => {
        clickTimer.current = setTimeout(() => {
            if (clickTimer.current) {
                setPlaying(prev => !prev);
            }
            clickTimer.current = null;
        }, 200);
    };
    const handleOverlayDoubleClick = (e) => {
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }
        setPlaying(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) {
            handleBackwardDoubleClick();
        } else {
            handleDoubleForwardClick();
        }
    };

    function formatTime(seconds) {
        seconds = Math.floor(seconds);
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
            return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        } else {
            return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen 
            bg-gradient-to-br from-blue-200 via-white to-purple-300 px-2">
                <div className="bg-white/80 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center w-full max-w-2xl">
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
                            onClick={handlePlay}
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
                        {video && (
                            <div
                                ref={containerRef}
                                className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 bg-black w-full "
                                style={{ width: 620, height: 340 }}
                            >
                                <div className="relative w-full h-full">
                                    <ReactPlayer
                                        ref={playerRef}
                                        url={video}
                                        playing={playing}
                                        controls={false}
                                        width="100%"
                                        height="100%"
                                        muted={muted}
                                        volume={volume}
                                        onProgress={({ played }) => setPlayed(played)}
                                        onDuration={setDuration}


                                    />
                                    <div
                                        className="absolute inset-0 cursor-pointer"
                                        style={{ zIndex: 2 }}
                                        onClick={handleOverlayClick}
                                        onDoubleClick={handleOverlayDoubleClick}
                                    />

                                </div>
                                <div className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-2 flex flex-col gap-2 z-10 ">
                                    <div className="flex justify-between text-xs text-white w-full px-1 mb-1">
                                        <span>{formatTime(played * duration)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.001}
                                        value={played}
                                        onChange={handleSeekChange}
                                        className="w-full accent-blue-400"
                                        title="Seek"
                                    />
                                    <div className="flex items-center gap-1 text-4xl">
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
                                            className="w-16 sm:w-20 accent-blue-400"
                                            title="Volume"
                                        />
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation();
                                            handleBackwardDoubleClick()
                                        }}
                                            sx={{ color: "white" }}>
                                            <FastRewindIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setPlaying(prev => !prev)} sx={{ color: "white" }}>
                                            {playing ? <PauseIcon /> : <PlayCircleOutlineRoundedIcon />}
                                        </IconButton>
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation();
                                            handleDoubleForwardClick();
                                        }} sx={{ color: "white" }}>
                                            <FastForwardIcon />
                                        </IconButton>
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