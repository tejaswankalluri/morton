import "dotenv/config";

const config = {
  SERVER_PORT: process.env.SERVER_PORT || 5000,
  db: {
    HOST: process.env.DB_HOST,
    USERNAME: process.env.DB_USERNAME,
    DATABASE: process.env.DB_DATABASE,
    PASSWORD: process.env.DB_PASSWORD,
  },
  SECRET: process.env.SECRET,
};

export default config;
