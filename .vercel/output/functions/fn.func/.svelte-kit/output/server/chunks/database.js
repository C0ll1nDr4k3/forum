import postgres from "postgres";
const DATABASE_HOST = "localhost";
const DATABASE_NAME = "forum";
const DATABASE_USERNAME = "forum_admin";
const DATABASE_PASSWORD = "4em_@dmin";
const config = {
  host: DATABASE_HOST,
  port: 5432,
  database: DATABASE_NAME,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD
};
const sql = postgres({
  host: config.host,
  port: config.port,
  database: config.database,
  username: config.user,
  password: config.password
});
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
