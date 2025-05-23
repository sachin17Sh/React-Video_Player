const thumbnailCache = new Map();
export const generateThumbnails = async (videoUrl, duration, interval = 10) => {
  if (!videoUrl || !duration) throw new Error("Invalid parameters");

  const cacheKey = `${videoUrl}-${duration}-${interval}`;
  if (thumbnailCache.has(cacheKey)) {
    return thumbnailCache.get(cacheKey);
  }

  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.preload = "auto";
  video.src = videoUrl;

  await new Promise((resolve, reject) => {
    video.addEventListener("loadedmetadata", resolve, { once: true });
    video.addEventListener("error", reject, { once: true });
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 120;
  canvas.height = 68;

  const captureFrameAt = (time, video) => {
    return new Promise((resolve, reject) => {
      video.currentTime = time;
      const onSeeked = () => {
        try {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL("image/jpeg", 0.7);
          resolve({ time, image });
        } catch (err) {
          reject(err);
        }
      };
      video.addEventListener("seeked", onSeeked, { once: true });
      video.addEventListener("error", (e) => reject(e), { once: true });
    });
  };

  const times = [0];
  const maxThumbnails = 20;
  const adjustedInterval = Math.max(interval, duration / (maxThumbnails - 1));
  for (let t = adjustedInterval; t < duration; t += adjustedInterval) {
    times.push(t);
  }
  if (times.length > maxThumbnails) {
    times.length = maxThumbnails;
  }

  const thumbnails = [];
  const initialTimes = times.slice(0, 6);
  for (const time of initialTimes) {
    try {
      const thumbnail = await captureFrameAt(time, video);
      thumbnails.push(thumbnail);
    } catch (err) {
      console.error(`Failed to capture thumbnail at ${time}:`, err);
    }
  }

  setTimeout(async () => {
    const remainingTimes = times.slice(6);
    for (const time of remainingTimes) {
      try {
        const thumbnail = await captureFrameAt(time, video);
        thumbnails.push(thumbnail);
        thumbnailCache.set(cacheKey, [...thumbnails]);
      } catch (err) {
        console.error(`Failed to capture thumbnail at ${time}:`, err);
      }
    }
  }, 0);

  thumbnailCache.set(cacheKey, thumbnails);
  return thumbnails;
};
