import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";
export type WindowsHandle = {
  reduceHealth: (amount?: number) => void;
  getHealth: () => number;
};
type WindowsProps = {
  src?: string;
  alt?: string;
  className?: string;
  maxHealth?: number;
  children?: React.ReactNode;
  front?: boolean;
  clickSound?: string; // <-- optional sound URL/path
};

const Windows = forwardRef<WindowsHandle, WindowsProps>(function Windows(
  {
    src = "https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg",
    alt = "Windows",
    className = "",
    maxHealth = 5,
    children,
    front = true,
    clickSound = "../../public/output2.mp3", // optional prop
  },
  ref
) {
  const [health, setHealth] = useState<number>(maxHealth);

  // audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (clickSound) {
      const a = new Audio(clickSound);
      a.preload = "auto";
      audioRef.current = a;
    }
    return () => {
      audioRef.current = null;
    };
  }, [clickSound]);

  const reduceHealth = (amount = 1) => {
    setHealth((h) => Math.max(0, h - amount));
  };

  useImperativeHandle(
    ref,
    () => ({
      reduceHealth,
      getHealth: () => health,
    }),
    [health]
  );

  const opacity = Math.max(0, health / maxHealth);

  // wrapper is positioned and creates a new stacking context so z-index works
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ position: "relative" }}
      onClick={() => {
        reduceHealth();
        // play sound on click (user gesture allows playback)
        const a = audioRef.current;
        if (a) {
          try {
            a.currentTime = 0;
            const p = a.play();
            if (p && typeof p.then === "function") p.catch(() => {});
          } catch {
            // ignore play errors
          }
        }
      }}
    >
      {/* children placed behind if front === true */}
      <div style={{ position: "absolute", inset: 0, zIndex: front ? 0 : 10 }}>
        {children}
      </div>

      {/* Windows image: normal size, centered, in front */}
      <div
        style={{
          position: "relative",
          zIndex: front ? 20 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "50%",
            maxHeight: "50%",
            display: "block",
            opacity,
            transition: "opacity 300ms",
          }}
        />
      </div>
    </div>
  );
});

export { Windows };