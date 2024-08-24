import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Rooms() {
  const { roomId } = useParams<{ roomId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myMeetings = async () => {
      if (roomId && containerRef.current) {
        const appID = parseInt(import.meta.env.VITE_APP_ID);
        const serverSecret = import.meta.env.VITE_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          "Naveen Singh"
        );
        const ZegoCloud = ZegoUIKitPrebuilt.create(kitToken);
        ZegoCloud.joinRoom({
          container: containerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: window.location.href,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
        });
      }
    };

    myMeetings();
  }, [roomId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        ref={containerRef}
        className="w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-lg overflow-hidden"
      />
    </div>
  );
}

export default Rooms;
