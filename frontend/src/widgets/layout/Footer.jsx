import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 px-4">
      {/* Ligne dorée en haut */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent mb-16" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-extralight tracking-[0.2em] text-white">OPTIC</span>
              <span className="text-3xl font-light tracking-[0.2em] bg-gradient-to-r from-[#c9a227] to-[#d4af37] bg-clip-text text-transparent">GLASS</span>
            </Link>
            <p className="text-white/40 mb-8 max-w-md font-light leading-relaxed">
              Excellence for your vision
            </p>
            <div className="space-y-4">
              <a href="mailto:contact@opticglass.com" className="flex items-center gap-4 text-white/50 hover:text-[#c9a227] transition-colors duration-300">
                <Mail size={16} className="text-[#c9a227]" />
                <span className="text-sm tracking-wide">contact@opticglass.com</span>
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-4 text-white/50 hover:text-[#c9a227] transition-colors duration-300">
                <Phone size={16} className="text-[#c9a227]" />
                <span className="text-sm tracking-wide">+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-4 text-white/50">
                <MapPin size={16} className="text-[#c9a227]" />
                <span className="text-sm tracking-wide">Paris · Lyon · Monaco</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[#c9a227] text-xs tracking-[0.2em] uppercase mb-6">Collection</h4>
            <ul className="space-y-3">
              <li><Link to="/glasses" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Eyeglasses</Link></li>
              <li><Link to="/sunglasses" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Sunglasses</Link></li>
              <li><Link to="/brands" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Brands</Link></li>
              <li><Link to="/categories" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#c9a227] text-xs tracking-[0.2em] uppercase mb-6">Stores</h4>
            <ul className="space-y-3">
              <li><Link to="/stores" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Find a Store</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Contact</Link></li>
              <li><Link to="/faq" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#c9a227] text-xs tracking-[0.2em] uppercase mb-6">My Account</h4>
            <ul className="space-y-3">
              <li><Link to="/auth" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">Sign In</Link></li>
              <li><Link to="/profile" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">My Profile</Link></li>
              <li><Link to="/orders" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">My Orders</Link></li>
              <li><Link to="/favorites" className="text-white/50 hover:text-[#c9a227] transition-colors text-sm">My Favorites</Link></li>
            </ul>
          </div>
        </div>

        {/* Services badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-16">
          <div className="bg-[#0a0a0a] p-6 text-center">
            <p className="text-white/70 text-sm font-light">Free Shipping</p>
            <p className="text-white/30 text-xs mt-1">Orders over €100</p>
          </div>
          <div className="bg-[#0a0a0a] p-6 text-center">
            <p className="text-white/70 text-sm font-light">Secure Payment</p>
            <p className="text-white/30 text-xs mt-1">Cards, PayPal, Installments</p>
          </div>
          <div className="bg-[#0a0a0a] p-6 text-center">
            <p className="text-white/70 text-sm font-light">2-Year Warranty</p>
            <p className="text-white/30 text-xs mt-1">On all products</p>
          </div>
          <div className="bg-[#0a0a0a] p-6 text-center">
            <p className="text-white/70 text-sm font-light">Free Returns</p>
            <p className="text-white/30 text-xs mt-1">30 days to return</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/30 text-xs tracking-wide mb-2">
                © 2026 Optic Glass. All rights reserved.
              </p>
              <p className="text-white/20 text-[10px] max-w-md">
                This is an independent platform. All product names are fictional and visuals are generated without use of registered trademarks or logos. Demo project.
              </p>
            </div>
            <div className="flex gap-8 text-xs">
              <a href="#" className="text-white/30 hover:text-[#c9a227] transition-colors tracking-wide">Terms & Conditions</a>
              <a href="#" className="text-white/30 hover:text-[#c9a227] transition-colors tracking-wide">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
