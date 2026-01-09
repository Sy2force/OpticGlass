import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Calendar, Award, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api';

const RecommendationsPage = () => {
  
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingReco, setEditingReco] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'trend',
    imageUrl: '',
    tags: '',
    priority: 5,
    isActive: true
  });

  const categories = [
    { id: 'all', label: 'Tout', icon: Sparkles },
    { id: 'trend', label: 'Tendances', icon: TrendingUp },
    { id: 'season', label: 'Saison', icon: Calendar },
    { id: 'news', label: 'News', icon: Award },
    { id: 'conseil', label: 'Conseils', icon: Sparkles }
  ];

  useEffect(() => {
    fetchRecommendations();
  }, [selectedCategory]);

  // Données mock pour les recommandations
  const mockRecommendations = [
    {
      _id: '1',
      title: 'Les lunettes oversize dominent 2024',
      description: 'Les montures XXL sont la tendance phare de cette année. Découvrez comment les porter avec style et élégance pour un look audacieux.',
      category: 'trend',
      imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600',
      tags: ['oversize', 'trend', '2024'],
      priority: 10,
      isActive: true,
    },
    {
      _id: '2',
      title: 'Collection Été : protégez vos yeux avec style',
      description: 'Notre sélection de lunettes de soleil pour l\'été. Protection UV maximale et designs tendances pour profiter du soleil en toute sécurité.',
      category: 'season',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
      tags: ['summer', 'sun', 'protection'],
      priority: 9,
      isActive: true,
    },
    {
      _id: '3',
      title: 'Nouveauté : Ray-Ban Stories 2024',
      description: 'Les nouvelles lunettes connectées Ray-Ban arrivent avec des fonctionnalités révolutionnaires. Découvrez notre test complet.',
      category: 'news',
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      tags: ['ray-ban', 'connected', 'innovation'],
      priority: 8,
      isActive: true,
    },
    {
      _id: '4',
      title: 'Comment choisir ses lunettes selon son visage',
      description: 'Guide complet pour trouver la monture parfaite. Visage rond, ovale, carré... Nos experts vous conseillent.',
      category: 'conseil',
      imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600',
      tags: ['conseil', 'morphologie', 'guide'],
      priority: 7,
      isActive: true,
    },
    {
      _id: '5',
      title: 'Le retour du vintage : style années 70',
      description: 'Les montures rétro font leur grand retour. Découvrez notre sélection de lunettes vintage revisitées.',
      category: 'trend',
      imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600',
      tags: ['vintage', 'rétro', '70s'],
      priority: 6,
      isActive: true,
    },
    {
      _id: '6',
      title: 'Gucci x Optic Glass : collection exclusive',
      description: 'En exclusivité chez Optic Glass, découvrez la nouvelle collection Gucci avec des modèles uniques et raffinés.',
      category: 'news',
      imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600',
      tags: ['gucci', 'exclusive', 'luxe'],
      priority: 5,
      isActive: true,
    },
  ];

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const endpoint = selectedCategory === 'all' 
        ? `${API_URL}/recommendations/active`
        : `${API_URL}/recommendations?category=${selectedCategory}&isActive=true`;
      
      const response = await axios.get(endpoint);
      if (response.data.data && response.data.data.length > 0) {
        setRecommendations(response.data.data);
      } else {
        // Utiliser les données mock
        const filtered = selectedCategory === 'all' 
          ? mockRecommendations 
          : mockRecommendations.filter(r => r.category === selectedCategory);
        setRecommendations(filtered);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des recommandations:', error);
      // Utiliser les données mock en cas d'erreur
      const filtered = selectedCategory === 'all' 
        ? mockRecommendations 
        : mockRecommendations.filter(r => r.category === selectedCategory);
      setRecommendations(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingReco) {
        await axios.put(`${API_URL}/recommendations/${editingReco._id}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/recommendations`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setShowAdminModal(false);
      setEditingReco(null);
      resetForm();
      fetchRecommendations();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde de la recommandation');
    }
  };

  const handleSupprime = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette recommandation ?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/recommendations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecommendations();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (reco) => {
    setEditingReco(reco);
    setFormData({
      title: reco.title,
      description: reco.description,
      category: reco.category,
      imageUrl: reco.imageUrl,
      tags: reco.tags.join(', '),
      priority: reco.priority,
      isActive: reco.isActive
    });
    setShowAdminModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'trend',
      imageUrl: '',
      tags: '',
      priority: 5,
      isActive: true
    });
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Sparkles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            Nos <span className="text-primary">Recommendations</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez nos sélections tendances, conseils d'experts et nouveautés de la saison
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Icon size={20} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {user?.isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <button
              onClick={() => {
                setEditingReco(null);
                resetForm();
                setShowAdminModal(true);
              }}
              className="bg-primary hover:bg-[#d4af37] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Ajouter une recommandation
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : recommendations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-xl">Aucune recommandation disponible pour le moment</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((reco, index) => {
              const Icon = getCategoryIcon(reco.category);
              return (
                <motion.div
                  key={reco._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={reco.imageUrl || '/images/default-glasses.jpg'}
                      alt={reco.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                      <Icon size={16} className="text-white" />
                      <span className="text-white text-sm font-medium capitalize">{reco.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {reco.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{reco.description}</p>
                    
                    {reco.tags && reco.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {reco.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {user?.isAdmin && (
                      <div className="flex gap-2 pt-4 border-t border-white/10">
                        <button
                          onClick={() => handleEdit(reco)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Edit2 size={16} />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleSupprime(reco._id)}
                          className="flex-1 bg-red-600 hover:bg-[#d4af37] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdminModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {editingReco ? 'Modifier la recommandation' : 'Nouvelle recommandation'}
                </h2>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Titre</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-32 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="trend">Tendance</option>
                      <option value="season">Saison</option>
                      <option value="style">Style</option>
                      <option value="news">News</option>
                      <option value="conseil">Conseil</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Priorité (0-10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">URL de l'image</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="/images/recommendation.jpg"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Tags (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="trend, summer, sport"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isActive" className="text-white font-medium">
                    Recommandation active
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-[#d4af37] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {editingReco ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendationsPage;
