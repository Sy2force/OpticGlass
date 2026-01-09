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

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image (JPG, PNG, etc.)');
      return;
    }

    // Créer le nom de fichier basé sur le produit
    const filename = `${product.brand.toLowerCase().replace(/\s+/g, '-')}_${product.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}.jpg`;
    
    setUploadStatus(prev => ({ ...prev, [product._id]: 'uploading' }));

    try {
      // Créer FormData pour l'upload
      const formData = new FormData();
      formData.append('image', file, filename);
      formData.append('productId', product._id);
      formData.append('filename', filename);

      // Pour le moment, on simule l'upload car on n'a pas de backend
      // En production, tu ferais: await fetch('/api/upload-image', { method: 'POST', body: formData })
      
      // Simuler l'upload (2 secondes)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus(prev => ({ ...prev, [product._id]: 'success' }));
      
      alert(`✅ Image uploadée avec succès!\n\nFichier: ${filename}\n\nPour l'instant c'est une simulation.\nEn production, l'image sera sauvegardée dans frontend/public/images/products/`);
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [product._id]: 'error' }));
      alert('❌ Erreur lors de l\'upload: ' + error.message);
    }
  };

  const triggerFileInput = (productId) => {
    document.getElementById(`file-input-${productId}`).click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📸 Gestion des Images Produits
          </h1>
          <p className="text-gray-600">
            Uploadez les images manquantes pour vos produits
          </p>
          
          {/* Stats */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Avec Images</p>
                  <p className="text-2xl font-bold text-green-700">
                    {products.length - productsNeedingImages.length}
                  </p>
                </div>
                <Check className="text-green-600" size={32} />
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Sans Images</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {productsNeedingImages.length}
                  </p>
                </div>
                <ImageIcon className="text-orange-600" size={32} />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Produits</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {products.length}
                  </p>
                </div>
                <Upload className="text-blue-600" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">📝 Instructions</h3>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Cliquez sur le bouton "Télécharger Image" pour un produit</li>
            <li>Sélectionnez une image depuis votre ordinateur</li>
            <li>L'image sera automatiquement renommée et uploadée</li>
            <li>Rafraîchissez la page pour voir l'image sur le site</li>
          </ol>
        </div>

        {/* Liste des produits sans images */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Produits Sans Images ({productsNeedingImages.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {productsNeedingImages.map(product => {
              const status = uploadStatus[product._id];
              const filename = `${product.brand.toLowerCase().replace(/\s+/g, '-')}_${product.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}.jpg`;
              
              return (
                <div key={product._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                          {product.brand}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Catégorie: {product.category}</span>
                        <span>•</span>
                        <span>Prix: {product.price} ₪</span>
                      </div>
                      
                      <p className="text-xs text-gray-400 mt-2 font-mono">
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
                            ? 'bg-gray-400 text-white cursor-wait'
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
                <Check className="mx-auto mb-4 text-green-600" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  🎉 Toutes les images sont uploadées !
                </h3>
                <p className="text-gray-600">
                  Tous vos produits ont maintenant des images.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Note Technique</h3>
          <p className="text-sm text-blue-700">
            Cette interface est actuellement en mode simulation. En production, les images seraient uploadées vers un serveur backend ou un service de stockage cloud (Cloudinary, AWS S3, etc.). Pour l'instant, tu dois copier manuellement les images dans <code className="bg-blue-100 px-2 py-1 rounded">frontend/public/images/products/</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminImagesPage;
