'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Building, Hotel, MapPin, Home, LogOut, User, FileText, Mail } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/v1', icon: Home },
    { name: 'Properties', href: '/v1/properties', icon: Building },
    { name: 'Hotels', href: '/v1/hotels', icon: Hotel },
    { name: 'Travel', href: '/v1/travel', icon: MapPin },
    { name: 'Blog', href: '/v1/blogs', icon: FileText },
    { name: 'Contacts', href: '/v1/contacts', icon: Mail },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/v1/login';
  };

  return (
    <div className="flex h-screen bg-primary-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-primary-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <img src="/assets/images/knb_logo.svg"  alt="Logo" className="h-16" />}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-primary-700"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/v1' ? pathname === '/v1' : pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive ? 'bg-primary-600' : 'hover:bg-primary-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center">
            <User className="h-8 w-8 bg-primary-600 rounded-full p-1" />
            {sidebarOpen ? (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">Super Admin</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-xs text-primary-200 hover:text-white"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg hover:bg-primary-700"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-primary-50">
        {children}
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access the admin panel."
        confirmText="Logout"
      />
    </div>
  );
}