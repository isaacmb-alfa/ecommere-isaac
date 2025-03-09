import { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import { clearCartModal, createCartInLocalStorage } from '@/utils/cartStorage';
import { useLogoutContext } from "./LogoutProvider";

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { setShouldSaveCart } = useLogoutContext();
    const [isAuth, setIsAuth] = useState(false);
    const [userPayload, setUserPayload] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (token) => {
        setShouldSaveCart(true);
        localStorage.setItem("token", token);
        const decode = jwtDecode(token);
        setUserRole(decode.role);
        setUserId(decode.id);
        setUserPayload(decode);
        setIsAuth(true);
    }

    const logout = () => {
        setShouldSaveCart(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserPayload(null);
        setIsAuth(false);
        setUserId(null);
        setUserRole(null);
        clearCartModal(userId); // Vaciar el carrito al hacer logout
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decode = jwtDecode(token);
                setUserRole(decode.role);
                setUserId(decode.id);
                setUserPayload(decode);
                setIsAuth(true);
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("token");
                setUserPayload(null);
                setUserId(null);
                setUserRole(null);
                setIsAuth(false);
            }
        }
    }, []);
    useEffect(()=>{
        createCartInLocalStorage(userId);
    }, [userId, userPayload])

    const data = {
        isAuth,
        userPayload,
        userId,
        userRole,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };

export const useAuthContext = () => useContext(AuthContext);