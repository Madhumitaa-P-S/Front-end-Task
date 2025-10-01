'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User,
  Plus,
  Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getInitials } from '@/utils/format';

interface HeaderProps {
  onSearchClick?: () => void;
  onCreateTaskClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchClick, 
  onCreateTaskClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                TaskManager
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-8 space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/tasks"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Tasks
              </Link>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Create Task Button */}
            <button
              onClick={onCreateTaskClick}
              className="hidden sm:flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Task
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user && getInitials(user.firstName, user.lastName)}
                    </span>
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/tasks"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tasks
              </Link>
              <button
                onClick={() => {
                  onCreateTaskClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-left text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;

