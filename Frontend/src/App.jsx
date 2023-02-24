import { useState } from "react";
import { AllRoutes } from "./AllRoutes";
import "./App.css";
import NavBar from "./components/navigation/NavBar";
import { useUser } from "./components/auth/useUser";

function App() {
  const { isLoading, user } = useUser();

  return (
    <div className="App">
      <NavBar user={user} />
      <AllRoutes isLoading={isLoading} user={user} />
    </div>
  );
}

export default App;
