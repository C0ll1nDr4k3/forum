import { j as json } from "../../../../chunks/index.js";
import "../../../../chunks/database.js";
async function GET(event) {
  console.log("GET request received", event);
  return json({ message: "GET request received" });
}
export {
  GET
};
