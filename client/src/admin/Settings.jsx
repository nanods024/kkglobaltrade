import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { getCompanyProfile, updateCompanyProfile, changeAdminPassword } from '../services/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const pwForm = useForm();

  useEffect(() => {
    getCompanyProfile()
      .then((res) => reset(res.data.data))
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setMessage('');
    await updateCompanyProfile(data);
    setMessage('Company information updated.');
  };

  const onChangePassword = async (data) => {
    setPwMessage('');
    try {
      await changeAdminPassword(data);
      setPwMessage('Password updated successfully.');
      pwForm.reset();
    } catch (err) {
      setPwMessage(err.response?.data?.message || 'Failed to update password');
    }
  };

  if (loading) return <p className="text-navy-400">Loading...</p>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Website Settings</h1>
        <p className="mt-1 text-sm text-navy-400">Company information shown across the site.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Company Name</label>
            <input className="input-field" {...register('companyName')} />
          </div>
          <div>
            <label className="label-field">Tagline</label>
            <input className="input-field" {...register('tagline')} />
          </div>
          <div>
            <label className="label-field">Phone</label>
            <input className="input-field" {...register('phone')} />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input className="input-field" {...register('email')} />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field">Address</label>
            <input className="input-field" {...register('address')} />
          </div>
        </div>
        <div>
          <label className="label-field">Mission</label>
          <textarea rows={3} className="input-field" {...register('mission')} />
        </div>
        <div>
          <label className="label-field">Vision</label>
          <textarea rows={3} className="input-field" {...register('vision')} />
        </div>
        {message && <p className="text-sm text-forest-700">{message}</p>}
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </form>

      <form onSubmit={pwForm.handleSubmit(onChangePassword)} className="card space-y-5 p-6">
        <h2 className="text-lg font-semibold text-navy-900">Change Admin Password</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Current Password</label>
            <input type="password" className="input-field" {...pwForm.register('currentPassword', { required: true })} />
          </div>
          <div>
            <label className="label-field">New Password</label>
            <input type="password" className="input-field" {...pwForm.register('newPassword', { required: true, minLength: 8 })} />
          </div>
        </div>
        {pwMessage && <p className="text-sm text-navy-600">{pwMessage}</p>}
        <button type="submit" disabled={pwForm.formState.isSubmitting} className="btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}
