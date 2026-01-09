import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';

const StoresPage = () => {
  
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStore, setActiveStore] = useState(null);

  const stores = [
    {
      id: 1,
      name: 'Optic Glass Paris Champs-Élysées',
      address: '75 Avenue des Champs-Élysées, 75008 Paris',
      phone: '+33 1 42 25 96 47',
      heures: 'Lun-Sam: 10h-20h, Dim: 11h-19h',
      city: 'Paris',
      lat: 48.8698,
      lng: 2.3078,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937586!2d2.3016003156743895!3d48.8697866792869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8f%3A0x40b82c3688c9460!2sChamps-%C3%89lys%C3%A9es%2C%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1234567890"
    },
    {
      id: 2,
      name: 'Optic Glass Lyon Part-Dieu',
      address: '17 Rue du Docteur Borchut, 69003 Lyon',
      phone: '+33 4 78 60 12 34',
      heures: 'Lun-Sam: 9h30-19h30',
      city: 'Lyon',
      lat: 45.7603,
      lng: 4.8517,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.5568446224757!2d4.8517!3d45.7603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea516987f0b9%3A0x108336124576880!2sLyon!5e0!3m2!1sen!2sfr!4v1234567890"
    },
    {
      id: 3,
      name: 'Optic Glass Marseille Vieux-Port',
      address: '45 Quai du Port, 13002 Marseille',
      phone: '+33 4 91 90 12 34',
      heures: 'Lun-Sam: 10h-19h',
      city: 'Marseille',
      lat: 43.2965,
      lng: 5.3698,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.456!2d5.3698!3d43.2965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMarseille!5e0!3m2!1sen!2sfr!4v1234567890"
    },
    {
      id: 4,
      name: 'Optic Glass Bordeaux Centre',
      address: '28 Cours de l\'Intendance, 33000 Bordeaux',
      phone: '+33 5 56 44 12 34',
      heures: 'Lun-Sam: 10h-19h',
      city: 'Bordeaux',
      lat: 44.8378,
      lng: -0.5792,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.123!2d-0.5792!3d44.8378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBordeaux!5e0!3m2!1sen!2sfr!4v1234567890"
    },
    {
      id: 5,
      name: 'Optic Glass Nice Promenade',
      address: '12 Promenade des Anglais, 06000 Nice',
      phone: '+33 4 93 87 12 34',
      heures: 'Lun-Sam: 9h30-19h30, Dim: 10h-18h',
      city: 'Nice',
      lat: 43.6947,
      lng: 7.2659,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.567!2d7.2659!3d43.6947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNice!5e0!3m2!1sen!2sfr!4v1234567890"
    },
    {
      id: 6,
      name: 'Optic Glass Toulouse Capitole',
      address: '8 Place du Capitole, 31000 Toulouse',
      phone: '+33 5 61 23 12 34',
      heures: 'Lun-Sam: 10h-19h',
      city: 'Toulouse',
      lat: 43.6043,
      lng: 1.4437,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.789!2d1.4437!3d43.6043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sToulouse!5e0!3m2!1sen!2sfr!4v1234567890"
    }
  ];

  const cities = ['all', ...new Set(stores.map(store => store.city))];

  const filteredStores = stores.filter(store => {
    const matchesCity = selectedCity === 'all' || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <MapPin size={40} className="text-primary" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            Nos <span className="text-primary">Stores</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trouvez la boutique Optic Glass la plus proche de chez vous
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une boutique..."
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <motion.button
                key={city}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-primary text-white shadow-lg shadow-primary/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                {city === 'all' ? 'Toutes les villes' : city}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {filteredStores.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center"
              >
                <MapPin size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Aucune boutique trouvée</p>
              </motion.div>
            ) : (
              filteredStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setActiveStore(store);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                        {store.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        {store.city}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full transition-colors ${
                        activeStore?.id === store.id ? 'bg-primary text-white' : 'bg-primary/20 text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      <MapPin size={20} />
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone size={18} className="text-primary flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:text-primary transition-colors">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock size={18} className="text-primary flex-shrink-0" />
                      <span>{store.heures}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-primary hover:bg-[#d4af37] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`, '_blank')}
                  >
                    <Navigation size={18} />
                    Directions
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video bg-gray-800 relative">
                <iframe
                  src={activeStore ? activeStore.mapUrl : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937586!2d2.3016003156743895!3d48.8697866792869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8f%3A0x40b82c3688c9460!2sChamps-%C3%89lys%C3%A9es%2C%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1234567890"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {activeStore ? activeStore.name : 'Carte interactive'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {activeStore 
                    ? `Retrouvez-nous au ${activeStore.address}. ${activeStore.heures}` 
                    : 'Cliquez sur une boutique pour voir sa localisation exacte sur la carte.'}
                </p>
                {activeStore && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary hover:bg-[#d4af37] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-4"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${activeStore.lat},${activeStore.lng}`, '_blank')}
                  >
                    <Navigation size={18} />
                    Itinéraire
                  </motion.button>
                )}
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary font-medium text-sm">
                    💡 Conseil : Appelez avant de venir pour vérifier la disponibilité des produits
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">Services en boutique</h3>
              <ul className="space-y-3">
                {[
                  'Ajustement personnalisé',
                  'Ajustement gratuit',
                  'Examen de vue sur RDV',
                  'Réparations express',
                  'Conseils d\'experts',
                  'Garantie 2 ans'
                ].map((service, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
