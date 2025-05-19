import { loginUser } from "../models/usuarioLogin";
import { store } from "../store/store";
import { clearUserInfo } from "../store/userSlice";
const GOOGLE_CLIENT_ID = "976062190369-v58bmqc43oh7m3cbeodtb9bgf16j4gsp.apps.googleusercontent.com";

// Declara la función global para la API de Google
declare global {
    interface Window {
        google?: any;
    }
}

class GoogleService {
    private clientId: string;
    private scriptLoaded: boolean = false;  

    constructor(clientId: string) {
        if (!clientId) {
            throw new Error("Google Id is required");
        }
        this.clientId = clientId
    }

    public getClientId(): string {
        return this.clientId;
    }

    /*Cargar google SCRIPT */
    public loadScript(callback: () => void): void {
        if (this.scriptLoaded) {
            callback();
            return;
        }

        // Si no se ha cargado, lo cargamos
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            this.scriptLoaded = true;
            callback();
        };

        document.body.appendChild(script);
    }

    public initialize(callback: (response: any) => void): void {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
                client_id: this.clientId,
                callback: callback,
                auto_select: false,
                ux_mode: 'popup',
            });
        } else {
            console.error('Google Identity Services no se cargó correctamente para inicializar.');
        }
    }
    
    public renderButton(elementId: string): void {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.renderButton(
                document.getElementById(elementId)!,
                { theme: 'outline', size: 'large' }
            );
        } else {
            console.error('Google Identity Services no se cargó correctamente para renderizar el botón.');
        }
    }

    public prompt(): void {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.prompt();
        }
    }

    public logout(navigate: (path: string) => void): void {
        localStorage.removeItem('loginUser');
        store.dispatch(clearUserInfo()); // Despacha la acción para limpiar el estado de Redux
        navigate('/')
    }


    public getStoredUser(): loginUser | null {
        const stored = localStorage.getItem('loginUser');
        return stored ? JSON.parse(stored) : null;
    }

    /**
     * Decodificar el token JWT para obtener la info de usuario-
     */
    public parseJwt(token: string): loginUser | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = decodeURIComponent(
                atob(base64Url).split('').map(c => 
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join('')
            );

            return JSON.parse(base64)
        } catch (error) {
            console.error('Error parsing JWT', error);
            return null
        }
    }

}
const googleServiceInstance = new GoogleService(GOOGLE_CLIENT_ID);
export default googleServiceInstance;