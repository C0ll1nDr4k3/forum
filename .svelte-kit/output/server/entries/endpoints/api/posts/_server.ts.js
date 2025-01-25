import { j as json } from "../../../../chunks/index.js";
import "../../../../chunks/database.js";
async function POST(event) {
  console.log("POST request received", event);
  return json({ message: "POST request received" });
}
async function GET(event) {
  console.log("GET request received", event);
  const posts = [
    {
      threadId: 1,
      postId: 0,
      parentPostId: 1,
      userId: 1,
      content: "This is a test post",
      likes: 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      attachments: []
    }
  ];
  return json(posts);
}
export {
  GET,
  POST
};
