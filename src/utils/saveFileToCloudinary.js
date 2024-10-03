import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'node:fs/promises';
import { env } from './env.js';

const configureCloudinary = () => {
  const cloud_name = env('CLOUDINARY_CLOUD_NAME');
  const api_key = env('CLOUDINARY_API_KEY');
  const api_secret = env('CLOUDINARY_API_SECRET');

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error('Missing Cloudinary configuration');
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  console.log('Cloudinary configured successfully');
};

const saveFileToCloudinary = async (file, folder) => {
  try {
    configureCloudinary();

    const response = await cloudinary.uploader.upload(file.path, {
      folder,
    });

    await fs.unlink(file.path);

    console.log('File uploaded to Cloudinary:', response.secure_url);
    return response.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export default saveFileToCloudinary;
