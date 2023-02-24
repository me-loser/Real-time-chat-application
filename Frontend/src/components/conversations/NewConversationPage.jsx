import { useState } from "react";
import { useProtectedResources } from "../data/useProtectedResources";
import { postWithCredentials } from "../data/postWithCredentials";
import { useUser } from "../auth/useUser";
import { useNavigate } from "react-router-dom";
const NewConversationPage = () => {
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();
  const { isLoading: isLoadingCurrentUser, user: currentUser } = useUser();
  const { isLoading: isLoadingUsers, data: users } = useProtectedResources(
    `http://localhost:8080/users`,
    []
  );
  const [memberIds, setMemberIds] = useState([]);
  const addMemberId = (id) => {
    setMemberIds((prev) => [...prev, id]);
  };
  const removeMemberId = (id) => {
    setMemberIds((prev) => {
      const filterPrev = prev.filter((memberId) => memberId !== id);
      return [...filterPrev];
    });
  };
  const createConversation = async () => {
    const response = await postWithCredentials(
      "http://localhost:8080/conversations",
      {
        name: nameValue,
        memberIds,
      }
    );
    const newGroupId = await response.json();
    navigate(`/conversations/${newGroupId}`);
  };
  return (
    <div className="centered-container">
      <h1>New Conversation</h1>
      <input
        type="text"
        placeholder="Enter a name for your conversation"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <h3>Add Members</h3>
      {users.map((user) => (
        <div key={user.id} className="list-item new-conversation-list-item">
          <p>{user.name}</p>
          {memberIds.includes(user.id) || user.id === currentUser.uid ? (
            <button
              onClick={() => {
                removeMemberId(user.id);
              }}
              disabled={user.id === currentUser.uid}
            >
              Remove
            </button>
          ) : (
            <button
              onClick={() => {
                addMemberId(user.id);
              }}
            >
              Add
            </button>
          )}
        </div>
      ))}
      <button onClick={createConversation} className="full-width space-before">
        {" "}
        Create Conversation
      </button>
    </div>
  );
};
export default NewConversationPage;
