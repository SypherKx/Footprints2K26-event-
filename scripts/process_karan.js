const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/media/coordinators/karan_pratap_singh_raw.jpg');
const outputPath = path.join(__dirname, '../public/media/coordinators/karan_pratap_singh.jpg');

// The user wants to zoom in and remove below the hands.
// The image is likely portrait. We'll crop from the top.
// A safe bet for "zoom in" and "above hands" on a crossed-arms portrait is usually the top 50-60%.
// Let's extract the top region.

sharp(inputPath)
    .metadata()
    .then(metadata => {
        const width = metadata.width;
        const height = metadata.height;

        // Crop to top 45% of the image to ensure hands (usually at bottom half in crossed arms pose) are cut off
        // and we focus on face/upper body.
        const cropHeight = Math.floor(height * 0.45);

        return sharp(inputPath)
            .extract({ left: 0, top: 0, width: width, height: cropHeight })
            .toFile(outputPath);
    })
    .then(() => {
        console.log('Image processed successfully');
    })
    .catch(err => {
        console.error('Error processing image:', err);
    });
