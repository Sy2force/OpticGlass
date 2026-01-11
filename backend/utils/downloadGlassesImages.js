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

// Images de lunettes de SOLEIL uniquement (sans marque visible)
const sunglassesImages = [
  { name: 'sun-01.jpg', url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-02.jpg', url: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-03.jpg', url: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-04.jpg', url: 'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-05.jpg', url: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-06.jpg', url: 'https://images.pexels.com/photos/1493111/pexels-photo-1493111.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-07.jpg', url: 'https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-08.jpg', url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-09.jpg', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-10.jpg', url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-11.jpg', url: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-12.jpg', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-13.jpg', url: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-14.jpg', url: 'https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-15.jpg', url: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-16.jpg', url: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-17.jpg', url: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-18.jpg', url: 'https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-19.jpg', url: 'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-20.jpg', url: 'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-21.jpg', url: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-22.jpg', url: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-23.jpg', url: 'https://images.pexels.com/photos/2282000/pexels-photo-2282000.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-24.jpg', url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-25.jpg', url: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-26.jpg', url: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-27.jpg', url: 'https://images.pexels.com/photos/2811089/pexels-photo-2811089.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-28.jpg', url: 'https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-29.jpg', url: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-30.jpg', url: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-31.jpg', url: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-32.jpg', url: 'https://images.pexels.com/photos/3206079/pexels-photo-3206079.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-33.jpg', url: 'https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-34.jpg', url: 'https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-35.jpg', url: 'https://images.pexels.com/photos/3394225/pexels-photo-3394225.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-36.jpg', url: 'https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-37.jpg', url: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-38.jpg', url: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-39.jpg', url: 'https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?w=600&h=400&fit=crop' },
  { name: 'sun-40.jpg', url: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?w=600&h=400&fit=crop' },
];

// Images de lunettes de VUE uniquement (montures optiques, verres transparents)
const opticalImages = [
  { name: 'optical-01.jpg', url: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-02.jpg', url: 'https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-03.jpg', url: 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-04.jpg', url: 'https://images.pexels.com/photos/1068866/pexels-photo-1068866.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-05.jpg', url: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-06.jpg', url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-07.jpg', url: 'https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-08.jpg', url: 'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-09.jpg', url: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-10.jpg', url: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-11.jpg', url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-12.jpg', url: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-13.jpg', url: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-14.jpg', url: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-15.jpg', url: 'https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-16.jpg', url: 'https://images.pexels.com/photos/1820656/pexels-photo-1820656.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-17.jpg', url: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-18.jpg', url: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-19.jpg', url: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-20.jpg', url: 'https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-21.jpg', url: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-22.jpg', url: 'https://images.pexels.com/photos/2220318/pexels-photo-2220318.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-23.jpg', url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-24.jpg', url: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-25.jpg', url: 'https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-26.jpg', url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-27.jpg', url: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-28.jpg', url: 'https://images.pexels.com/photos/2820884/pexels-photo-2820884.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-29.jpg', url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=600&h=400&fit=crop' },
  { name: 'optical-30.jpg', url: 'https://images.pexels.com/photos/3021546/pexels-photo-3021546.jpeg?w=600&h=400&fit=crop' },
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
  console.log('🔄 Téléchargement des images de lunettes...\n');
  
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
    await new Promise(r => setTimeout(r, 150));
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
    await new Promise(r => setTimeout(r, 150));
  }
  
  console.log(`\n📊 Résultat: ${success} succès, ${fail} échecs`);
};

downloadAll();
