export default function SiriWaveAnimation() {
  return (
    <div className="flex items-end justify-center gap-1 h-5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-sm bg-cyan-400 animate-wave"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
