// Minimal, dependency-free bar chart for "Enquiries by Month".
// Single hue (forest green) since this is one series over time — no
// categorical color coding is needed here.
export default function MonthlyBarChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="py-10 text-center text-sm text-navy-400">No enquiry data yet.</p>;
  }

  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-3 overflow-x-auto pb-2 pt-6" role="img" aria-label="Enquiries received by month">
      {data.map((d) => {
        const heightPct = Math.max((d.count / max) * 100, 4);
        return (
          <div key={d.label} className="flex min-w-[44px] flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-navy-700">{d.count}</span>
            <div className="flex h-32 w-full items-end rounded-md bg-navy-50">
              <div
                className="w-full rounded-md bg-forest-600 transition-all"
                style={{ height: `${heightPct}%` }}
                title={`${d.label}: ${d.count} enquiries`}
              />
            </div>
            <span className="text-[11px] text-navy-400">{d.label.slice(5)}/{d.label.slice(2, 4)}</span>
          </div>
        );
      })}
    </div>
  );
}
