import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDS = [
  { name: 'Soléra', color: '#c9a227' },
  { name: 'Zenith', color: '#000000' },
  { name: 'Aurélia', color: '#1a1a1a' },
  { name: 'Vespera', color: '#333333' },
  { name: 'Equinox', color: '#444444' },
  { name: 'Lumina', color: '#c9a227' },
  { name: 'Orion', color: '#000000' },
  { name: 'Apex', color: '#cc0000' },
  { name: 'Artis', color: '#555555' },
  { name: 'Nova', color: '#0066cc' },
  { name: 'Ethereal', color: '#888888' },
  { name: 'Céleste', color: '#111111' },
  { name: 'Romano', color: '#222222' },
  { name: 'Royale', color: '#d4af37' },
  { name: 'Baron', color: '#000000' },
  { name: 'Heritage', color: '#003366' },
  { name: 'Sportif', color: '#008000' },
  { name: 'Roma', color: '#000000' },
  { name: 'London', color: '#cc0000' },
  { name: 'Rossi', color: '#cc0000' },
  { name: 'Gem', color: '#990099' },
  { name: 'Sicilian', color: '#000000' },
  { name: 'Pacific', color: '#0099cc' },
  { name: 'Paris', color: '#000000' },
  { name: 'Bohème', color: '#cc6600' },
  { name: 'Avant', color: '#000000' },
  { name: 'Belle', color: '#ff6699' },
  { name: 'Vintage', color: '#663300' },
  { name: 'Aristos', color: '#000000' },
  { name: 'Veneto', color: '#000000' }
];

const OUTPUT_DIR = path.join(__dirname, '../../frontend/public/brands');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const generateSVG = (brand) => {
  // Generate a simple text-based SVG
  // Remove accents for filename
  const slug = brand.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
  
  const svgContent = `
<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="24" fill="${brand.color}" letter-spacing="2">
    ${brand.name.toUpperCase()}
  </text>
</svg>`.trim();

  const filePath = path.join(OUTPUT_DIR, `${slug}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`✅ Generated logo for ${brand.name}: ${slug}.svg`);
};

console.log('🚀 Generating brand logos...');
BRANDS.forEach(generateSVG);
console.log('✨ All logos generated!');
