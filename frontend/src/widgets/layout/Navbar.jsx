import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { useTheme } from '@/app/providers/ThemeContext';
import MessageBox from '@/widgets/chat/MessageBox';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const updateCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (Array.isArray(cart)) {
        const total = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    updateCartCount();
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateCartCount]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/glasses', label: 'Collection' },
    { to: '/sunglasses', label: 'Solaires' },
    { to: '/brands', label: 'Marques' },
    { to: '/about', label: 'À propos' },
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
          <Link to="/" className="group flex items-center gap-1">
            {location.pathname === '/' && !isScrolled ? (
              // Design 3D luxe compact sur landing page
              <>
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
              </>
            ) : (
              // Design normal sur autres pages
              <>
                <span className="text-2xl font-extralight tracking-[0.2em] text-white">OPTIC</span>
                <span className="text-2xl font-light tracking-[0.2em] bg-gradient-to-r from-[#c9a227] to-[#d4af37] bg-clip-text text-transparent">GLASS</span>
              </>
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
            {/* Button Theme */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/' && !isScrolled
                  ? 'bg-white/10 border border-white/20 text-white hover:bg-[#c9a227] hover:text-black hover:border-[#c9a227]'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-[#c9a227] hover:text-black hover:border-[#c9a227]'
              }`}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Boîte de messagerie */}
                <MessageBox />
                
                <Link
                  to="/favorites"
                  className={`p-2 transition-colors duration-300 ${
                    location.pathname === '/' && !isScrolled
                      ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                      : 'text-white/70 hover:text-[#c9a227]'
                  }`}
                >
                  <Heart size={20} />
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

                <div className="relative group">
                  <button className={`p-2 transition-colors duration-300 ${
                    location.pathname === '/' && !isScrolled
                      ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-[#c9a227]'
                      : 'text-white/70 hover:text-[#c9a227]'
                  }`}>
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 shadow-2xl py-2 hidden group-hover:block">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-light text-sm tracking-wide">{user?.name || 'User'}</p>
                      <p className="text-white/40 text-xs">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-white/60 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                      Mon profil
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-white/60 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                      Mes commandes
                    </Link>
                    <Link to="/favorites" className="block px-4 py-2 text-white/60 hover:text-[#c9a227] hover:bg-white/5 transition-colors text-sm">
                      Mes favoris
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-[#c9a227] hover:bg-[#c9a227]/10 transition-colors border-t border-white/10 mt-2 text-sm">
                        Administration
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center">
                <Link to="/auth?mode=login" className={`px-6 py-2 text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-lg ${
                  location.pathname === '/' && !isScrolled
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]'
                    : 'bg-gradient-to-r from-[#c9a227] to-[#d4af37] text-black hover:shadow-[0_0_20px_rgba(201,162,39,0.3)]'
                }`}>
                  Connexion
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
                  Connexion
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
