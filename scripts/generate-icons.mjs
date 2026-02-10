import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const ICONS_DIR = join(import.meta.dirname, "..", "public", "icons");
mkdirSync(ICONS_DIR, { recursive: true });

// WinterReady app icon - blue background with white snowflake
function createIconSvg(size) {
  const padding = Math.round(size * 0.15);
  const center = size / 2;
  const r = center - padding;
  // Snowflake arm length
  const arm = r * 0.7;
  const branch = arm * 0.35;
  const branchOffset = arm * 0.55;
  const strokeWidth = Math.max(2, Math.round(size * 0.04));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#1e3a5f"/>
  <g stroke="white" stroke-width="${strokeWidth}" stroke-linecap="round" fill="none" transform="translate(${center},${center})">
    <!-- Vertical arm -->
    <line x1="0" y1="${-arm}" x2="0" y2="${arm}"/>
    <line x1="${-branch}" y1="${-branchOffset}" x2="0" y2="${-branchOffset - branch * 0.7}"/>
    <line x1="${branch}" y1="${-branchOffset}" x2="0" y2="${-branchOffset - branch * 0.7}"/>
    <line x1="${-branch}" y1="${branchOffset}" x2="0" y2="${branchOffset + branch * 0.7}"/>
    <line x1="${branch}" y1="${branchOffset}" x2="0" y2="${branchOffset + branch * 0.7}"/>
    <!-- 60 degree arm -->
    <line x1="${-arm * 0.866}" y1="${arm * 0.5}" x2="${arm * 0.866}" y2="${-arm * 0.5}"/>
    <line x1="${-branchOffset * 0.866 - branch * 0.5}" y1="${branchOffset * 0.5 - branch * 0.866}" x2="${-branchOffset * 0.866}" y2="${branchOffset * 0.5}"/>
    <line x1="${-branchOffset * 0.866 + branch * 0.5}" y1="${branchOffset * 0.5 + branch * 0.866}" x2="${-branchOffset * 0.866}" y2="${branchOffset * 0.5}"/>
    <line x1="${branchOffset * 0.866 + branch * 0.5}" y1="${-branchOffset * 0.5 + branch * 0.866}" x2="${branchOffset * 0.866}" y2="${-branchOffset * 0.5}"/>
    <line x1="${branchOffset * 0.866 - branch * 0.5}" y1="${-branchOffset * 0.5 - branch * 0.866}" x2="${branchOffset * 0.866}" y2="${-branchOffset * 0.5}"/>
    <!-- 120 degree arm -->
    <line x1="${arm * 0.866}" y1="${arm * 0.5}" x2="${-arm * 0.866}" y2="${-arm * 0.5}"/>
    <line x1="${branchOffset * 0.866 + branch * 0.5}" y1="${branchOffset * 0.5 - branch * 0.866}" x2="${branchOffset * 0.866}" y2="${branchOffset * 0.5}"/>
    <line x1="${branchOffset * 0.866 - branch * 0.5}" y1="${branchOffset * 0.5 + branch * 0.866}" x2="${branchOffset * 0.866}" y2="${branchOffset * 0.5}"/>
    <line x1="${-branchOffset * 0.866 - branch * 0.5}" y1="${-branchOffset * 0.5 + branch * 0.866}" x2="${-branchOffset * 0.866}" y2="${-branchOffset * 0.5}"/>
    <line x1="${-branchOffset * 0.866 + branch * 0.5}" y1="${-branchOffset * 0.5 - branch * 0.866}" x2="${-branchOffset * 0.866}" y2="${-branchOffset * 0.5}"/>
  </g>
</svg>`;
}

// Emergency icon - red background with white cross/plus
function createEmergencyIconSvg(size) {
  const strokeWidth = Math.max(3, Math.round(size * 0.08));
  const arm = size * 0.25;
  const center = size / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#dc2626"/>
  <g stroke="white" stroke-width="${strokeWidth}" stroke-linecap="round">
    <line x1="${center}" y1="${center - arm}" x2="${center}" y2="${center + arm}"/>
    <line x1="${center - arm}" y1="${center}" x2="${center + arm}" y2="${center}"/>
  </g>
</svg>`;
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

for (const size of sizes) {
  const svg = Buffer.from(createIconSvg(size));
  await sharp(svg).resize(size, size).png().toFile(join(ICONS_DIR, `icon-${size}x${size}.png`));
  console.log(`Generated icon-${size}x${size}.png`);
}

// Emergency icon (96x96)
const emergencySvg = Buffer.from(createEmergencyIconSvg(96));
await sharp(emergencySvg).resize(96, 96).png().toFile(join(ICONS_DIR, "emergency-icon.png"));
console.log("Generated emergency-icon.png");

// Badge icon (72x72) - same as app icon but smaller
const badgeSvg = Buffer.from(createIconSvg(72));
await sharp(badgeSvg).resize(72, 72).png().toFile(join(ICONS_DIR, "badge-72x72.png"));
console.log("Generated badge-72x72.png");

console.log("\nAll icons generated successfully!");
