// import axios from "axios";
// import { User } from "../models/User";
// import { store } from "../store/store";
// import { setUserInfo } from "../store/userSlice";

// class SecurityService extends EventTarget {
//     keySession: string;
//     API_URL: string;
//     user: User;
//     theAuthProvider: any;
    
//     constructor() {
//         super();

//         this.keySession = 'session';
//         this.API_URL = import.meta.env.VITE_API_URL || ""; // Reemplaza con la URL real
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             this.user = JSON.parse(storedUser);
//         } else {
//             this.user = {};
//         }
//     }

//     login() { 
//        let data = {
//         id: 1,
//         name: "Juan Pérez",
//         email: "juan.perez@example.com",
//         password: "securepassword123",
//         age: 30,
//         city: "Madrid",
//         phone: "+34 600 123 456",
//         is_active: true,
//         token: "abc123xyz"
//         }
//         localStorage.setItem("user", JSON.stringify(data))
//         store.dispatch(setUserInfo(data))
//        return data
//     }
    
//     getUser() {
//         return this.user;
//     }
    
//     logout() {
//         this.user = {};
//         localStorage.removeItem("user");
//         this.dispatchEvent(new CustomEvent("userChange", { detail: null }));
//         store.dispatch(setUser(null))
//     }

//     isAuthenticated() {
//         return localStorage.getItem(this.keySession) !== null;
//     }

//     getToken() {
//         return localStorage.getItem(this.keySession);
//     }
// }

// export default new SecurityService();
