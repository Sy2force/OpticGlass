import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Sun, Moon, Package, MapPin, CreditCard, Settings, LogOut, Shield, LayoutDashboard, Mail } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import { useFavorites } from '@/app/providers/FavoritesContext';
import { useCart } from '@/app/providers/CartContext';
import MessageBox from '@/widgets/chat/MessageBox';
import Logo from '@/shared/ui/Logo';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { getFavoritesCount } = useFavorites();
  const { getCartCount } = useCart();
  
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Get real counts from contexts
  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/glasses', label: 'Collection' },
    { to: '/sunglasses', label: 'Sunglasses' },
    { to: '/brands', label: 'Brands' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg' 
        : location.pathname === '/' 
          ? 'bg-black/40 backdrop-blur-lg' 
          : 'bg-[#0a0a0a]/95 backdrop-blur-xl'
    }`}>
      {/* Ligne dorée en haut */}
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
        location.pathname === '/' && !isScrolled
          ? 'via-[#c9a227]/50'
          : 'via-[#c9a227]/30'
      } to-transparent`} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-3">
            {/* Logo Icon */}
            <div className={`transition-all duration-300 ${
              location.pathname === '/' && !isScrolled 
                ? 'drop-shadow-[0_0_10px_rgba(201,162,39,0.6)]' 
                : ''
            }`}>
              <Logo size={44} />
            </div>
            
            {location.pathname === '/' && !isScrolled ? (
              // Design 3D premium compact sur landing page
              <div className="flex items-center gap-1">
                <span className="text-2xl font-light tracking-[0.2em] text-white"
                style={{
                  textShadow: '1px 1px 0px rgba(0,0,0,0.3), 2px 2px 0px rgba(0,0,0,0.2), 3px 3px 4px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.3)',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
                }}>OPTIC</span>
                <span className="text-2xl font-bold tracking-[0.2em] bg-gradient-to-r from-[#d4af37] via-[#c9a227] to-[#d4af37] bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 15px rgba(201,162,39,0.9), 0 0 30px rgba(201,162,39,0.6), 0 0 45px rgba(201,162,39,0.3)',
                  filter: 'drop-shadow(0 0 12px rgba(201,162,39,0.9))'
                }}>GLASS</span>
              </div>
            ) : (
              // Design normal sur autres pages
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extralight tracking-[0.2em] text-white">OPTIC</span>
                <span className="text-2xl font-light tracking-[0.2em] bg-gradient-to-r from-[#c9a227] to-[#d4af37] bg-clip-text text-transparent">GLASS</span>
              </div>
            )}
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 font-bold ${
                  location.pathname === to 
                    ? 'text-[#c9a227] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                    : location.pathname === '/' && !isScrolled
                      ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                      : 'text-white/80 hover:text-[#c9a227]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Button Theme - Premium Design */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-2 rounded-lg transition-all duration-300 group border ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 text-[#c9a227] hover:bg-white/10 hover:border-[#c9a227]/30'
                  : 'bg-[#0a0a0a]/5 border-[#0a0a0a]/10 text-[#c9a227] hover:bg-[#0a0a0a]/10 hover:border-[#c9a227]/30'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Message Box */}
                <MessageBox />
                
                <Link
                  to="/favorites"
                  className={`p-2 relative transition-colors duration-300 ${
                    location.pathname === '/' && !isScrolled
                      ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                      : 'text-white/70 hover:text-[#c9a227]'
                  }`}
                >
                  <Heart size={20} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#c9a227] text-black text-[10px] w-4 h-4 flex items-center justify-center font-bold rounded-full shadow-lg">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className={`p-2 relative transition-colors duration-300 ${
                    location.pathname === '/' && !isScrolled
                      ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                      : 'text-white/70 hover:text-[#c9a227]'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold rounded-full shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`p-2 transition-colors duration-300 ${
                      location.pathname === '/' && !isScrolled
                        ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                        : 'text-white/70 hover:text-[#c9a227]'
                    } ${isUserMenuOpen ? 'text-[#c9a227]' : ''}`}
                  >
                    <User size={20} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a227] to-amber-600 flex items-center justify-center text-black font-semibold text-sm">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                            <p className="text-white/40 text-xs">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link to="/user/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <LayoutDashboard size={16} />
                          My Dashboard
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <Package size={16} />
                          My Orders
                        </Link>
                        <Link to="/messages" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <Mail size={16} />
                          My Messages
                        </Link>
                        <Link to="/favorites" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <Heart size={16} />
                          My Favorites
                        </Link>
                        <Link to="/profile?tab=profile" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <User size={16} />
                          Profile Settings
                        </Link>
                        <Link to="/profile?tab=addresses" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <MapPin size={16} />
                          My Addresses
                        </Link>
                        <Link to="/profile?tab=payments" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <CreditCard size={16} />
                          Payment Methods
                        </Link>
                        <Link to="/profile?tab=settings" className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                          <Settings size={16} />
                          Settings
                        </Link>
                      </div>
                      
                      {/* Admin Link */}
                      {isAdmin && (
                        <div className="border-t border-white/10 py-2">
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-[#c9a227] hover:bg-[#c9a227]/10 transition-colors text-sm">
                            <Shield size={16} />
                            Administration
                          </Link>
                        </div>
                      )}
                      
                      {/* Logout */}
                      <div className="border-t border-white/10 py-2">
                        <button
                          onClick={() => {
                            logout();
                            window.location.href = '/';
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-500/10 transition-colors text-sm"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center">
                <Link to="/auth?mode=login" className={`px-6 py-2 text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-lg ${
                  location.pathname === '/' && !isScrolled
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]'
                    : 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)]'
                }`}>
                  Sign In
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                location.pathname === '/' && !isScrolled
                  ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                  : 'text-white/70 hover:text-[#c9a227]'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 space-y-1 bg-[#0a0a0a]/98 backdrop-blur-xl animate-fadeIn">
            {navLinks.map(({ to, label }, index) => (
              <Link
                key={to}
                to={to}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`block py-3 px-4 text-sm tracking-[0.1em] uppercase transition-all duration-300 font-medium animate-slideDown ${
                  location.pathname === to 
                    ? 'text-[#c9a227] bg-red-600/10 border-l-2 border-red-600' 
                    : 'text-white/70 hover:text-[#c9a227] hover:bg-white/5 hover:border-l-2 hover:border-[#c9a227]'
                }`}
              >
                {label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-6 border-t border-white/10 mt-4 px-4 animate-slideDown" style={{ animationDelay: '250ms' }}>
                <Link to="/auth?mode=login" className="block py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center text-sm tracking-wider uppercase font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
