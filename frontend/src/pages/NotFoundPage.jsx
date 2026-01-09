import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="text-9xl font-bold mb-8"
          >
            <span className="text-primary">4</span>
            <span className="text-white">0</span>
            <span className="text-primary">4</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg mb-8"
          >
            Sorry, the page you are looking for does not exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2 border border-white/20"
            >
              <ArrowLeft size={20} />
              Back
            </motion.button>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-[#d4af37] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/50"
              >
                <Home size={20} />
                Home
              </motion.button>
            </Link>

            <Link to="/glasses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2 border border-white/20"
              >
                <Search size={20} />
                Browse Glasses
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Link to="/brands">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all">
                <p className="text-white font-medium">Brands</p>
                <p className="text-gray-400 text-sm">Discover our brands</p>
              </div>
            </Link>
            <Link to="/categories">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all">
                <p className="text-white font-medium">Categories</p>
                <p className="text-gray-400 text-sm">Explore styles</p>
              </div>
            </Link>
            <Link to="/recommendations">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all">
                <p className="text-white font-medium">Trends</p>
                <p className="text-gray-400 text-sm">Our recommendations</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
