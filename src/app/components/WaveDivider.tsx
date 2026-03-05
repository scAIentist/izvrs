interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function WaveDivider({
  from = "#c4f5f7",
  to = "#d4e8d4",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-[0] -mt-px -mb-px"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] md:h-[100px]"
      >
        <defs>
          <linearGradient id={`wave-grad-${from}-${to}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z"
          fill={`url(#wave-grad-${from}-${to})`}
        />
        <path
          d="M0,60 C300,20 600,90 900,40 C1100,10 1300,70 1440,50 L1440,120 L0,120 Z"
          fill={to}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
