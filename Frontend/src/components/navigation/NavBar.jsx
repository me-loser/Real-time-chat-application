import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const NavBar = ({ user }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onClickSignOut = async () => {
    await auth.signOut();
    navigate("/sign-in");
  };
  return (
    <nav>
      <Link to="/">
        <h1 className="app-heading">Real-Time-Chat app</h1>
      </Link>
      {user ? (
        <>
          <button className="sign-out-button" onClick={onClickSignOut}>
            Sign Out
          </button>
          <p className="logged-in-as space-before">Logged in as {user.email}</p>
        </>
      ) : null}
    </nav>
  );
};

export default NavBar;
