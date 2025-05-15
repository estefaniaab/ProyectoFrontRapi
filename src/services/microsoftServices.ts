// src/services/microsoftService.ts
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// Login interactivo
const login = async () => {
  try {
    const response = await msalInstance.loginPopup({
      scopes: ["user.read"],  // Puedes agregar más scopes si es necesario
    });

    const account = response.account;
    if (account) {
      const user = {
        name: account.name,
        email: account.username,
      };
      localStorage.setItem("microsoftUser", JSON.stringify(user));
      return user;
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Microsoft:", error);
    return null;
  }
};

// Obtener el usuario almacenado
const getStoredUser = () => {
  const storedUser = localStorage.getItem("microsoftUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

export default {
  login,
  getStoredUser,
};
