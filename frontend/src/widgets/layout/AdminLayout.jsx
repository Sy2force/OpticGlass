import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Image as ImageIcon,
  MessageCircle,
  Home,
  Eye
} from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: '/admin', label: 'Overview', icon: BarChart3 },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/messages', label: 'Messages', icon: MessageCircle },
    { path: '/admin/images', label: 'Images', icon: ImageIcon },
    { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const quickLinks = [
    { path: '/', label: 'View Site', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#111111] hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="block">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-[#c9a227] to-amber-600 bg-clip-text text-transparent">
              OPTIC ADMIN
            </h1>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-[#c9a227] text-black font-medium shadow-lg shadow-[#c9a227]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          {quickLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
          <button 
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <span className="text-xl font-bold text-[#c9a227]">OA</span>
          </div>
          
          <div className="flex-1 max-w-xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-700 flex items-center justify-center font-bold text-sm text-black">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
