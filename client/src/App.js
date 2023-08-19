import Navbar from "./components/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { isReady, userId, token, logout, login, fullName } = useAuth()
    const isLogin = !!token
    const routes = useRoutes(isLogin)

    return (
        <AuthContext.Provider value={{ isReady, userId, token, logout, login, isLogin, fullName }}>
            <BrowserRouter>
                <Navbar />
                { routes }
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
