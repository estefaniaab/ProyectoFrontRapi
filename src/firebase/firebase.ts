import { 
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider // Generico, sirve para microsoft
} from "firebase/auth";
import { app } from "./init";

const auth = getAuth(app)
const githubProvider = new GithubAuthProvider(); // Github authentication
const microsoftProvider = new OAuthProvider('microsoft.com') // Proveedor para Microsoft

export const GithubAuth = async () => {
  const userAuth = await signInWithPopup(auth, githubProvider);
  const credential = GithubAuthProvider.credentialFromResult(userAuth);
  const accessToken = credential?.accessToken;
  return {user: userAuth.user, accessToken};
}

export const MicrosoftAuth = async () => {
  try {
    const userAuth = await signInWithPopup(auth, microsoftProvider);
    const credential = OAuthProvider.credentialFromResult(userAuth);
    const accessToken = credential?.accessToken; // Sacamos el token de acceso para mostrarlo ya que el profe lo pidio :D
    // Puede devolver más cosas pero solo necesitamos el usuario:
    return {user: userAuth.user, accessToken}
  } catch (error) {
    console.error("Error en signin with Microsft:", error);
    return null
  }
}