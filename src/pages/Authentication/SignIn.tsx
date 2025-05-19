import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import googleService from "../../services/googleService";
import Breadcrumb from "../../components/Breadcrumb";
import { setUserInfo } from "../../store/userSlice";
import { useAppDispatch } from "../../hooks/useDispatch"; // Hook tipado
import { GithubAuth } from "../../firebase/firebase"; // Función github
import { MicrosoftAuth } from "../../firebase/firebase"; // Función microsfot
import { loginUser } from "../../models/usuarioLogin";
import securityService from "../../services/securityService";
import axios from "axios";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedGoogleUser = googleService.getStoredUser();
    if (storedGoogleUser) {
      console.log("Usuario de google encontrado en localStorage", storedGoogleUser);
      navigate("/")
    }

    const initializeGoogleSignIn = () => {
        googleService.initialize(handleGoogleLoginResponse);
        googleService.renderButton('google-signin');
    };

    googleService.loadScript(initializeGoogleSignIn);

  }, [dispatch, navigate]);

  const handleLogin = async (user: loginUser) => {
    console.log("Usuario" + JSON.stringify(user));
    try {
      const response = await securityService.login(user)
      console.log("Usuario autenticado: ", response);
      navigate("/");

      
    } catch (error) {
      console.error('Error al iniciar sesión con login normal', error);
    }
  }

  const handleGoogleLoginResponse = (response: any) => {
    try {
      const credential = response.credential;
      if (credential) {
        const user = googleService.parseJwt(credential);
        const logedUser = {
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          token: credential,
        }
        console.log('Token de Google:', credential);
        if (logedUser && user) {
          localStorage.setItem('loginUser', JSON.stringify(logedUser));
          console.log('Usuario de Google autenticado (con servicio):', user);
          dispatch(setUserInfo(user)); // Despachar al store de Redux
          navigate("/");
        }
      }
    } catch (error) {
      console.error('Error al procesar la respuesta de Google:', error);
    }
  };  

  const handleGitHubLoginClick = async () => {
    try {
      const result = await GithubAuth();
      console.log("Resultado llamada gitHub", result);
      
      if (result?.user) {
        const { displayName, email, photoURL, uid } = result.user;
        const nombreUsuario = (result?.user as any)?.reloadUserInfo?.screenName;  // Porque el displayName me estaba saliendo Null, entonces toco acceder a este componente
        const token = result?.accessToken;
        console.log("Token de Github", token);
        const githubUser = {
          name: displayName || nombreUsuario ||  'Usuario de GitHub',
          email: email || "",
          picture: photoURL || "",
          uid: uid,
          provider: 'github',
          token: token, // Token de acceso
        };
        localStorage.setItem('loginUser', JSON.stringify(githubUser));
        console.log("Usuario de Github autenticado: ", githubUser);
        dispatch(setUserInfo(githubUser));
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión con GitHub: ", error.message);
    }
  }; 
  
  const handleMicrosoftLoginClick = async () => {
    try {
      const result = await MicrosoftAuth();
      console.log("Resultado llamada Microsoft:", result);

      if (result?.user && result?.accessToken) {
        const { displayName, uid } = result.user;
        const email = (result?.user as any).reloadUserInfo?.providerUserInfo?.[0]?.email 
        const token = result?.accessToken;
        let photoURL = "";

        console.log("Email de Microsfot: ", email);        
        console.log("Token de acceso de Microsfot:", token);

        // Obtener foto de perfil
        try {
          const photoResponse = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            responseType: 'blob' // Importante para manejar la respuesta como un blob
          });

          if (photoResponse.data) {
            photoURL = URL.createObjectURL(photoResponse.data);
            console.log("Photo URL de Microsoft (desde Graph API):", photoURL);
          }
        } catch (photoError) {
            console.error("Error al obtener la foto de Microsoft Graph:", photoError);
            photoURL = ""; // En caso de error, dejamos la URL de la foto vacía
        }

        const microsoftUser = {
          name: displayName || 'Usuario de Microsoft',
          email: email || "",
          picture: photoURL,
          uid: uid,
          provider: 'microsoft',
          token: token, 
        };

        localStorage.setItem('loginUser', JSON.stringify(microsoftUser));
        console.log("Usuario de Microsfot autenticado: ", microsoftUser);
        dispatch(setUserInfo(microsoftUser));
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión con Microsoft: ", error.message);
    }
  };
  
  return (
    <>
      <Breadcrumb pageName="Sign In" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to TailAdmin
              </h2>

              <Formik
                initialValues={{
                  email: "",
                  password: ""
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
                  password: Yup.string().required("La contraseña es obligatoria"),
                })}
                onSubmit={(values) => {
                  const formattedValues = { ...values, name: "", picture: "" };  // Formateo adicional si es necesario
                  handleLogin(formattedValues);
                }}

              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                      <Field type="email" name="email" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Edad */}
                    <div>
                      <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                      <Field type="password" name="password" className="w-full border rounded-md p-2" />
                      <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                    </div>
                    {/* Botón de enviar */}
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Login
                    </button>
                    {/* Google Sign-in */}
                    <div id="google-signin"></div>
                    {/*Github Sign-in */}
                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#24292F] px-4 py-4 text-white transition-all hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50"
                      onClick={handleGitHubLoginClick}
                    >
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                          fillRule="evenodd"
                          d= "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" 
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign in with Github
                    </button>
                    {/* Microsoft Sign-In */}
                    <button
                      onClick={handleMicrosoftLoginClick}
                      type="button"
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-4 text-gray-800 transition-all hover:bg-gray-100 border border-gray-300 focus:ring-4 focus:ring-[#00A1F1]/50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H11V11H1V1Z" fill="#F25022" />
                        <path d="M12 1H22V11H12V1Z" fill="#7FBA00" />
                        <path d="M1 12H11V22H1V12Z" fill="#00A4EF" />
                        <path d="M12 12H22V22H12V12Z" fill="#FFB900" />
                      </svg>
                      Iniciar sesión con Microsoft
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="mt-6 text-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
