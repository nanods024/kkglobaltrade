import { useEffect, useState } from 'react';
import { Package, Inbox, Activity, CheckCircle } from 'lucide-react';
import { getEnquiryStats } from '../services/api';
import MonthlyBarChart from './components/MonthlyBarChart';

const CARD_DEFS = [
  { key: 'totalProducts', label: 'Total Products', icon: Package, color: 'bg-navy-700' },
  { key: 'newEnquiries', label: 'New Enquiries', icon: Inbox, color: 'bg-gold-500' },
  { key: 'activeEnquiries', label: 'Active Enquiries', icon: Activity, color: 'bg-forest-700' },
  { key: 'completedEnquiries', label: 'Completed Enquiries', icon: CheckCircle, color: 'bg-earth' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnquiryStats()
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-400">Overview of products and enquiries.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARD_DEFS.map((card) => (
          <div key={card.key} className="card flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{loading ? '—' : stats?.[card.key] ?? 0}</p>
              <p className="text-sm text-navy-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 p-6">
        <h2 className="text-lg font-semibold text-navy-900">Enquiries by Month</h2>
        {loading ? (
          <p className="py-10 text-center text-sm text-navy-400">Loading...</p>
        ) : (
          <MonthlyBarChart data={stats?.monthly} />
        )}
      </div>
    </div>
  );
}
