import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/auth/SignInPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import ConversationsListPage from "./components/conversations/ConversationsListPage";
import NewConversationPage from "./components/conversations/NewConversationPage";
import ConversationPage from "./components/conversations/ConversationPage";

const routes = [
  {
    path: "/sign-in",
    Component: SignInPage,
  },
  {
    path: "/",
    exact: true,
    Component: ConversationsListPage,
    private: true,
  },
  {
    path: "/new-conversation",
    Component: NewConversationPage,
    private: true,
  },
  {
    path: "/conversations/:id",
    private: true,
    Component: ConversationPage,
  },
];
export const AllRoutes = ({ isLoading, user }) => (
  <Routes>
    {routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          element={
            route.private ? (
              <PrivateRoute
                isLoading={isLoading}
                isAuthed={!!user}
                Component={route.Component}
              />
            ) : (
              <route.Component></route.Component>
            )
          }
        ></Route>
      );
    })}
  </Routes>
);
