import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getEnquiries, updateEnquiry, deleteEnquiry } from '../services/api';
import { ENQUIRY_STATUSES } from '../utils/constants';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchAll = () => {
    setLoading(true);
    getEnquiries({ status: statusFilter || undefined, limit: 100 })
      .then((res) => setEnquiries(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    await updateEnquiry(id, { status });
    fetchAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    await deleteEnquiry(id);
    setSelected(null);
    fetchAll();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Enquiries</h1>
          <p className="mt-1 text-sm text-navy-400">RFQ submissions and general contact enquiries.</p>
        </div>
        <select className="input-field w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {loading && <tr><td colSpan={7} className="px-4 py-8 text-center text-navy-400">Loading...</td></tr>}
            {!loading && enquiries.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-navy-400">No enquiries yet.</td></tr>
            )}
            {enquiries.map((e) => (
              <tr key={e._id} className="cursor-pointer hover:bg-navy-50/60" onClick={() => setSelected(e)}>
                <td className="px-4 py-3 text-navy-500">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-medium text-navy-900">{e.name}</td>
                <td className="px-4 py-3 text-navy-500">{e.companyName || '—'}</td>
                <td className="px-4 py-3 text-navy-500">{e.product || '—'}</td>
                <td className="px-4 py-3 text-navy-500">{e.country}</td>
                <td className="px-4 py-3" onClick={(ev) => ev.stopPropagation()}>
                  <select
                    className="rounded-md border border-navy-100 px-2 py-1 text-xs"
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                  >
                    {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right" onClick={(ev) => ev.stopPropagation()}>
                  <button type="button" onClick={() => handleDelete(e._id)} className="rounded-md p-2 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelected(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-navy-900">{selected.name}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ['Company', selected.companyName],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Country', selected.country],
                ['Product', selected.product],
                ['Quantity', `${selected.quantity || '-'} ${selected.unit || ''}`],
                ['Grade / Spec', selected.grade],
                ['Packaging', selected.packaging],
                ['Destination Port', selected.destination],
                ['Message', selected.message],
                ['Source', selected.source],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-navy-50 py-1.5">
                  <dt className="text-navy-400">{label}</dt>
                  <dd className="text-right text-navy-900">{value || '—'}</dd>
                </div>
              ))}
            </dl>
            <button type="button" onClick={() => setSelected(null)} className="btn-primary mt-6 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
