import postgres from "postgres";

import { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } from "$env/static/private";

type Config = {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
};

// Define the configuration for the Postgres connection
const config: Config = {
	host: "localhost",
	port: 5432,
	database: DATABASE,
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

export default sql;

async function testConnection() {
	try {
		// Perform a simple query to test the connection
		const result = await sql`SELECT NOW();`;
		console.log("Database connection successful:", result);
	} catch (error) {
		console.error("Error connecting to the database:", error);
	} finally {
		// Close the connection
		await sql.end();
	}
}

// Run the test connection function
testConnection().then(() => {
	console.log("Connection test complete.");
});
