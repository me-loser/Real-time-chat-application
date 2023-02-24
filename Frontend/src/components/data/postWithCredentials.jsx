import { getAuth } from "firebase/auth";
export const postWithCredentials = async (url, bodyData) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(url);
  if (!user) {
    console.log("Error!");
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      AuthToken: await user.getIdToken(),
      "Content-Type": "application/json",
    },
  });

  return response;
};
