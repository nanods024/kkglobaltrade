import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/admin/dashboard'} replace />;
  }

  const onSubmit = async (data) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h1 className="font-display text-2xl font-bold text-navy-900">KK Global Trade</h1>
        <p className="mt-1 text-sm text-navy-400">Admin Login</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <input id="email" type="email" className="input-field" {...register('email', { required: true })} />
            {errors.email && <p className="mt-1 text-xs text-red-600">Email is required</p>}
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <input id="password" type="password" className="input-field" {...register('password', { required: true })} />
            {errors.password && <p className="mt-1 text-xs text-red-600">Password is required</p>}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            <LogIn className="h-4 w-4" />
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
