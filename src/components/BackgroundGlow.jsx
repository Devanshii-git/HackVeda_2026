import { useEffect, useState } from "react";

function BackgroundGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* BASE GRADIENT */}
      <div
        className="fixed inset-0 bg-[radial-gradient(circle_at_top,_#1e3a8a,_transparent_60%)] opacity-40"
        style={{ zIndex: 0 }}
      />

      {/* MOUSE GLOW */}
      <div
        className="pointer-events-none fixed w-[800px] h-[800px] rounded-full blur-[180px]"
        style={{
          zIndex: 0,
          left: pos.x - 400,
          top: pos.y - 400,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.6), transparent 60%)",
        }}
      />
    </>
  );
}

export default BackgroundGlow;
