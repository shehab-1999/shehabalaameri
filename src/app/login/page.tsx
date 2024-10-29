'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';



import Button from '../components/ui/button';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';


type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {

  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const [cookies, setCookies] = useCookies();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cookiess]=useCookies(['authToken','id'])
  const router = useRouter();


  const onSubmit = async (data: FormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email:data.email,
      password:data.password,
    });
    if (result?.ok) {
     
      toast.success("تم تسجيل الدخول بنجاح!");
        router.push('/Dashboard');
    } else {
    
      setError("خطأ في عملية الدخول")
      toast.error("Invalid credentials");
    }
  

  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 font-serif">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="إدخل البريد الإلكتروني"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">كلمة السر</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'كلمة المرور مطلوبة' })}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="إدخل كلمة المرور"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
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
                <span className="ml-2 text-gray-700"> ذكرني</span>
              </label>
            </div>
            <a href="forgetPassword/" className="text-blue-500 hover:text-blue-700">هل نسبت كلمة السر؟</a>
          </div>
          <Button type='submit' label={"دخول"} className={`w-full`} />
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">ليس لديك حساب؟</p>
        </div>
        <div className='text-red-700 text-center'>{error}</div>
      </div>
{/* 
      {error && <ToastContainer message={error} type="error" key={error} />}
      {success && <ToastContainer message={success} type="success" key={success} />} */}
    </div>
  );
};

export default Login;