import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      name: "Sophie L.",
      rating: 5,
      date: "2 days ago",
      text: "Exceptional service! I ordered my Soléra Aviators and received them within 48 hours. The packaging was elegant and the glasses are 100% authentic. Highly recommend!",
      product: "Soléra Aviator"
    },
    {
      id: 2,
      name: "Thomas M.",
      rating: 5,
      date: "1 week ago",
      text: "The virtual try-on feature is a game changer. I was hesitant to buy online but it helped me pick the perfect frame for my face shape. Great experience.",
      product: "Equinox Classic"
    },
    {
      id: 3,
      name: "Julie R.",
      rating: 4,
      date: "2 weeks ago",
      text: "Beautiful glasses, exactly as described. Customer support was very helpful when I had a question about the size. Will definitely buy again.",
      product: "Aurélia Oversized"
    },
    {
      id: 4,
      name: "Marc D.",
      rating: 5,
      date: "3 weeks ago",
      text: "Premium quality from start to finish. The unboxing experience felt special. The glasses are comfortable and stylish.",
      product: "Artis Master"
    },
    {
      id: 5,
      name: "Emma S.",
      rating: 5,
      date: "1 month ago",
      text: "I love my new Lumina sunglasses! They arrived quickly and in perfect condition. Optic Glass is now my go-to for eyewear.",
      product: "Lumina So Chic"
    },
    {
      id: 6,
      name: "Antoine B.",
      rating: 4,
      date: "1 month ago",
      text: "Wide selection of brands and models. Prices are competitive for premium items. Fast shipping to Lyon.",
      product: "Zenith Sport"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c9a227]/20 rounded-full mb-6 text-[#c9a227]">
            <Quote size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Customer <span className="text-[#c9a227]">Reviews</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Discover what our community is saying about their Optic Glass experience.
            Join thousands of satisfied customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 hover:border-[#c9a227]/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{review.name}</h3>
                    <p className="text-xs text-white/40">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 text-[#c9a227]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < review.rating ? "currentColor" : "none"} 
                      className={i < review.rating ? "" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-6 relative">
                <Quote size={24} className="text-[#c9a227]/20 absolute -top-2 -left-2" />
                <p className="text-white/80 leading-relaxed italic pl-4">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/50">
                  Ordered: <span className="text-[#c9a227]">{review.product}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-white/5 rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            We value your feedback. It helps us improve and serve you better every day.
          </p>
          <button className="px-8 py-4 bg-[#c9a227] text-black font-bold rounded-xl hover:bg-[#d4af37] transition-all shadow-lg">
            Write a Review
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;
