import { Tooltip } from "@mui/material";
import {
    VolumeUpIcon, VolumeOffIcon,
    IconButton, CastIcon, FullscreenIcon,
    PauseIcon, PlayArrowIcon,
    FastForwardIcon, FastRewindIcon, SettingsIcon, HdIcon
} from "../lib/Icons";

export default function VolumeContorls({
    volume,
    muted,
    onMute,
    onVolume,
    playing,
    onTogglePlay,
    onForward,
    onBackward,
    onFullscreen,
}) {
    const handleKeyDown = (e) => {
        if (e.code === "Space" || e.key === " ") {
            e.preventDefault();
            onTogglePlay();
        }
    };
    return (
        <div className="flex items-center gap-1 text-4xl" tabIndex={0} onKeyDown={handleKeyDown}>
            <IconButton onClick={onMute} sx={{ color: "white" }}>
                {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>

            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={onVolume}
                className="w-16 sm:w-20 accent-blue-400"
            />
            <Tooltip title="Rewind 10s" placement="top">
                <IconButton onClick={onBackward} sx={{ color: "white" }}>
                    <FastRewindIcon />
                </IconButton>
            </Tooltip>
            <IconButton onClick={onTogglePlay} sx={{ color: "white" }}>
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Tooltip title="Forward 10s" placement="top">
                <IconButton onClick={onForward} sx={{ color: "white" }}>
                    <FastForwardIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Setting" placement="top">
                <IconButton sx={{ color: "white" }}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Quality" placement="top">
                <IconButton sx={{ color: "white" }}>
                    <HdIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Cast" placement="top">
                <IconButton
                    sx={{ color: "white" }}
                >
                    <CastIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Full Screen" placement="top">
                <IconButton onClick={onFullscreen} sx={{ color: "white" }}>
                    <FullscreenIcon />
                </IconButton>
            </Tooltip>

        </div>
    );
}
