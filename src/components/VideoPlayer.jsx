import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useCast } from 'react-chromecast';

import Seekbar from "./Seekbar";
import VolumeContorls from "./VolumeControls";
import { generateThumbnails } from "../utlis/Thumbnail";

export default function VideoPlayer({ video, playing, onTogglePlay, setPlaying }) {
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [thumbnails, setThumbnails] = useState([]);
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const clickTimer = useRef(null);
    const { cast, castState, session } = useCast();

       useEffect(() => {
        if (cast && session && video) {

            const mediaInfo = new window.chrome.cast.media.MediaInfo(video, 'video/mp4'); 
            const request = new window.chrome.cast.media.LoadRequest(mediaInfo);

            session.loadMedia(request).then(
                () => {
                    console.log('Media loaded on Chromecast');
                },
                (error) => {
                    console.error('Error loading media on Chromecast:', error);
                }
            );
        }
    }, [cast, session, video]);


    useEffect(() => {
        if (video && duration > 0) {
            generateThumbnails(video, duration)
                .then(setThumbnails)
                .catch(error => {
                    console.error('Thumbnail generation failed:', error);
                    setThumbnails([]);
                });
        }
    }, [video, duration]);

    const handleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    };

    const handleMute = () => {
        setMuted(m => !m)
    }

    const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

    const handleSeekChange = (e) => {
        if (duration > 0) {
            const seekTo = e.target.value;
            setPlayed(seekTo);
            playerRef.current.seekTo(parseFloat(seekTo));
        }
    };

    const handleBackwardDoubleClick = () => {
        if (playerRef.current) {
            const current = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            const newTime = Math.max(current - 10, 0);
            playerRef.current.seekTo(newTime, "seconds");
            setPlayed(newTime / duration);
        }
    };

    const handleDoubleForwardClick = () => {
        if (playerRef.current) {
            const current = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            const newTime = Math.min(current + 10, duration);
            playerRef.current.seekTo(newTime, "seconds");
            setPlayed(newTime / duration);
        }
    };

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
        const rect = e.currentTarget.getBoundingClientRect();// method returns the size and position of an element relative to the viewport 
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) {
            handleBackwardDoubleClick();
        } else {
            handleDoubleForwardClick();
        }
    };
    return (
        <>
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
                            onReady={() => console.log('Player ready')}
                            onProgress={({ played }) => setPlayed(Math.min(Math.max(played, 0), 1))}
                            onDuration={(dur) => {
                                // console.log('Duration updated:', dur);
                                setDuration(dur);
                            }}


                        />
                        <div
                            className="absolute inset-0 cursor-pointer"
                            style={{ zIndex: 2 }}
                            onClick={handleOverlayClick}
                            onDoubleClick={handleOverlayDoubleClick}
                        />

                    </div>
                    <div className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-2 flex flex-col gap-2 z-10 ">
                        <Seekbar
                            duration={duration}
                            played={played}
                            onSeek={handleSeekChange}
                            thumbnails={thumbnails}
                        />
                        <VolumeContorls
                            volume={volume}
                            muted={muted}
                            onMute={handleMute}
                            onVolume={handleVolumeChange}
                            playing={playing}
                            onTogglePlay={onTogglePlay}
                            onForward={handleDoubleForwardClick}
                            onBackward={handleBackwardDoubleClick}
                            onFullscreen={handleFullscreen}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
