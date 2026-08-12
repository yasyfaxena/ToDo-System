function AIAssistant() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-slate-950">
            ✦
          </div>

          <div>
            <p className="font-semibold">TaskFlow AI</p>
            <p className="text-xs text-slate-400">
              Your productivity assistant
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-300">
          Let AI analyze your tasks, summarize your workload, and suggest what
          you should focus on next.
        </p>

        <div className="mt-5 grid gap-2">
          <button className="rounded-xl bg-white px-4 py-2.5 text-left text-xs font-semibold text-slate-950 transition hover:bg-slate-100">
            ✦ Suggest my priorities
          </button>

          <button className="rounded-xl border border-white/10 px-4 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:bg-white/5">
            Summarize my tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
