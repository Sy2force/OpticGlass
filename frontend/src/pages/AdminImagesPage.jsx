import { useState, useEffect } from 'react';
import { products as localProducts } from '../shared/data/products'; // Fallback
import { Upload, Check, Image as ImageIcon, RefreshCw, Camera } from 'lucide-react';
import api from '@/shared/api/api';

const AdminImagesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first
      const response = await api.get('/products?limit=1000');
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        // Fallback to local data if API fails or returns empty (should not happen if seeded)
        setProducts(localProducts);
      }
    } catch (error) {
      console.error('Error fetching products, using local fallback', error);
      setProducts(localProducts);
    } finally {
      setLoading(false);
    }
  };

  // Identifier les produits sans image locale (ou avec placeholder)
  const productsNeedingImages = products.filter(product => {
    const imageUrl = product.images?.[0] || product.image || '';
    // On considère qu'il faut une image si c'est vide, ou si c'est un placeholder générique
    return !imageUrl || imageUrl.includes('via.placeholder') || imageUrl === '';
  });

  const handleImageUpload = async (product, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image (JPG, PNG, etc.)');
      return;
    }

    setUploadStatus(prev => ({ ...prev, [product._id]: 'uploading' }));

    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Upload the image
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = uploadResponse.data.image; // e.g. /uploads/image-123.jpg

      // 2. Update the product in the database
      
      const fullImageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3005'}${imageUrl}`;

      await api.put(`/products/${product._id}`, {
        image: fullImageUrl,
        images: [fullImageUrl]
      });

      // 3. Update local state
      setProducts(prev => prev.map(p => 
        p._id === product._id 
          ? { ...p, image: fullImageUrl, images: [fullImageUrl] } 
          : p
      ));

      setUploadStatus(prev => ({ ...prev, [product._id]: 'success' }));
      // alert(`✅ Image uploadée avec succès!`);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(prev => ({ ...prev, [product._id]: 'error' }));
      alert('Upload error: ' + (error.response?.data?.message || error.message));
    }
  };

  const triggerFileInput = (productId) => {
    document.getElementById(`file-input-${productId}`).click();
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Camera size={28} className="text-[#c9a227]" /> Product Images Management
          </h1>
          <button 
            onClick={fetchProducts}
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors"
            title="Refresh list"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        <p className="text-white/60">
          Upload missing images for your products. Images are stored on the server.
        </p>
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 font-medium">With Images</p>
                <p className="text-2xl font-bold text-green-500">
                  {products.length - productsNeedingImages.length}
                </p>
              </div>
              <Check className="text-green-500" size={32} />
            </div>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 font-medium">Without Images</p>
                <p className="text-2xl font-bold text-orange-500">
                  {productsNeedingImages.length}
                </p>
              </div>
              <ImageIcon className="text-orange-500" size={32} />
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 font-medium">Total Products</p>
                <p className="text-2xl font-bold text-blue-500">
                  {products.length}
                </p>
              </div>
              <Upload className="text-blue-500" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Liste des produits sans images */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white">
            Products needing images ({productsNeedingImages.length})
          </h2>
        </div>
        
        {productsNeedingImages.length === 0 ? (
          <div className="p-12 text-center">
            <Check className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">
              All images uploaded successfully!
            </h3>
            <p className="text-white/60">
              All your products now have images.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {productsNeedingImages.map(product => {
              const status = uploadStatus[product._id];
              const suggestedFilename = `${product.brand.toLowerCase()}-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
              
              return (
                <div key={product._id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h3 className="font-semibold text-white text-lg">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <span className="capitalize">Cat: {product.category}</span>
                        <span>•</span>
                        <span className="text-[#c9a227] font-bold">{product.price} €</span>
                      </div>
                      
                      <p className="text-xs text-white/30 mt-2 font-mono">
                        ID: {product._id} | Suggestion: {suggestedFilename}
                      </p>
                    </div>
                    
                    <div className="ml-6 flex items-center gap-4">
                      <input
                        type="file"
                        id={`file-input-${product._id}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(product, e.target.files[0])}
                      />
                      
                      <button
                        onClick={() => triggerFileInput(product._id)}
                        disabled={status === 'uploading'}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                          status === 'success'
                            ? 'bg-green-600 text-white'
                            : status === 'uploading'
                            ? 'bg-white/10 text-white cursor-wait'
                            : 'bg-[#c9a227] text-black hover:bg-[#b8912a]'
                        }`}
                      >
                        {status === 'uploading' ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            Upload...
                          </>
                        ) : status === 'success' ? (
                          <>
                            <Check size={20} />
                            Fait
                          </>
                        ) : (
                          <>
                            <Upload size={20} />
                            Télécharger
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminImagesPage;
