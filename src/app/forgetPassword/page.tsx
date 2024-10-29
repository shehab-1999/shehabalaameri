'use client';
import React, {  useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { apifetch } from '@/api';
import axios from 'axios';

import ToastContainer from '../components/ui/toastCobtainer';
import Button from '../components/ui/button';
import { useForm } from 'react-hook-form';
import Cookies from 'react-cookie';



type FormValues = {
  email: string;
  password: string;
};

const ForgetPassword: React.FC = () => {

  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const [cookies, setCookies] = useCookies();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cookiess]=useCookies(['authToken','id'])
  const router = useRouter();


  const onSubmit = async (data: FormValues) => {


    try {
      const response = await apifetch.post('forgetPassword', data);

      if (response.status === 200) {
       setSuccess("لقد تم ارسال رسالة إعادة تعيين كلمة السر بنجاح")
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
    <div className="flex items-center justify-center h-screen bg-slate-900 font-serif">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">إعادة تعيين كلمة السر</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">قم بإدخال البريد الإلكتروني </label>
            <input
              type="email"
              id="email"
              
              {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="إدخل البريد الإلكتروني"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          
          
          <Button type='submit' label={"إرسال"} className={`w-full`} />
        </form>
        
        
        <div className='text-red-700 text-center'>{error}</div>
        <p className="text-green-700 text-center ">{success}</p>
      </div>
{/* 
      {error && <ToastContainer message={error} type="error" key={error} />}
      {success && <ToastContainer message={success} type="success" key={success} />} */}
    </div>
  );
};

export default ForgetPassword;