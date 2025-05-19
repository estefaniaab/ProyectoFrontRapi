import axios from "axios";
import { loginUser } from "../models/usuarioLogin";
import { store } from "../store/store";
import { setUserInfo } from "../store/userSlice";

class SecurityService extends EventTarget {
    keySession: string;
    API_URL: string;
    user: loginUser;
    theAuthProvider: any;
    
    constructor() {
        super();

        this.keySession = 'session';
        this.API_URL = import.meta.env.VITE_POSTMAN_LOGIN_USER || ""; // Reemplaza con la URL real
        const storedUser = localStorage.getItem("loginUser");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        } else {
            this.user = {
                name: "",
                email: "",
                picture: ""
            }
        }
    }

    async login(user: loginUser) { 
        console.log("llamando api " + `${this.API_URL}/login`);

        try {
            const response = await axios.post(`${this.API_URL}/login`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            localStorage.setItem("loginUser", JSON.stringify(data));
            store.dispatch(setUserInfo(data));
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    getUser() {
        return this.user;
    }
    
    // Logout usamos el de google Logout

    isAuthenticated() {
        return localStorage.getItem(this.keySession) !== null;
    }

    getToken() {
        return localStorage.getItem(this.keySession);
    }
}

export default new SecurityService();
