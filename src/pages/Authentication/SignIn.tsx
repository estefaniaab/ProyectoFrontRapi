import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import googleService from "../../services/googleService";
import Breadcrumb from "../../components/Breadcrumb";
import { setUserInfo } from "../../store/userSlice";
import { useAppDispatch } from "../../hooks/useDispatch"; // Hook tipado
import { GithubAuth } from "../../firebase/firebase"; // Función github


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

  const handleGoogleLoginResponse = (response: any) => {
    try {
      const credential = response.credential;
      if (credential) {
        const user = googleService.parseJwt(credential);
        if (user) {
          localStorage.setItem('loginUser', JSON.stringify(user));
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
        const githubUser = {
          name: displayName || nombreUsuario ||  'Usuario de GitHub',
          email: email || "",
          picture: photoURL || "",
          uid: uid,
          provider: 'github'
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
                  const formattedValues = { ...values };  // Formateo adicional si es necesario
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
                    <div id="google-signin"></div>
                    <button
                      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                      onClick={handleGitHubLoginClick}
                    >
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.77 5.1 5.1 0 0 0 14.57 2.74 5.44 5.44 0 0 0 9 2.77 5.1 5.1 0 0 0 3.46 6.72a3.37 3.37 0 0 0-.94 2.61V21m-7-6c2.76-.35 5.81-1.54 5.81-7 0-3.9-2.72-7-7.62-7a5.3 5.3 0 0 0-.06.22C9 3.7 7.28 7 7.28 11.97c0 5.43 3.17 7.07 5.81 7.07" />
                        </svg>
                      </span>
                      Sign in with Github
                    </button>
                    {/* <button
                      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50" 
                      id="google-signin" 
                      onClick={handleGoogleLoginClick}
                    >
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_191_13499)">
                            <path
                              d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                              fill="#4285F4"
                            />
                            <path
                              d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                              fill="#34A853"
                            />
                            <path
                              d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                              fill="#EB4335"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_191_13499">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      Sign in with Google
                    </button> */}
                    {/* Microsoft Sign-In */}
                    <button
                      type="button"
                      className="w-full rounded-lg border border-blue-700 bg-blue-600 text-black py-2 hover:bg-blue-700"
                    >
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
