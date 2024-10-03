import 'dotenv/config';

export const env = (name, defaultValue) => {
  const value = process.env[name];

  if (value) {
    console.log(`Loaded env variable ${name}: ${value}`);
    return value;
  }

  if (defaultValue) {
    console.log(`Using default value for ${name}: ${defaultValue}`);
    return defaultValue;
  }

  throw new Error(`Missing process.env[${name}]`);
};
