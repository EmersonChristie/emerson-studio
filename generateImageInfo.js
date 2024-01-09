const fs = require("fs");
const path = require("path");

const artistImageDirectoryPath = path.join(
  __dirname,
  "public",
  "artist-page-slideshow",
);
const artistImagesInfo = [];

fs.readdirSync(artistImageDirectoryPath).forEach((file) => {
  // Assuming the file name format is 'alt-text.jpg'
  const altText = file.replace(/-/g, " ").replace(/\.\w+$/, "");
  artistImagesInfo.push({
    src: `/artist-page-slideshow/${file}`,
    alt: altText,
  });
});

// Output to a JSON file or a JS module
fs.writeFileSync(
  "./lib/artistImageData.js",
  `export const artistImages = ${JSON.stringify(artistImagesInfo, null, 2)};`,
);

const contactImageDirectoryPath = path.join(
  __dirname,
  "public",
  "contact-page-slideshow",
);
const contactImagesInfo = [];

fs.readdirSync(contactImageDirectoryPath).forEach((file) => {
  // Assuming the file name format is 'alt-text.jpg'
  const altText = file.replace(/-/g, " ").replace(/\.\w+$/, "");
  contactImagesInfo.push({
    src: `/contact-page-slideshow/${file}`,
    alt: altText,
  });
});

// Output to a JSON file or a JS module
fs.writeFileSync(
  "./lib/contactImageData.js",
  `export const contactImages = ${JSON.stringify(contactImagesInfo, null, 2)};`,
);
