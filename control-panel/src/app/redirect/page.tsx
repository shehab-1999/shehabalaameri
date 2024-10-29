'use client'
import { apifetch } from "@/api";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Page() {

    const router = useRouter();
  useEffect(() => {
    // Check if the user has a valid session
    const checkSession = async () => {
      try {
        const authToken = sessionStorage.getItem('session');
        if (authToken) {
          const response = await apifetch.get('/validate', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });
          if (response.status === 200 && response.data) {
            // Redirect to the Dashboard page if the session is valid
            router.push('/Dashboard');
          } else {
            // Redirect to the Login page if the session is not valid
            router.push('/login');
          }
        } else {
          // Redirect to the Login page if there is no session
          router.push('/login');
        }
      } catch (error: any) {
        // Handle any errors
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, [router]);


}