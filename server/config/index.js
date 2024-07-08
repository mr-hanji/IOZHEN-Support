const dotenv = require("dotenv");
const path = require("path");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
};
