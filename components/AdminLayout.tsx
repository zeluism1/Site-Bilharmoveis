'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Consider adding an icon library for a more polished look, e.g., lucide-react
// import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/admin/auth');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
          } else {
            router.push('/admin/login');
          }
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Failed to fetch auth status', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (response.ok) {
        setIsAuthenticated(false); // Optimistically update UI
        router.push('/admin/login');
      } else {
        console.error('Logout failed');
        alert('Logout failed. Please try again.'); // Consider a more polished notification system
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">Loading admin section...</p>
        {/* You could add a spinner here */}
      </div>
    );
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the effect redirecting.
    // Returning null or a minimal component while redirecting.
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-center border-b border-gray-700 pb-4">Admin Panel</h2>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/products" className="flex items-center px-4 py-2.5 rounded-md hover:bg-gray-700 transition-colors duration-150">
                {/* <ShoppingBag className="w-5 h-5 mr-3" /> */}
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/add-product" className="flex items-center px-4 py-2.5 rounded-md hover:bg-gray-700 transition-colors duration-150">
                {/* <PlusCircle className="w-5 h-5 mr-3" /> */}
                Add Product
              </Link>
            </li>
            {/* Add more admin links here as needed */}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2.5 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-150 mt-auto"
        >
          {/* <LogOut className="w-5 h-5 mr-2" /> */}
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-white shadow-inner">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 