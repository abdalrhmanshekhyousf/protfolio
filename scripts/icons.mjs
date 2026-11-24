// Generates PNG logos and Open Graph images from the SVGs in public/ (tasks 56, 57, 59)
// Run: npm run icons
import sharp from 'sharp';

const pub = new URL('../public/', import.meta.url);
const out = (name) => new URL(name, pub).pathname.replace(/^\/([A-Za-z]:)/, '$1');

for (const size of [32, 180, 192, 512]) {
  await sharp(out('logo.svg'), { density: 300 }).resize(size, size).png().toFile(out(`logo-${size}.png`));
}
// apple-touch-icon: no transparent corners
await sharp(out('logo.svg'), { density: 300 }).resize(180, 180).flatten({ background: '#0b5d63' }).png().toFile(out('apple-touch-icon.png'));

for (const lng of ['ar', 'en']) {
  await sharp(out(`og-${lng}.svg`)).resize(1200, 630).png().toFile(out(`og-${lng}.png`));
}
console.log('icons done');
