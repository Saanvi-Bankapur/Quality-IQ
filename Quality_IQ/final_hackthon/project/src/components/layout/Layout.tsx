import React, { useState } from 'react';
import { AlertTriangle, BarChart3, Bell, CheckCircle, ClipboardCheck, Factory, FileWarning, Home, LogOut, Menu, Settings, Shield, X } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';

const currentUser = mockUsers[0]; // For demo purposes, using the admin user

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  
  const notifications = [
    { id: 'n1', title: 'New failure detected', description: 'Packaging Line 3 reported a seal integrity issue', time: '5 min ago', type: 'alert' },
    { id: 'n2', title: 'Certification expiring', description: 'FCCI Compliance certification expiring in 30 days', time: '2 hours ago', type: 'warning' },
    { id: 'n3', title: 'Quality check completed', description: 'Daily Food Safety Inspection completed successfully', time: '5 hours ago', type: 'success' },
  ];

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/checklists', label: 'Quality Checklists', icon: <ClipboardCheck className="h-5 w-5" /> },
    { path: '/failures', label: 'Failure Analysis', icon: <FileWarning className="h-5 w-5" /> },
    { path: '/twin', label: 'Visual Tracker', icon: <Factory className="h-5 w-5" /> },
    { path: '/certifications', label: 'Certifications', icon: <Shield className="h-5 w-5" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">QualityIQ</span>
            </div>
            <button 
              onClick={closeSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={closeSidebar}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
            <button className="mt-4 flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={toggleNotifications}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </button>
                
                {/* Notification dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                      <button className="text-xs text-blue-600 hover:text-blue-800">Mark all as read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              {notification.type === 'alert' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                              {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                              {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                            <div className="w-full">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;