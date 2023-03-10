import { getAllUsers } from "../db/getAllUsers";

export const getAllUsersRoute = {
  method: "get",
  path: "/users",
  handler: async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json(users);
  },
};
