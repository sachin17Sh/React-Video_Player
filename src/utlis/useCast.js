import { useState, useEffect } from "react";

export function useCast(videoElementRef) {
    const [castAvailable, setCastAvailable] = useState(false);
    const [castInitialized, setCastInitialized] = useState(false);

    useEffect(() => {
        window['__onGCastApiAvailable'] = function (isAvailable) {
            if (isAvailable) {
                setCastAvailable(true);
                initializeCastApi();
            }
        };

        function initializeCastApi() {
            const context = cast.framework.CastContext.getInstance();
            context.setOptions({
                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
            });
            setCastInitialized(true);
        }
    }, []);

    const castMedia = () => {
        if (!videoElementRef?.current || !castInitialized) {
            console.warn("Cast not initialized or video ref missing.");
            return;
        }

        const internalPlayer = videoElementRef.current?.getInternalPlayer?.();

        const currentSrc = internalPlayer?.src || internalPlayer?.currentSrc;
        if (!currentSrc) {
            console.error("No video source found.");
            return;
        }

        const mediaInfo = new chrome.cast.media.MediaInfo(currentSrc, 'video/mp4');
        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
        mediaInfo.metadata.title = 'Video Title';

        const request = new chrome.cast.media.LoadRequest(mediaInfo);
        const context = cast.framework.CastContext.getInstance();
        const session = context.getCurrentSession();

        if (session) {
            session.loadMedia(request).then(
                () => console.log('Cast media request sent'),
                (errorCode) => console.error('Error casting media:', errorCode)
            );
        } else {
            context.requestSession().then(() => {
                const newSession = context.getCurrentSession();
                if (newSession) {
                    newSession.loadMedia(request).then(
                        () => console.log('Cast media request sent after session'),
                        (errorCode) => console.error('Error casting media after session:', errorCode)
                    );
                }
            }).catch((err) => {
                console.error("Failed to start cast session:", err);
            });
        }
    };

    return { castAvailable, castMedia };
}
