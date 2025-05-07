// Este script utiliza Sharp para generar iconos PNG a partir del SVG base
// Para usarlo: npm install sharp --save-dev
// Luego ejecutar: node generate-icons.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE_SVG = path.join(__dirname, 'public', 'icons', 'icon-base.svg');
const OUTPUT_DIR = path.join(__dirname, 'public', 'icons');

// Asegurarse de que el directorio de salida existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generar todos los iconos de diferentes tamaños
async function generateIcons() {
  for (const size of SIZES) {
    try {
      const outputFile = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
      await sharp(SOURCE_SVG)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      console.log(`Generado: ${outputFile}`);
    } catch (error) {
      console.error(`Error generando icono de ${size}x${size}:`, error);
    }
  }
}

generateIcons().then(() => {
  console.log('¡Generación de iconos completada!');
}).catch(err => {
  console.error('Error en la generación de iconos:', err);
});