import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UsersPage from "./Pages/UsersPage";
import EditUser from "./Pages/EditUser";
import CreateUser from "./Pages/CreateUser";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DarkMode } from "@mui/icons-material";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212121",
      paper: "#424242",
      // paper: "#e41a1a",
    },
  },
});

const defaultTheme = createTheme();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            {/* <Route
              element={
                <ProtectedRoute> */}
            <Route path="userspage" element={<UsersPage />} />
            <Route path="edituser/:userID" element={<EditUser />} />
            <Route path="createUser" element={<CreateUser />} />
            {/* </ProtectedRoute> */}
            {/* }
            > */}
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound />} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
