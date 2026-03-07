import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Package,
  PieChart,
  FileDown,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Segments", icon: PieChart, path: "/segments" },
  // { name: "Exports", icon: FileDown, path: "/exports" },
];

const adminItems = [
  { name: "Settings", icon: SettingsIcon, path: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Customer Analytics
              </h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Admin Section */}
          <div className="mt-6 sm:mt-8">
            <div className="px-3 mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin
              </p>
            </div>
            <div className="space-y-1">
              {adminItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}