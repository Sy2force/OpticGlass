import { motion } from 'framer-motion';
import { Award, Users, Heart, Globe, Sparkles, Eye, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeContext';

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  const timeline = [
    { year: '2018', title: 'Foundation', description: 'Creation of Optic Glass with a vision: making elegance accessible.' },
    { year: '2019', title: 'First Boutique', description: 'Opening of our first boutique in Paris.' },
    { year: '2020', title: 'E-commerce', description: 'Launch of our online platform.' },
    { year: '2021', title: 'Expansion', description: 'Opening of 5 new boutiques in France.' },
    { year: '2022', title: 'Innovation', description: 'Introduction of virtual try-on.' },
    { year: '2023', title: 'Excellence', description: 'Over 100,000 satisfied customers.' },
  ];

  const values = [
    { icon: Eye, title: 'Excellence', description: 'We select only the best designs.' },
    { icon: Heart, title: 'Passion', description: 'Optics has always been our passion.' },
    { icon: Shield, title: 'Trust', description: '2-year warranty on all our products.' },
    { icon: Truck, title: 'Service', description: 'Free delivery and 30-day returns.' },
  ];

  const team = [
    { name: 'Sophie Martin', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
    { name: 'Marc Dubois', role: 'Artistic Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
    { name: 'Claire Pandit', role: 'Chief Optician', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
    { name: 'Thomas Laurent', role: 'E-commerce Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
  ];

  const stats = [
    { value: '100K+', label: 'Satisfied Customers' },
    { value: '50+', label: 'Partner Brands' },
    { value: '15', label: 'Stores in France' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Hero Section - Premium Design */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Elegant Glasses */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')`,
          }}
        />
        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        {/* Decorative Elements - Subtle */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-[#c9a227]/10 rounded-full opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-[#c9a227]/5 rounded-full opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl"
        >
          {/* Golden Line Top */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6"
          />
          
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Story
          </motion.p>
          
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6"
          >
            Excellence For Your{' '}
            <span className="italic text-[#c9a227]">Vision</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Since 2018, we have been revolutionizing premium eyewear with passion and expertise
          </motion.p>
          
          {/* Golden Line Bottom */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto"
          />
        </motion.div>
        
      </section>

      {/* Stats Section - Premium Dark */}
      <section className={`py-20 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-[#0a0a0a]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-5xl md:text-6xl font-serif font-bold text-[#c9a227] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Premium */}
      <section className={`py-24 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">About Us</p>
              <h2 className={`text-4xl md:text-5xl font-serif mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our <span className="italic text-[#c9a227]">Mission</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#c9a227] to-transparent mb-8" />
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                At Optic Glass, we believe that everyone deserves to see the world with style.
                Our mission is to make premium eyewear accessible while offering an exceptional shopping experience.
              </p>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                We work directly with the greatest eyewear houses to offer you exclusive collections at fair prices, accompanied by impeccable customer service.
              </p>
              <Link
                to="/glasses"
                className="inline-block px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all"
              >
                Discover our collections
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
                alt="Premium Sunglasses"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className={`absolute -bottom-6 -left-6 ${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white'} rounded-lg shadow-xl p-6`}>
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-[#c9a227]" />
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Certified Excellence</div>
                    <div className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Premium Service</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Premium */}
      <section className={`py-24 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">What We Stand For</p>
            <h2 className={`text-4xl md:text-5xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our <span className="italic text-[#c9a227]">Values</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'} rounded-lg p-8 shadow-lg hover:shadow-xl transition-all text-center group`}
                >
                  <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#c9a227]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#c9a227]" />
                  </div>
                  <h3 className={`text-xl font-serif mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                  <p className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section - Premium */}
      <section className={`py-24 px-4 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Our History</p>
            <h2 className={`text-4xl md:text-5xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our <span className="italic text-[#c9a227]">Journey</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#c9a227]/50 via-[#c9a227]/20 to-transparent" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className={`${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'} rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow`}>
                    <div className="text-[#c9a227] font-serif text-2xl mb-1">{item.year}</div>
                    <h3 className={`font-serif text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>{item.description}</p>
                  </div>
                </div>
                
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#c9a227] rounded-full border-4 ${isDarkMode ? 'border-[#0a0a0a]' : 'border-white'} shadow`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Premium */}
      <section className={`py-24 px-4 ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">The People Behind</p>
            <h2 className={`text-4xl md:text-5xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our <span className="italic text-[#c9a227]">Team</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${isDarkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group`}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className={`font-serif text-xl mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className="text-[#c9a227] text-sm tracking-wider">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/20 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#c9a227] text-sm tracking-[0.3em] uppercase mb-4">Start Your Journey</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Join the Optic Glass <span className="italic text-[#c9a227]">Adventure</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-6" />
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              Discover our collections and find the perfect glasses for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/glasses"
                className="px-8 py-4 bg-[#c9a227] text-black font-semibold tracking-wider uppercase text-sm hover:bg-[#d4af37] transition-all"
              >
                View collections
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold tracking-wider uppercase text-sm hover:border-[#c9a227] hover:text-[#c9a227] transition-all"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
