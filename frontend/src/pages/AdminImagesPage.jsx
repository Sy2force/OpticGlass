import { useState } from 'react';
import { products } from '../shared/data/products';
import { Upload, Check, Image as ImageIcon } from 'lucide-react';

const AdminImagesPage = () => {
  const [uploadStatus, setUploadStatus] = useState({});

  // Identifier les produits sans image locale
  const productsNeedingImages = products.filter(product => {
    const imageUrl = product.images?.[0] || product.image || '';
    // Ray-Ban et images externes sont OK
    return !imageUrl.includes('ray-ban.com') && !imageUrl.startsWith('http');
  });

  const handleImageUpload = async (product, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image (JPG, PNG, etc.)');
      return;
    }

    const filename = `${product.brand.toLowerCase().replace(/\s+/g, '-')}_${product.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}.jpg`;
    
    setUploadStatus(prev => ({ ...prev, [product._id]: 'uploading' }));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus(prev => ({ ...prev, [product._id]: 'success' }));
      alert(`✅ Image uploadée avec succès!\n\nFichier: ${filename}\n\nPour l'instant c'est une simulation.`);
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [product._id]: 'error' }));
      alert('❌ Erreur lors de l\'upload: ' + error.message);
    }
  };

  const triggerFileInput = (productId) => {
    document.getElementById(`file-input-${productId}`).click();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          📸 Gestion des Images Produits
        </h1>
        <p className="text-white/60">
          Uploadez les images manquantes pour vos produits
        </p>
        
        {/* Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 font-medium">Avec Images</p>
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
                <p className="text-sm text-orange-400 font-medium">Sans Images</p>
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
                <p className="text-sm text-blue-400 font-medium">Total Produits</p>
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
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            Produits Sans Images ({productsNeedingImages.length})
          </h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {productsNeedingImages.map(product => {
            const status = uploadStatus[product._id];
            const filename = `${product.brand.toLowerCase().replace(/\s+/g, '-')}_${product.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}.jpg`;
            
            return (
              <div key={product._id} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded">
                        {product.brand}
                      </span>
                      <h3 className="font-semibold text-white">
                        {product.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>Catégorie: {product.category}</span>
                      <span>•</span>
                      <span>Prix: {product.price} ₪</span>
                    </div>
                    
                    <p className="text-xs text-white/40 mt-2 font-mono">
                      Fichier attendu: {filename}
                    </p>
                  </div>
                  
                  <div className="ml-6">
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
                          Uploadée
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          Télécharger Image
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {productsNeedingImages.length === 0 && (
            <div className="p-12 text-center">
              <Check className="mx-auto mb-4 text-green-500" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                🎉 Toutes les images sont uploadées !
              </h3>
              <p className="text-white/60">
                Tous vos produits ont maintenant des images.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminImagesPage;
