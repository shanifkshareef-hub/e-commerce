const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "8000";
export default {
  project_name: process.env.PROJECT_NAME || "Name not provied",
  port: parseInt(process.env.PORT) || 8000,
  keys: {
    public: process.env.PUBLIC_KEY || "",
    private: process.env.PRIVATE_KEY || "",
  },
  seed: parseInt(process.env.SEED) || 12,
  dataBaseUrl: process.env.DATABASE_URL,
};
