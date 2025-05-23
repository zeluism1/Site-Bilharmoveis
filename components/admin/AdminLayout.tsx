'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Package, PlusCircle, LogOut, Home, Briefcase } from 'lucide-react';
import type { AuthCheckResponse } from '@/types/api';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data: AuthCheckResponse = await response.json();

      if (!data.authenticated) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Logged out successfully',
        });
        router.push('/admin/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/products" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-semibold text-xl">Admin Panel</span>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              <Link
                href="/admin/products"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  pathname === '/admin/products'
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Package className="mr-3 h-5 w-5" />
                Products
              </Link>
              <Link
                href="/admin/add-product"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  pathname === '/admin/add-product'
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                Add New Product
              </Link>
              <Link
                href="/admin/projects"
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  (pathname === '/admin/projects' || pathname.startsWith('/admin/projects/add') || pathname.startsWith('/admin/projects/edit'))
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Projects
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 