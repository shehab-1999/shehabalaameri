'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import Button from '../components/ui/button';
import { apifetch } from '@/api';
import axios from 'axios';
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const email = urlParams.get('email');

type FormValues = {
  confirmPassword: string;
  password: string;
};


const ResetPassword: React.FC = () => {
 if(window.location.search){
  
 }
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    // تحقق من تطابق كلمتي المرور
    if (data.password !== data.confirmPassword) {
      setError('كلمتا المرور لا تتطابقان.');
      return;
    }
    // هنا يمكنك إضافة منطق لإعادة تعيين كلمة المرور

    // إذا كانت كلمة المرور قد تم تعيينها بنجاح

    try {
      //  const response=await apifetch.put(`updateDepartment/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
      const response = await apifetch.put('resetPassword', {password:data.password,email:email,token:token},);
    if(response.status==200){

      router.push('login')
    }
    
    } catch (error:any) {
      if(error&&axios.isAxiosError(error))
        {
         setError(error.response?.data.message)
        }
         
      
     }

  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 font-serif">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">إعادة تعيين كلمة المرور</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">ادخل كلمة المرور الجديدة</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'إدخل كلمة المرور الجديدة' })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="إدخل كلمة المرور الجديدة"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">ادخل تأكيد كلمة المرور </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: 'إدخل تأكيد كلمة المرور الجديدة' })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="إدخل تأكيد كلمة المرور"
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          <Button type='submit' label={"تأكيد"} className={`w-full`} />
        </form>
        <div className="mt-4 text-center">
          <p className="text-red-700">{error}</p>
          <p className="text-green-700">{success}</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;