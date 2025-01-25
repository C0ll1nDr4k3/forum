import { j as json } from "../../../../chunks/index.js";
import "../../../../chunks/database.js";
async function POST(event) {
  console.log("POST request received", event);
  return json({ message: "POST request received" });
}
async function GET(event) {
  console.log("GET request received", event);
  return json([
    {
      id: 1,
      user: "User 1",
      name: "Post 1",
      content: "This is the content of post 1"
    },
    {
      id: 2,
      user: "User 2",
      name: "Post 2",
      content: "This is the content of post 2"
    },
    {
      id: 3,
      user: "User 3",
      name: "Post 3",
      content: "This is the content of post 3"
    }
  ]);
}
export {
  GET,
  POST
};
