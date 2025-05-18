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
  const credential = GithubAuthProvider.credentialFromResult(userAuth);
  const accessToken = credential?.accessToken;
  return {user: userAuth.user, accessToken};
}