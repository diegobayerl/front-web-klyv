"use client";

import { useEffect, useRef, useState } from "react";

interface SeamlessLoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function SeamlessLoopVideo({
  src,
  poster = "/mascot-poster.webp",
  className = "",
}: SeamlessLoopVideoProps) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Crossfade 200ms before video reaches its end
    const crossfadeThreshold = 0.2;

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

    const handlePlayStart = () => {
      setHasStarted(true);
    };

    v1.addEventListener("timeupdate", handleV1TimeUpdate);
    v2.addEventListener("timeupdate", handleV2TimeUpdate);
    v1.addEventListener("ended", handleV1Ended);
    v2.addEventListener("ended", handleV2Ended);
    v1.addEventListener("playing", handlePlayStart, { once: true });

    // Prime video 1
    v1.play().then(() => setHasStarted(true)).catch(() => {});

    return () => {
      v1.removeEventListener("timeupdate", handleV1TimeUpdate);
      v2.removeEventListener("timeupdate", handleV2TimeUpdate);
      v1.removeEventListener("ended", handleV1Ended);
      v2.removeEventListener("ended", handleV2Ended);
      v1.removeEventListener("playing", handlePlayStart);
    };
  }, [src]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#547288",
        transform: "translateZ(0)",
      }}
    >
      {/* Poster fixo de fundo: renderiza instantaneamente sem 1 milissegundo de tela em branco */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: hasStarted ? 0 : 3,
          opacity: hasStarted ? 0 : 1,
          transition: "opacity 0.3s ease-out",
          pointerEvents: "none",
        }}
      />

      <video
        ref={video1Ref}
        src={src}
        poster={poster}
        autoPlay
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
          transition: "opacity 0.2s ease-in-out",
          opacity: activeVideo === 1 ? 1 : 0,
          zIndex: activeVideo === 1 ? 2 : 1,
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />

      <video
        ref={video2Ref}
        src={src}
        poster={poster}
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
          transition: "opacity 0.2s ease-in-out",
          opacity: activeVideo === 2 ? 1 : 0,
          zIndex: activeVideo === 2 ? 2 : 1,
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
