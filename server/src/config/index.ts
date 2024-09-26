export const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  API_SECRET_KEY: process.env.API_KEY,
  API_CORS_ORIGIN: process.env.API_CORS_ORIGIN,
  API_TIMEOUT_LIMIT: process.env.API_TIMEOUT_LIMIT,
  API_ENABLE_RATE_LIMIT: process.env.API_ENABLE_RATE_LIMIT,
  PERSONAL_DECRYPT: process.env.PERSONAL_DECRYPT,
};

export const rootConfig = {
  name: process.env.ROOT_NAME,
  email: process.env.ROOT_EMAIL,
  username: process.env.ROOT_USERNAME,
  password: process.env.ROOT_PASSWORD,
};

export const guestPswd = process.env.GUEST_PSWD;
