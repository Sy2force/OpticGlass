import { motion } from 'framer-motion';
import { Award, Users, Heart, Globe, Sparkles, Eye, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  

  const timeline = [
    { year: '2018', title: 'Foundation', description: 'Creation of Optic Glass with a vision: making luxury accessible.' },
    { year: '2019', title: 'First Boutique', description: 'Opening of our first boutique in Paris.' },
    { year: '2020', title: 'E-commerce', description: 'Launch of our online platform.' },
    { year: '2021', title: 'Expansion', description: 'Opening of 5 new boutiques in France.' },
    { year: '2022', title: 'Innovation', description: 'Introduction of virtual try-on.' },
    { year: '2023', title: 'Excellence', description: 'Over 100,000 satisfied customers.' },
  ];

  const values = [
    { icon: Eye, title: 'Excellence', description: 'We select only the best brands.' },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227] rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Our History</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Excellence For Your Vision
          </h1>
          <p className="text-xl text-white/90">
            Since 2018, we have been revolutionizing luxury eyewear
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#c9a227]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Optic Glass, we believe that everyone deserves to see the world with style.
                Our mission is to make luxury eyewear accessible while offering an exceptional shopping experience.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We work directly with the greatest eyewear houses to offer you exclusive collections at fair prices, accompanied by impeccable customer service.
              </p>
              <Link
                to="/glasses"
                className="inline-block px-8 py-4 bg-[#c9a227] text-white font-semibold rounded-xl hover:bg-[#d4af37] transition-all shadow-lg"
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
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600"
                alt="Optic Glass Store"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-[#c9a227]" />
                  <div>
                    <div className="font-bold">Certified Excellence</div>
                    <div className="text-sm text-gray-500">Premium Service</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What guides us every day</p>
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
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
                >
                  <div className="w-16 h-16 bg-[#c9a227]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#c9a227]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">A story of excellence and innovation</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#c9a227]/20" />
            
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
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="text-[#c9a227] font-bold text-lg mb-1">{item.year}</div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#c9a227] rounded-full border-4 border-white shadow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Passionate experts at your service</p>
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
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-[#c9a227]">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#c9a227] via-[#8B0000] to-[#c9a227]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4">Join the Optic Glass Adventure</h2>
            <p className="text-xl text-white/90 mb-8">
              Discover our collections and find the perfect glasses for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/glasses"
                className="px-8 py-4 bg-white text-[#c9a227] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-xl"
              >
                View collections
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#c9a227] transition-all"
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
