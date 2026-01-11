import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory: frontend/public/images/products
const TARGET_DIR = path.join(__dirname, '../../frontend/public/images/products');

// Ensure directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Read mapping file
const mappingPath = path.join(__dirname, 'image_mapping.json');
let downloadList = [];

try {
  if (fs.existsSync(mappingPath)) {
    const content = fs.readFileSync(mappingPath, 'utf8');
    downloadList = JSON.parse(content);
  } else {
    console.error('❌ image_mapping.json not found. Run generate_fictional_products.js first.');
    process.exit(1);
  }
} catch (err) {
  console.error('❌ Failed to read image_mapping.json:', err.message);
  process.exit(1);
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    // Use curl for better reliability with redirects and headers
    const command = `curl -L --http1.1 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${filepath}" "${url}"`;
    
    exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        // Clean up empty file if created
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        reject(error);
        return;
      }
      
      // Check if file exists and has size > 0
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        if (stats.size > 0) {
          resolve();
        } else {
          fs.unlinkSync(filepath);
          reject(new Error('Downloaded file is empty'));
        }
      } else {
        reject(new Error('File was not created'));
      }
    });
  });
};

const processDownloads = async () => {
  console.log(`🚀 Starting download for ${downloadList.length} fictional product images...`);
  
  let successCount = 0;
  let failCount = 0;

  for (const item of downloadList) {
    const filepath = path.join(TARGET_DIR, item.filename);

    // Skip if file already exists and has content
    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 0) {
      console.log(`⏩ Skipped (exists): ${item.filename}`);
      successCount++;
      continue;
    }

    try {
      console.log(`⬇️  Downloading: ${item.filename}...`);
      await downloadImage(item.url, filepath);
      successCount++;
      console.log(`✅ Saved: ${item.filename}`);
    } catch (error) {
      console.error(`❌ Failed ${item.filename}: ${error.message}`);
      failCount++;
    }
    
    // Small delay to be nice to the CDN
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
};

processDownloads();
