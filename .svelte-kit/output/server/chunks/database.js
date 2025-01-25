import { neon } from "@neondatabase/serverless";
const DATABASE_URL = "postgresql://neondb_owner:npg_36CsjNMbwlvc@ep-quiet-bird-a5iq5z9l-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
export {
  sql as s
};
