const stats = [
  { value: '14.5', label: 'Years at Amazon' },
  { value: '3', label: 'Teams Founded' },
  { value: '>$1B', label: 'Revenue Impact' },
  { value: 'Bar Raiser', label: 'Experimentation' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-border rounded-xl p-5 text-center shadow-sm"
        >
          <div className="text-2xl md:text-3xl font-bold text-primary-600">{stat.value}</div>
          <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
