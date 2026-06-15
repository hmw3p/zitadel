export function TriniprintWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col">
      <div
        className={`font-black uppercase leading-none tracking-[-0.08em] text-[#1d1d1d] ${compact ? "text-[1.45rem]" : "text-[1.7rem]"}`}
      >
        <span>TRINI</span>
        <span className="text-primary-light-500">PRINT</span>
      </div>
      <span className={`mt-2 text-sm font-medium tracking-[0.12em] text-text-light-secondary-500 ${compact ? "text-xs" : "text-sm"}`}>
        SIGN IN
      </span>
    </div>
  );
}
