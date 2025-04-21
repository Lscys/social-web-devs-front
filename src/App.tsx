import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes"
import { Toaster } from "sonner";


export const queryClient = new QueryClient();


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
        <Toaster richColors position="top-center"/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
