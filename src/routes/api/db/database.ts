import postgres from "postgres";

type Config = {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
};

// Define the configuration for the Postgres connection
const config: Config = {
	host: "localhost", // Change this to your host
	port: 5432, // Default Postgres port
	database: "your_database_name", // Replace with your database name
	user: "your_username", // Replace with your username
	password: "your_password" // Replace with your password
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
testConnection().then((r) => console.log("Connection closed:", r));
