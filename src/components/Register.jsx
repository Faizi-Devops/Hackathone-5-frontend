import { Field, Formik, useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [flag, setFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pass,setPass]=useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const toggle = () => {
    setPass(prevState => !prevState);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userConfirm: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("User name is required")
        .matches(
          /^[a-zA-Z ]*$/,
          "User name can only contain alphabets and spaces"
        )
        .min(3, "User name must be at least 3 characters")
        .max(15, "User name must not exceed 15 characters"),

      userEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),

      userPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

      userConfirm: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("userPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      let a = {
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
        password_confirmation: values.userConfirm,
      };

      try {
        setFlag(true);
        const response = await axios.post(
          "https://faizan-hackathon.vercel.app/user/register",
          a
        );
        setFlag(false);
        console.log(response)
        
        if (response.data.status === "success") {
          console.log(response.data);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
        } else {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        setFlag(false)
        toast.error(error.response.data.message)
      }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen px-[1rem]">
      <ToastContainer />
      <div class="block max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center pb-2">
          Register
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="first_name"
            className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
              formik.touched.userName && formik.errors.userName
                ? 'border-red-500' // Apply red border only when there's an error
                : 'border-gray-300 focus:border-gray-300' // Default and focus border colors
            }`}
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name......."
          ></input>
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-red-500 text-xs">{formik.errors.userName}</div>
          ) : null}
          <input
            type="email"
            id="first_name"
            className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
              formik.touched.userEmail && formik.errors.userEmail
                ? 'border-red-500' // Apply red border only when there's an error
                : 'border-gray-300 focus:border-gray-300' // Default and focus border colors
            }`}
            name="userEmail"
            value={formik.values.userEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email......."
          ></input>
          {formik.touched.userEmail && formik.errors.userEmail ? (
            <div className="text-red-500 text-xs">
              {formik.errors.userEmail}
            </div>
          ) : null}
          <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id="userPassword"
        name="userPassword"
        value={formik.values.userPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
          formik.touched.userPassword && formik.errors.userPassword
            ? 'border-red-500'
            : 'border-gray-300 focus:border-gray-300'
        }`}
        placeholder="Password......."
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
          {/* <input
            type="password"
            id="first_name"
            name="userPassword"
            value={formik.values.userPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
              formik.touched.userPassword && formik.errors.userPassword
                ? 'border-red-500' // Apply red border only when there's an error
                : 'border-gray-300 focus:border-gray-300' // Default and focus border colors
            }`}
            placeholder="Password......."
          ></input> */}
          {formik.touched.userPassword && formik.errors.userPassword ? (
            <div className="text-red-500 text-xs">
              {formik.errors.userPassword}
            </div>
          ) : null}
          <div className="relative">
      <input
        type={pass ? 'text' : 'password'}
        id="userConfirm"
        name="userConfirm"
        value={formik.values.userConfirm}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
          formik.touched.userConfirm && formik.errors.userConfirm
            ? 'border-red-500'
            : 'border-gray-300 focus:border-gray-300'
        }`}
        placeholder="Confirm Password......."
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center"
        onClick={toggle}
      >
        {pass ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
          {formik.touched.userConfirm && formik.errors.userConfirm ? (
            <div className="text-red-500 text-xs">
              {formik.errors.userConfirm}
            </div>
          ) : null}
          <Link to="/">
            <div className="text-end text-sm pt-3 ">
              <p>
                Already Registered!{" "}
                <span className="hover:cursor-pointer">Login</span>
              </p>
            </div>
          </Link>
          <div className="text-center pt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              disabled={flag}
            >
              {flag ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
