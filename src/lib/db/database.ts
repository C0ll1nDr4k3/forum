// Local
import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD
} from "$env/static/private";
import postgres from "postgres";

// Define the configuration for the Postgres connection
const config = {
	host: DATABASE_HOST,
	port: 5432,
	database: DATABASE_NAME,
	user: DATABASE_USERNAME,
	password: DATABASE_PASSWORD
};
// Initialize the connection
const sql = postgres({
	host: config.host,
	port: config.port,
	database: config.database,
	username: config.user,
	password: config.password
});

// Neon
// import {
// 	DATABASE_URL
// } from "$env/static/private";
// import { neon } from "@neondatabase/serverless";
// const sql = neon(DATABASE_URL);

export default sql;

// async function testConnection() {
// 	try {
// 		// Perform a simple query to test the connection
// 		const result = await sql`SELECT NOW();`;
// 		console.log("Database connection successful:", result);
// 	} catch (error) {
// 		console.error("Error connecting to the database:", error);
// 	} finally {
// 		// Close the connection
// 		await sql.end();
// 	}
// }

// // Run the test connection function
// testConnection().then(() => {
// 	console.log("Connection test complete.");
// });
