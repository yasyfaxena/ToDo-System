import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import useAuthStore from "./stores/auth.store";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Dashboard />;
  }

  return showRegister ? (
    <Register onLogin={() => setShowRegister(false)} />
  ) : (
    <Login onRegister={() => setShowRegister(true)} />
  );
}

export default App;
