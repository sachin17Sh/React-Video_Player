import { useState } from "react";
import { formatTime } from "../utlis/FormatTime"




export default function Seekbar({ played, duration, onSeek }) {
    const [previewTime, setPreviewTime] = useState(null);
    const [previewX, setPreviewX] = useState(0)

    const handleSeekBarMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();// method returns the size and position of an element relative to the viewport 
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * duration
        setPreviewTime(time);
        setPreviewX(e.clientX - rect.left)
    }

    const handleSeekBarMouseLeave = () => {
        setPreviewTime(null)
    }

    
    return (
        <div>
            <div className="relative w-full">
                {previewTime !== null && (
                    <div style={{
                        position: "absolute",
                        left: `calc(${(previewX / 620) * 100}% - 30px)`,
                        bottom: "28px",
                        background: "rgba(30,30,30,0.95)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        minWidth: "48px",
                        textAlign: "center",
                        zIndex: 1000,
                        pointerEvents: 'none'
                    }}>
                        <img
                            src="#"
                            alt="preview"
                            style={{ width: 80, height: 45, borderRadius: 4, marginBottom: 4 }}
                        />
                        {formatTime(previewTime)}
                    </div>
                )}
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.001}
                    value={played}
                    onChange={onSeek}
                    className="w-full accent-blue-400"
                    title="Seek"
                    onMouseMove={handleSeekBarMouseMove}
                    onMouseLeave={handleSeekBarMouseLeave}
                />
            </div>
        </div>
    )
}
