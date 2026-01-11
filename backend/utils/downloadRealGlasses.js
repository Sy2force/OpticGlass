import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../../frontend/public/images/products');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Images de lunettes de SOLEIL - URLs directes Pexels (photos de lunettes uniquement)
const sunglassesImages = [
  { name: 'sun-01.jpg', url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-02.jpg', url: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-03.jpg', url: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-04.jpg', url: 'https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-05.jpg', url: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-06.jpg', url: 'https://images.pexels.com/photos/1493111/pexels-photo-1493111.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-07.jpg', url: 'https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-08.jpg', url: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-09.jpg', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-10.jpg', url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-11.jpg', url: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-12.jpg', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-13.jpg', url: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-14.jpg', url: 'https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-15.jpg', url: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-16.jpg', url: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-17.jpg', url: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-18.jpg', url: 'https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-19.jpg', url: 'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-20.jpg', url: 'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-21.jpg', url: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-22.jpg', url: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-23.jpg', url: 'https://images.pexels.com/photos/2282000/pexels-photo-2282000.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-24.jpg', url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-25.jpg', url: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-26.jpg', url: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-27.jpg', url: 'https://images.pexels.com/photos/2811089/pexels-photo-2811089.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-28.jpg', url: 'https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-29.jpg', url: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-30.jpg', url: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-31.jpg', url: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-32.jpg', url: 'https://images.pexels.com/photos/3206079/pexels-photo-3206079.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-33.jpg', url: 'https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-34.jpg', url: 'https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-35.jpg', url: 'https://images.pexels.com/photos/3394225/pexels-photo-3394225.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-36.jpg', url: 'https://images.pexels.com/photos/3471028/pexels-photo-3471028.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-37.jpg', url: 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-38.jpg', url: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-39.jpg', url: 'https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'sun-40.jpg', url: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

// Images de lunettes de VUE - URLs directes Pexels
const opticalImages = [
  { name: 'optical-01.jpg', url: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-02.jpg', url: 'https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-03.jpg', url: 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-04.jpg', url: 'https://images.pexels.com/photos/1068866/pexels-photo-1068866.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-05.jpg', url: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-06.jpg', url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-07.jpg', url: 'https://images.pexels.com/photos/1251833/pexels-photo-1251833.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-08.jpg', url: 'https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-09.jpg', url: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-10.jpg', url: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-11.jpg', url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-12.jpg', url: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-13.jpg', url: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-14.jpg', url: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-15.jpg', url: 'https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-16.jpg', url: 'https://images.pexels.com/photos/1820656/pexels-photo-1820656.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-17.jpg', url: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-18.jpg', url: 'https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-19.jpg', url: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-20.jpg', url: 'https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-21.jpg', url: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-22.jpg', url: 'https://images.pexels.com/photos/2220318/pexels-photo-2220318.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-23.jpg', url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-24.jpg', url: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-25.jpg', url: 'https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-26.jpg', url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-27.jpg', url: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-28.jpg', url: 'https://images.pexels.com/photos/2820884/pexels-photo-2820884.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-29.jpg', url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'optical-30.jpg', url: 'https://images.pexels.com/photos/3021546/pexels-photo-3021546.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const downloadWithCurl = (url, filepath) => {
  try {
    execSync(`curl -L -s -o "${filepath}" "${url}"`, { timeout: 30000 });
    const stats = fs.statSync(filepath);
    if (stats.size < 5000) {
      fs.unlinkSync(filepath);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const downloadAll = async () => {
  console.log('🔄 Téléchargement des images de lunettes...\n');
  
  let success = 0, fail = 0;
  
  console.log('🕶️  Lunettes de SOLEIL (40 images)...');
  for (const img of sunglassesImages) {
    const filepath = path.join(IMAGES_DIR, img.name);
    if (downloadWithCurl(img.url, filepath)) {
      console.log(`  ✅ ${img.name}`);
      success++;
    } else {
      console.log(`  ❌ ${img.name}`);
      fail++;
    }
  }
  
  console.log('\n👓 Lunettes de VUE (30 images)...');
  for (const img of opticalImages) {
    const filepath = path.join(IMAGES_DIR, img.name);
    if (downloadWithCurl(img.url, filepath)) {
      console.log(`  ✅ ${img.name}`);
      success++;
    } else {
      console.log(`  ❌ ${img.name}`);
      fail++;
    }
  }
  
  console.log(`\n📊 Résultat: ${success} succès, ${fail} échecs`);
  console.log(`📁 Images: ${IMAGES_DIR}`);
};

downloadAll();
