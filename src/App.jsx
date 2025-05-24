import { useEffect } from "react";
import "./App.css"
import DashBoard from "./layout/MainDashBoard"
import CastProvider from 'react-chromecast';
export default function App() {
  useEffect(() => {
    window.__onGCastApiAvailable = function (isAvailable) {
      if (isAvailable) {
        console.log("Cast API available");
        const context = cast.framework.CastContext.getInstance();
        context.setOptions({
          receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
      }
    };
  }, []);
  return (
    <CastProvider >
      <DashBoard />
    </CastProvider>
  )
}
