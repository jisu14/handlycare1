export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center tracking-tight font-sans ${className}`}>
      <span className="text-[#041639] font-semibold">Handly</span>
      <span className="text-[#b1884e] font-medium">Care</span>
    </div>
  );
}
