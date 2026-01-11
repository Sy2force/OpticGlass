import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../../frontend/public/images/products');
const RELATIVE_DIR = '/images/products';

// Helper to check if file exists
const fileExists = (filename) => {
  try {
    return fs.existsSync(path.join(IMAGES_DIR, filename));
  } catch (e) {
    return false;
  }
};

const getAvailableImages = () => {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    // Filter for valid images (jpg/png) and reasonable size (> 5KB to avoid broken ones)
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') return false;
      const stats = fs.statSync(path.join(IMAGES_DIR, file));
      return stats.size > 5000; // > 5KB
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
};

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const distributeImages = () => {
  console.log('🔄 Starting image distribution...');
  
  const allImages = getAvailableImages();
  console.log(`📸 Found ${allImages.length} valid local images.`);

  if (allImages.length === 0) {
    console.error('❌ No images found! Aborting.');
    return;
  }

  // Dynamic Pools Construction
  const opticalPool = [];
  const sunPool = [];

  allImages.forEach(filename => {
    // Categorize by filename prefix (sun- or optical-)
    if (filename.startsWith('optical')) {
      opticalPool.push(filename);
    } else if (filename.startsWith('sun')) {
      sunPool.push(filename);
    } else {
      // Fallback to sun pool
      sunPool.push(filename);
    }
  });

  // Fallback if pools are empty (should not happen with good downloads, but safety first)
  const finalOpticalPool = opticalPool.length > 0 ? opticalPool : allImages;
  const finalSunPool = sunPool.length > 0 ? sunPool : allImages;

  console.log(`👓 Optical Pool: ${opticalPool.length} images (Backup: ${finalOpticalPool.length})`);
  console.log(`🕶️  Sun Pool: ${sunPool.length} images (Backup: ${finalSunPool.length})`);

  // Track used images to avoid duplicates
  const usedOpticalImages = new Set();
  const usedSunImages = new Set();

  const updatedProducts = products.map((product, index) => {
    const slug = `${slugify(product.brand)}-${slugify(product.name)}.jpg`;
    
    // 1. Try Specific Image (Exact Match)
    if (allImages.includes(slug)) {
      console.log(`✅ Found specific: ${slug} for ${product.name}`);
      return { ...product, images: [`${RELATIVE_DIR}/${slug}`] };
    }
    
    // 2. Determine Category
    const isOptical = product.category === 'optical' || 
                     product.description.toLowerCase().includes('optical') ||
                     product.name.includes('Optical');
    
    const pool = isOptical ? finalOpticalPool : finalSunPool;
    const usedSet = isOptical ? usedOpticalImages : usedSunImages;
    
    // 3. Find an unused image from the pool
    let selectedImage = null;
    
    // First pass: find unused image
    for (let i = 0; i < pool.length; i++) {
      const candidateIndex = (index + i) % pool.length;
      const candidate = pool[candidateIndex];
      if (!usedSet.has(candidate)) {
        selectedImage = candidate;
        usedSet.add(candidate);
        break;
      }
    }
    
    // If all images used, reset and pick based on index (allow reuse)
    if (!selectedImage) {
      usedSet.clear();
      selectedImage = pool[index % pool.length];
      usedSet.add(selectedImage);
    }
    
    console.log(`⚠️  Using fallback (${isOptical ? 'Optical' : 'Sun'}): ${selectedImage} for ${product.name}`);
    
    // Generate a unique _id if not present
    const productId = product._id || `prod_${index + 1}_${Date.now().toString(36)}`;
    
    return { ...product, _id: productId, images: [`${RELATIVE_DIR}/${selectedImage}`] };
  });
  
  // Write result
  const fileContent = `export const products = ${JSON.stringify(updatedProducts, null, 2)};\n\nexport default products;\n`;
  const productsFilePath = path.join(__dirname, '../data/products.js');
  
  fs.writeFileSync(productsFilePath, fileContent);
  console.log(`💾 Products file updated: ${productsFilePath}`);
};

distributeImages();
