import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes"
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster richColors position="top-center"/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
