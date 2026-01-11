import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AdminLayout from '@/widgets/layout/AdminLayout';

import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import GlassesPage from '@/pages/GlassesPage';
import GlassDetailPage from '@/pages/GlassDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SuccessPage from '@/pages/SuccessPage';
import ProfilePage from '@/pages/ProfilePage';
import OrdersPage from '@/pages/OrdersPage';
import BrandsPage from '@/pages/BrandsPage';
import BrandDetailPage from '@/pages/BrandDetailPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminAnalytics from '@/pages/AdminAnalytics';
import AdminImagesPage from '@/pages/AdminImagesPage';
import AdminOrdersManagement from '@/pages/AdminOrdersManagement';
import AdminUsers from '@/pages/AdminUsers';
import AdminProducts from '@/pages/AdminProducts';
import AdminMessages from '@/pages/AdminMessages';
import UserDashboard from '@/pages/UserDashboard';
import RecommendationsPage from '@/pages/RecommendationsPage';
import GiftCardPage from '@/pages/GiftCardPage';
import StoresPage from '@/pages/StoresPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ComparePage from '@/pages/ComparePage';
import FAQPage from '@/pages/FAQPage';
import SunglassesPage from '@/pages/SunglassesPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import TryOnPage from '@/pages/TryOnPage';
import ReviewsPage from '@/pages/ReviewsPage';
import MessagesPage from '@/pages/MessagesPage';

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        } 
      />
      <Route path="/glasses" element={<GlassesPage />} />
      <Route path="/glasses/:id" element={<GlassDetailPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/brands/:slug" element={<BrandDetailPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/gift-card" element={<GiftCardPage />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/sunglasses" element={<SunglassesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      
      {/* Routes User Protégées */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/try-on"
        element={
          <ProtectedRoute>
            <TryOnPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        }
      />

      {/* Routes Admin Protégées - Nested Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="images" element={<AdminImagesPage />} />
        <Route path="orders" element={<AdminOrdersManagement />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AnimatedRoutes;
