'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Replace this with your actual authentication check
const isAuthenticated = () => {
  // For example, check if a token exists in localStorage or cookies
  // This is a placeholder and should be replaced with your actual auth logic
  return !!localStorage.getItem('authToken'); 
};

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/products');
    } else {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      <p className="ml-4 text-lg">Loading...</p>
    </div>
  );
} 