const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  'assets/images/electronic_smart_work_station.jpg',
  'assets/images/handheld_oscilloscope.png',
  'assets/images/dc_power_supply.png',
  'assets/images/benchtop_oscilloscope.png',
  'assets/images/tablet_oscilloscope.png',
  'assets/images/waveform_generator.png',
  'assets/images/clamp_meter.png',
  'assets/images/power_supply_multimeter_spm.jpg',
  'assets/images/lcr2000_series.png',
  'assets/images/oel85_series.png',
  'assets/images/owh9800_series.png'
];

const targetDir = path.join(__dirname, 'public', 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function download(relPath) {
  const url = `https://www.srtronix.com/${relPath}`;
  const filename = path.basename(relPath);
  const dest = path.join(targetDir, filename);

  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} -> ${dest}`);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        console.error(`Failed ${url}: status ${res.statusCode}`);
        resolve(); // don't abort all
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      console.error(`Error ${url}: ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  for (const img of images) {
    await download(img);
  }
  console.log('Finished downloading images.');
}

main();

