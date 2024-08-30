import "./App.css";
import AuthContextProvider from "./lib/context/AuthContext";
import MainLayout from "./layout/MainLayout";
import AlertContextProvider from "./lib/context/AlertContext";

function App() {
  return (
    <AlertContextProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </AlertContextProvider>
  );
}

export default App;
