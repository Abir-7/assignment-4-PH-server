import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export const config = {
  port: process.env.PORT,
  mogodbUri: process.env.MONGODB_URI,
  node_env: process.env.NODE_ENV,
};