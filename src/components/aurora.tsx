/**
 * Fixed aurora background — three drifting radial blobs plus a masked grid.
 * Pure CSS, GPU-friendly (transform/opacity only), pauses under reduced motion.
 */
export function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute h-[60vw] w-[60vw] rounded-full blur-[55px] opacity-45 md:opacity-55 md:blur-[90px]"
        style={{
          left: "-10vw",
          top: "-20vh",
          background: "radial-gradient(circle at center, rgba(30,107,255,.55), transparent 62%)",
          animation: "drift-a 24s var(--ease-out-expo) infinite alternate",
        }}
      />
      <div
        className="absolute h-[55vw] w-[55vw] rounded-full blur-[55px] opacity-35 md:opacity-45 md:blur-[90px]"
        style={{
          right: "-12vw",
          top: "8vh",
          background: "radial-gradient(circle at center, rgba(24,224,255,.4), transparent 62%)",
          animation: "drift-b 28s var(--ease-out-expo) infinite alternate",
        }}
      />
      <div
        className="absolute h-[45vw] w-[45vw] rounded-full blur-[60px] opacity-25 md:opacity-30 md:blur-[100px]"
        style={{
          left: "30vw",
          bottom: "-25vh",
          background: "radial-gradient(circle at center, rgba(30,107,255,.5), transparent 62%)",
          animation: "drift-c 32s var(--ease-out-expo) infinite alternate",
        }}
      />
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
