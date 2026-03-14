export default function StatCard({ icon: Icon, value, label, tone }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md">
      <div className={`inline-flex rounded-2xl ${tone} p-2.5 text-white`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-4 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#17392d]">{value}</p>
      <p className="mt-1.5 text-sm text-slate-600">{label}</p>
    </article>
  );
}
