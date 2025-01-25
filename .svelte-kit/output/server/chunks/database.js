import { neon } from "@neondatabase/serverless";
const DATABASE_URL = "postgresql://neondb_owner:npg_36CsjNMbwlvc@ep-quiet-bird-a5iq5z9l-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
async function testConnection() {
  try {
    const result = await sql`SELECT NOW();`;
    console.log("Database connection successful:", result);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await sql.end();
  }
}
testConnection().then(() => {
  console.log("Connection test complete.");
});
export {
  sql as s
};
