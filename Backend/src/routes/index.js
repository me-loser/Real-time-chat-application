export { protectRouteMiddleware } from "./protectRouteMiddleware";
import { getUserConversationsRoute } from "./getUserConversationsRoute";
import { getAllUsersRoute } from "./getAllUsersRoute";
import { createConversationRoute } from "./createConversationRoute";

export const routes = [
  getUserConversationsRoute,
  getAllUsersRoute,
  createConversationRoute,
];
