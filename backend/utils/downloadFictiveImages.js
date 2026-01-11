import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../../frontend/public/images/products');

// Ensure directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Free stock images from Pexels - Generic eyewear photos (NO BRAND LOGOS)
// These are specifically selected to show only generic glasses without any visible branding
const fictiveImages = {
  sunglasses: [
    { name: 'sun-aviator-gold-1.jpg', url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?w=800' },
    { name: 'sun-aviator-silver-1.jpg', url: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?w=800' },
    { name: 'sun-classic-black-1.jpg', url: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?w=800' },
    { name: 'sun-round-gold-1.jpg', url: 'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?w=800' },
    { name: 'sun-square-black-1.jpg', url: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800' },
    { name: 'sun-vintage-brown-1.jpg', url: 'https://images.pexels.com/photos/1493111/pexels-photo-1493111.jpeg?w=800' },
    { name: 'sun-sport-blue-1.jpg', url: 'https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?w=800' },
    { name: 'sun-cat-eye-1.jpg', url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?w=800' },
    { name: 'sun-oversized-1.jpg', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=800' },
    { name: 'sun-retro-1.jpg', url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=800' },
    { name: 'sun-mirror-1.jpg', url: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?w=800' },
    { name: 'sun-gradient-1.jpg', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=800' },
    { name: 'sun-polarized-1.jpg', url: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?w=800' },
    { name: 'sun-fashion-1.jpg', url: 'https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?w=800' },
    { name: 'sun-beach-1.jpg', url: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?w=800' },
    { name: 'sun-modern-1.jpg', url: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?w=800' },
    { name: 'sun-luxury-1.jpg', url: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?w=800' },
    { name: 'sun-trendy-1.jpg', url: 'https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?w=800' },
    { name: 'sun-classic-2.jpg', url: 'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?w=800' },
    { name: 'sun-sport-2.jpg', url: 'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?w=800' },
    { name: 'sun-elegant-1.jpg', url: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?w=800' },
    { name: 'sun-stylish-1.jpg', url: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?w=800' },
    { name: 'sun-premium-1.jpg', url: 'https://images.pexels.com/photos/2282000/pexels-photo-2282000.jpeg?w=800' },
    { name: 'sun-designer-1.jpg', url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=800' },
    { name: 'sun-summer-1.jpg', url: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?w=800' },
    { name: 'sun-bold-1.jpg', url: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?w=800' },
    { name: 'sun-minimal-1.jpg', url: 'https://images.pexels.com/photos/2811089/pexels-photo-2811089.jpeg?w=800' },
    { name: 'sun-chic-1.jpg', url: 'https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg?w=800' },
    { name: 'sun-urban-1.jpg', url: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=800' },
    { name: 'sun-cool-1.jpg', url: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?w=800' },
    { name: 'sun-statement-1.jpg', url: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?w=800' },
    { name: 'sun-everyday-1.jpg', url: 'https://images.pexels.com/photos/3206079/pexels-photo-3206079.jpeg?w=800' },
    { name: 'sun-casual-1.jpg', url: 'https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?w=800' },
    { name: 'sun-iconic-1.jpg', url: 'https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?w=800' },
    { name: 'sun-timeless-1.jpg', url: 'https://images.pexels.com/photos/3394225/pexels-photo-3394225.jpeg?w=800' },
    { name: 'sun-classic-3.jpg', url: 'https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?w=800' },
    { name: 'sun-modern-2.jpg', url: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?w=800' },
    { name: 'sun-fashion-2.jpg', url: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?w=800' },
    { name: 'sun-trendy-2.jpg', url: 'https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?w=800' },
    { name: 'sun-luxury-2.jpg', url: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?w=800' },
  ],
  optical: [
    { name: 'optical-round-gold-1.jpg', url: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?w=800' },
    { name: 'optical-square-black-1.jpg', url: 'https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?w=800' },
    { name: 'optical-classic-1.jpg', url: 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?w=800' },
    { name: 'optical-modern-1.jpg', url: 'https://images.pexels.com/photos/1068866/pexels-photo-1068866.jpeg?w=800' },
    { name: 'optical-vintage-1.jpg', url: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?w=800' },
    { name: 'optical-minimal-1.jpg', url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=800' },
    { name: 'optical-elegant-1.jpg', url: 'https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?w=800' },
    { name: 'optical-professional-1.jpg', url: 'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg?w=800' },
    { name: 'optical-trendy-1.jpg', url: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?w=800' },
    { name: 'optical-designer-1.jpg', url: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?w=800' },
    { name: 'optical-premium-1.jpg', url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=800' },
    { name: 'optical-stylish-1.jpg', url: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?w=800' },
    { name: 'optical-bold-1.jpg', url: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?w=800' },
    { name: 'optical-chic-1.jpg', url: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?w=800' },
    { name: 'optical-urban-1.jpg', url: 'https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg?w=800' },
    { name: 'optical-everyday-1.jpg', url: 'https://images.pexels.com/photos/1820656/pexels-photo-1820656.jpeg?w=800' },
    { name: 'optical-casual-1.jpg', url: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?w=800' },
    { name: 'optical-iconic-1.jpg', url: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?w=800' },
    { name: 'optical-timeless-1.jpg', url: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?w=800' },
    { name: 'optical-classic-2.jpg', url: 'https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg?w=800' },
    { name: 'optical-modern-2.jpg', url: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?w=800' },
    { name: 'optical-fashion-1.jpg', url: 'https://images.pexels.com/photos/2220318/pexels-photo-2220318.jpeg?w=800' },
    { name: 'optical-trendy-2.jpg', url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?w=800' },
    { name: 'optical-luxury-1.jpg', url: 'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?w=800' },
    { name: 'optical-statement-1.jpg', url: 'https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?w=800' },
    { name: 'optical-round-2.jpg', url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=800' },
    { name: 'optical-square-2.jpg', url: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?w=800' },
    { name: 'optical-aviator-1.jpg', url: 'https://images.pexels.com/photos/2820884/pexels-photo-2820884.jpeg?w=800' },
    { name: 'optical-cat-eye-1.jpg', url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=800' },
    { name: 'optical-oversized-1.jpg', url: 'https://images.pexels.com/photos/3021546/pexels-photo-3021546.jpeg?w=800' },
  ]
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/*',
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
};

const downloadAllImages = async () => {
  console.log('🔄 Downloading fictive eyewear images...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  // Download sunglasses
  console.log('🕶️  Downloading sunglasses images...');
  for (const img of fictiveImages.sunglasses) {
    const filepath = path.join(IMAGES_DIR, img.name);
    try {
      await downloadImage(img.url, filepath);
      console.log(`  ✅ ${img.name}`);
      successCount++;
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`);
      failCount++;
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  
  // Download optical
  console.log('\n👓 Downloading optical images...');
  for (const img of fictiveImages.optical) {
    const filepath = path.join(IMAGES_DIR, img.name);
    try {
      await downloadImage(img.url, filepath);
      console.log(`  ✅ ${img.name}`);
      successCount++;
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`);
      failCount++;
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\n📊 Results: ${successCount} success, ${failCount} failed`);
  console.log(`📁 Images saved to: ${IMAGES_DIR}`);
};

downloadAllImages();
