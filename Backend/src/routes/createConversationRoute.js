import { createConversation } from "../db/createConversation.js";

export const createConversationRoute = {
  method: "post",
  path: "/conversations",
  handler: async (req, res) => {
    const { name, memberIds } = req.body;
    const { user_id: userId } = req.user;
    const insertedId = await createConversation(name, [...memberIds, userId]);
    res.status(200).json(insertedId);
  },
};
