import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthContext';
import { CartProvider } from './providers/CartContext';
import { FavoritesProvider } from './providers/FavoritesContext';
import { ThemeProvider } from './providers/ThemeContext';
import Navbar from '@/widgets/layout/Navbar';
import Footer from '@/widgets/layout/Footer';
import AnimatedRoutes from './routers/AnimatedRoutes';
import FloatingCart from '@/widgets/cart/FloatingCart';
import FloatingCTA from '@/shared/ui/FloatingCTA';
import ChatBot from '@/widgets/chat/ChatBot';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                  <FloatingCart />
                  <FloatingCTA />
                  <ChatBot />
                </main>
                <Footer />
              </div>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
