// Generates neutral placeholder art (icons + hero image). Re-run: node scripts/make-placeholders.mjs
// Replace these with cleared photos / final icons when ready.
import sharp from 'sharp';
const icon = (size, pad = 0) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="#14100e"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * (0.3 - pad)}" fill="none" stroke="#c9a45c" stroke-width="${size * 0.03}"/>
  <path d="M${size / 2} ${size * (0.34 + pad)} q${size * 0.07} ${size * 0.1} 0 ${size * 0.2} q${-size * 0.07} ${-size * 0.1} 0 ${-size * 0.2}z" fill="#e8b86a"/>
</svg>`);
await sharp(icon(512)).png().toFile('public/icons/icon-512.png');
await sharp(icon(512)).resize(192).png().toFile('public/icons/icon-192.png');
await sharp(icon(512, 0.08)).png().toFile('public/icons/maskable-512.png');
await sharp(icon(512)).resize(180).png().toFile('public/icons/apple-touch-icon.png');
await sharp(icon(512)).resize(32).png().toFile('public/favicon.png');
const hero = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs><radialGradient id="g" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#3a2a20"/><stop offset="1" stop-color="#0e0b0a"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="sans-serif" font-size="48" fill="#8a7a66">PLACEHOLDER IMAGE</text>
</svg>`);
await sharp(hero).jpeg({ quality: 85 }).toFile('src/assets/placeholder-hero.jpg');
console.log('placeholders written');
