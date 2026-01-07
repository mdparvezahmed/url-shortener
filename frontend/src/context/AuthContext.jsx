import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setUser(userInfo);
        }
        setLoading(false);
    }, []);

    const Login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return { success: true };

        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    }

    const Register = async (email, password) => {
        try {
            const data = await registerUser(email, password);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    }

    const Logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, Login, Register, Logout }}>
            {children}
        </AuthContext.Provider>
    );


}

export default AuthContext;