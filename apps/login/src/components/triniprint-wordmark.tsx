export function TriniprintWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className={`font-black uppercase tracking-[0.28em] text-primary-light-500 dark:text-primary-dark-500 ${compact ? "text-[0.68rem]" : "text-[0.78rem]"}`}
      >
        Triniprint
      </span>
      <span
        className={`font-semibold text-slate-900 dark:text-white ${compact ? "text-lg" : "text-2xl"}`}
      >
        Sign in
      </span>
    </div>
  );
}
