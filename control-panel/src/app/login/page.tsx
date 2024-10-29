'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { apifetch } from '@/api';
import axios, { AxiosError } from 'axios';
import { encrypt } from '../util/encryptons';
import ToastContainer from '../components/ui/toastCobtainer';
import Button from '../components/ui/button';


type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [data, setData] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [cookies, setCookies] = useCookies();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apifetch.post('login', data);

      if (response.status === 200) {
        setCookies('authToken', response.data.token, { path: '/', maxAge: 86400 });
        setCookies('permision', encrypt(response.data.user.role), { path: '/', maxAge: 86400 });
        sessionStorage.setItem('session', response.data.session.id);
        sessionStorage.setItem('role', encrypt(response.data.user.role));
        sessionStorage.setItem('userName', encrypt(JSON.stringify(response.data.user.userName)));
        // const permissions = response.data.user.permissions.map((permission: { action: any; }) => permission.action);
        // setCookies('permision', JSON.stringify(encryptArray(permissions)));
        setSuccess("تم تسجيل الدخول بنجاح!");
        router.push('/Dashboard');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'حدث خطأ غير معروف');
      } else {
        setError('حدث خطأ غير معروف. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="Enter your email"
              required
              value={data.email}
              onChange={(event) => setData({ ...data, email: event.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={(event) => setData({ ...data, password: event.target.value })}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="remember-me" className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="form-checkbox text-blue-500 rounded"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>
            <a href="#" className="text-blue-500 hover:text-blue-700">Forgot password?</a>
          </div>
          <Button  type='submit' label={"Log In"} className={`w-full`}/>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don{"'"}t have an account?</p>
        </div>
        <div className='text-red-700 text-center'>{error}</div>
      </div>

    

    {error && <ToastContainer message={error} type="error" />}
    {success && <ToastContainer message={success} type="success" />}
    </div>

  );
};

export default Login;