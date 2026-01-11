import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../../frontend/public/images/products');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Images de LUNETTES DE SOLEIL uniquement (photos de lunettes seules, pas de personnes)
const sunglassesImages = [
  { name: 'sun-01.jpg', url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop' },
  { name: 'sun-02.jpg', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop' },
  { name: 'sun-03.jpg', url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=400&fit=crop' },
  { name: 'sun-04.jpg', url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=400&fit=crop' },
  { name: 'sun-05.jpg', url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop' },
  { name: 'sun-06.jpg', url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=400&fit=crop' },
  { name: 'sun-07.jpg', url: 'https://images.unsplash.com/photo-1625591339971-4c9a87a66871?w=600&h=400&fit=crop' },
  { name: 'sun-08.jpg', url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=400&fit=crop' },
  { name: 'sun-09.jpg', url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=400&fit=crop' },
  { name: 'sun-10.jpg', url: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&h=400&fit=crop' },
  { name: 'sun-11.jpg', url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=400&fit=crop' },
  { name: 'sun-12.jpg', url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&h=400&fit=crop' },
  { name: 'sun-13.jpg', url: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop' },
  { name: 'sun-14.jpg', url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=400&fit=crop' },
  { name: 'sun-15.jpg', url: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=600&h=400&fit=crop' },
  { name: 'sun-16.jpg', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop' },
  { name: 'sun-17.jpg', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop' },
  { name: 'sun-18.jpg', url: 'https://images.unsplash.com/photo-1559070169-a3077159ee16?w=600&h=400&fit=crop' },
  { name: 'sun-19.jpg', url: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&h=400&fit=crop' },
  { name: 'sun-20.jpg', url: 'https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?w=600&h=400&fit=crop' },
  { name: 'sun-21.jpg', url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=400&fit=crop' },
  { name: 'sun-22.jpg', url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&h=400&fit=crop' },
  { name: 'sun-23.jpg', url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop' },
  { name: 'sun-24.jpg', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop' },
  { name: 'sun-25.jpg', url: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=400&fit=crop' },
  { name: 'sun-26.jpg', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=400&fit=crop' },
  { name: 'sun-27.jpg', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&h=400&fit=crop' },
  { name: 'sun-28.jpg', url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=400&fit=crop' },
  { name: 'sun-29.jpg', url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop' },
  { name: 'sun-30.jpg', url: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&h=400&fit=crop' },
  { name: 'sun-31.jpg', url: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=600&h=400&fit=crop' },
  { name: 'sun-32.jpg', url: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&h=400&fit=crop' },
  { name: 'sun-33.jpg', url: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=600&h=400&fit=crop' },
  { name: 'sun-34.jpg', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop' },
  { name: 'sun-35.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop' },
  { name: 'sun-36.jpg', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop' },
  { name: 'sun-37.jpg', url: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&h=400&fit=crop' },
  { name: 'sun-38.jpg', url: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&h=400&fit=crop' },
  { name: 'sun-39.jpg', url: 'https://images.unsplash.com/photo-1461783470466-185038239ee3?w=600&h=400&fit=crop' },
  { name: 'sun-40.jpg', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop' },
];

// Images de LUNETTES DE VUE uniquement (montures optiques avec verres transparents)
const opticalImages = [
  { name: 'optical-01.jpg', url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop' },
  { name: 'optical-02.jpg', url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&h=400&fit=crop' },
  { name: 'optical-03.jpg', url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=400&fit=crop' },
  { name: 'optical-04.jpg', url: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=600&h=400&fit=crop' },
  { name: 'optical-05.jpg', url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=400&fit=crop' },
  { name: 'optical-06.jpg', url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&h=400&fit=crop' },
  { name: 'optical-07.jpg', url: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&h=400&fit=crop' },
  { name: 'optical-08.jpg', url: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&h=400&fit=crop' },
  { name: 'optical-09.jpg', url: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=600&h=400&fit=crop' },
  { name: 'optical-10.jpg', url: 'https://images.unsplash.com/photo-1559070169-a3077159ee16?w=600&h=400&fit=crop' },
  { name: 'optical-11.jpg', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop' },
  { name: 'optical-12.jpg', url: 'https://images.unsplash.com/photo-1461783470466-185038239ee3?w=600&h=400&fit=crop' },
  { name: 'optical-13.jpg', url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=400&fit=crop' },
  { name: 'optical-14.jpg', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop' },
  { name: 'optical-15.jpg', url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop' },
  { name: 'optical-16.jpg', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=400&fit=crop' },
  { name: 'optical-17.jpg', url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&h=400&fit=crop' },
  { name: 'optical-18.jpg', url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=400&fit=crop' },
  { name: 'optical-19.jpg', url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop' },
  { name: 'optical-20.jpg', url: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&h=400&fit=crop' },
  { name: 'optical-21.jpg', url: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=600&h=400&fit=crop' },
  { name: 'optical-22.jpg', url: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&h=400&fit=crop' },
  { name: 'optical-23.jpg', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop' },
  { name: 'optical-24.jpg', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop' },
  { name: 'optical-25.jpg', url: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=400&fit=crop' },
  { name: 'optical-26.jpg', url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop' },
  { name: 'optical-27.jpg', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop' },
  { name: 'optical-28.jpg', url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=400&fit=crop' },
  { name: 'optical-29.jpg', url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=400&fit=crop' },
  { name: 'optical-30.jpg', url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=400&fit=crop' },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/*',
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAll = async () => {
  console.log('🔄 Téléchargement des images de LUNETTES uniquement...\n');
  
  let success = 0, fail = 0;
  
  console.log('🕶️  Lunettes de SOLEIL (40 images)...');
  for (const img of sunglassesImages) {
    const filepath = path.join(IMAGES_DIR, img.name);
    try {
      await downloadImage(img.url, filepath);
      console.log(`  ✅ ${img.name}`);
      success++;
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('\n👓 Lunettes de VUE (30 images)...');
  for (const img of opticalImages) {
    const filepath = path.join(IMAGES_DIR, img.name);
    try {
      await downloadImage(img.url, filepath);
      console.log(`  ✅ ${img.name}`);
      success++;
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n📊 Résultat: ${success} succès, ${fail} échecs`);
};

downloadAll();
