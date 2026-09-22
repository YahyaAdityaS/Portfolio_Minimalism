export function BackgroundGrid() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-white dark:bg-zinc-950">
      {/* Container with Mask */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0px,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0px,rgba(255,255,255,0.03),transparent_70%)]" />
    </div>
  );
}