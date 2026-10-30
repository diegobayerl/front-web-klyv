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

    // Buffer lead time: dispara o próximo vídeo 150ms antes do final
    const leadTime = 0.15;
    let switched = false;

    const checkV1 = () => {
      if (v1.duration && v1.currentTime >= v1.duration - leadTime) {
        if (!switched) {
          switched = true;
          v2.currentTime = 0;
          v2.play()
            .then(() => {
              // Eleva v2 para o topo instantaneamente com opacidade 100% contínua
              setActiveVideo(2);
              setTimeout(() => {
                v1.pause();
                v1.currentTime = 0;
                switched = false;
              }, 120);
            })
            .catch(() => {
              switched = false;
            });
        }
      }
    };

    const checkV2 = () => {
      if (v2.duration && v2.currentTime >= v2.duration - leadTime) {
        if (!switched) {
          switched = true;
          v1.currentTime = 0;
          v1.play()
            .then(() => {
              // Eleva v1 para o topo instantaneamente com opacidade 100% contínua
              setActiveVideo(1);
              setTimeout(() => {
                v2.pause();
                v2.currentTime = 0;
                switched = false;
              }, 120);
            })
            .catch(() => {
              switched = false;
            });
        }
      }
    };

    const handlePlayStart = () => {
      setHasStarted(true);
    };

    v1.addEventListener("timeupdate", checkV1);
    v2.addEventListener("timeupdate", checkV2);
    v1.addEventListener("playing", handlePlayStart, { once: true });

    // Inicia vídeo 1
    v1.play().then(() => setHasStarted(true)).catch(() => {});

    return () => {
      v1.removeEventListener("timeupdate", checkV1);
      v2.removeEventListener("timeupdate", checkV2);
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
      {/* Poster fixo de fundo: visível apenas até o 1º frame do vídeo começar */}
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
          transition: "opacity 0.25s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Video 1: Sempre 100% opaco, sem crossfade de transparência */}
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
          opacity: 1,
          zIndex: activeVideo === 1 ? 2 : 1,
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />

      {/* Video 2: Sempre 100% opaco, sem crossfade de transparência */}
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
          opacity: 1,
          zIndex: activeVideo === 2 ? 2 : 1,
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
