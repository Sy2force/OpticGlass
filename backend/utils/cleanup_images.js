import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../../frontend/public/images/products');

const cleanupImages = () => {
  console.log('🧹 Starting image cleanup...');
  
  // 1. Collect all used images from products
  const usedImages = new Set();
  products.forEach(p => {
    p.images.forEach(img => {
      // img is like "/images/products/filename.jpg"
      const filename = path.basename(img);
      usedImages.add(filename);
    });
  });
  
  // Always keep README and .gitkeep
  usedImages.add('README.md');
  usedImages.add('.gitkeep');

  console.log(`✅ Identified ${usedImages.size} used files (including system files).`);

  // 2. Scan directory
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Images directory not found.');
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  let deletedCount = 0;

  files.forEach(file => {
    if (!usedImages.has(file)) {
      const filePath = path.join(IMAGES_DIR, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Deleted unused: ${file}`);
        deletedCount++;
      } catch (err) {
        console.error(`❌ Failed to delete ${file}:`, err.message);
      }
    }
  });

  console.log(`\n🎉 Cleanup complete! Deleted ${deletedCount} files.`);
};

cleanupImages();
