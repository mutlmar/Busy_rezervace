import React, { useState } from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user_id", response.data.user._id);

        const idTrip = localStorage.getItem("idTrip");

        if (response.data.user.isAdmin === true) {
          navigate("/admin/buses");
        } else if (idTrip == null) {
          navigate("/bookings");
        } else if (idTrip !== null) {
          navigate(`/book-now/${idTrip}`);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const TogglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <Helmet>
        <title>Přihlášení</title>
      </Helmet>
      <Form onFinish={onFinish} className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-3/4"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://img5.goodfon.com/wallpaper/nbig/6/6a/temsa-maraton-coach-bus.jpg")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center h-full w-full px-20 bg-gray-900 bg-opacity-40"></div>
        </div>
        <div className="from-gray-50 to-blue-500 bg-gradient-to-r flex w-full lg:w-1/2 justify-center items-center space-y-8">
          <div className="w-3/4 px-8 md:px-32 lg:px-24">
            <div className="flex flex-col items-center mb-10">
              <Link
                to="/"
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-600 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Zpět
                </span>
                <span className="relative invisible">Button Text</span>
              </Link>
            </div>
            <h1 className="mb-8 text-5xl text-center font-bold italic">
              Přihlášení
            </h1>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Zadejte svůj e-mail!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  E-mailová adresa
                </label>
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Zadejte své heslo!",
                  min: 6,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="floating_password"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Heslo
                </label>
                <i
                  className="absolute right-0 top-0 mt-3 mr-4 text-black cursor-pointer"
                  onClick={TogglePassword}
                >
                  {passwordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </i>
              </div>
            </Form.Item>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Přihlásit se
                </span>
                <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
              </button>
            </div>
            <p className="text-center text-base text-gray-600">
              Nemáte účet?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                Registrovat
              </Link>
            </p>
            <p className="text-center text-base text-gray-600">
              <Link
                to="/forgot-password"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                Zapomněli jste heslo?
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
