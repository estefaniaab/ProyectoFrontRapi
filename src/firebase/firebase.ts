import { 
  getAuth,
  signInWithPopup,
  GithubAuthProvider
} from "firebase/auth";
import { app } from "./init";

const auth = getAuth(app)
const githubProvider = new GithubAuthProvider(); // Github authentication



export const GithubAuth = async () => {
  const userAuth = await signInWithPopup(auth, githubProvider);
  return userAuth;
}