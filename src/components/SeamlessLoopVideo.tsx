"use client";

import { useEffect, useRef, useState } from "react";

interface SeamlessLoopVideoProps {
  src: string;
  className?: string;
}

export function SeamlessLoopVideo({ src, className = "" }: SeamlessLoopVideoProps) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Crossfade 400ms before video reaches its end
    const crossfadeThreshold = 0.45;

    const handleV1TimeUpdate = () => {
      if (v1.duration && v1.currentTime >= v1.duration - crossfadeThreshold) {
        if (v2.paused) {
          v2.currentTime = 0;
          v2.play().catch(() => {});
          setActiveVideo(2);
        }
      }
    };

    const handleV2TimeUpdate = () => {
      if (v2.duration && v2.currentTime >= v2.duration - crossfadeThreshold) {
        if (v1.paused) {
          v1.currentTime = 0;
          v1.play().catch(() => {});
          setActiveVideo(1);
        }
      }
    };

    const handleV1Ended = () => {
      v1.pause();
      v1.currentTime = 0;
    };

    const handleV2Ended = () => {
      v2.pause();
      v2.currentTime = 0;
    };

    v1.addEventListener("timeupdate", handleV1TimeUpdate);
    v2.addEventListener("timeupdate", handleV2TimeUpdate);
    v1.addEventListener("ended", handleV1Ended);
    v2.addEventListener("ended", handleV2Ended);

    v1.play().catch(() => {});

    return () => {
      v1.removeEventListener("timeupdate", handleV1TimeUpdate);
      v2.removeEventListener("timeupdate", handleV2TimeUpdate);
      v1.removeEventListener("ended", handleV1Ended);
      v2.removeEventListener("ended", handleV2Ended);
    };
  }, [src]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <video
        ref={video1Ref}
        src={src}
        muted
        playsInline
        preload="auto"
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.4s ease-in-out",
          opacity: activeVideo === 1 ? 1 : 0,
          zIndex: activeVideo === 1 ? 2 : 1,
          pointerEvents: "none",
        }}
      />
      <video
        ref={video2Ref}
        src={src}
        muted
        playsInline
        preload="auto"
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.4s ease-in-out",
          opacity: activeVideo === 2 ? 1 : 0,
          zIndex: activeVideo === 2 ? 2 : 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
