const cloudinary = require('cloudinary').v2;

const useCloudinary = String(process.env.USE_CLOUDINARY).toLowerCase() === 'true';

if (useCloudinary) {
  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || '').trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || '').trim();

  if (!cloudName || !apiKey || !apiSecret) {
    // USE_CLOUDINARY=true but one or more credentials are blank — this is
    // almost always caused by a stray quote/space in .env, or the .env not
    // being reloaded after editing (restart the server after any .env change).
    console.warn(
      '[Storage] USE_CLOUDINARY=true but CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / ' +
        'CLOUDINARY_API_SECRET is missing or empty. Uploads will fail until all three are set ' +
        'and the server is restarted.'
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  console.log(`[Storage] Uploads will go to Cloudinary (cloud_name=${cloudName || '(missing)'})`);
} else {
  console.log('[Storage] Uploads will be saved locally to /server/uploads (USE_CLOUDINARY is not "true")');
}

module.exports = { cloudinary, useCloudinary };
