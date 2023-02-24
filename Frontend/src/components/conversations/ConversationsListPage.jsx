import { Link } from "react-router-dom";
import { useProtectedResources } from "../data/useProtectedResources";
import { useUser } from "../auth/useUser";
const ConversationsListPage = () => {
  const { user } = useUser();
  const { isLoading, data: conversations } = useProtectedResources(
    `http://localhost:8080/users/${user.uid}/conversations`,
    []
  );
  console.log(conversations);
  return isLoading ? (
    <p>Loading messages...</p>
  ) : (
    <div className="centered-container">
      <h1 className="section-heading"> Conversation List</h1>
      {conversations.map((conversation) => (
        <Link to={`/conversations/${conversation._id}`} key={conversation._id}>
          <div className="list-item">
            <h3>{conversation.name}</h3>
            <p>{conversation.memberIds.length} members</p>
          </div>
        </Link>
      ))}
      <Link to="/new-conversation">
        <button className="full-width space-before">New Conversation</button>
      </Link>
    </div>
  );
};

export default ConversationsListPage;
