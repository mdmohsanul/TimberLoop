import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { signUpUser } from "../features/userSignUpSlice";

const SignUp_Page = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.userSignUp);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSignup = async () => {
    const userInput = { userName, email, password };
    if (
      userInput.userName !== "" &&
      userInput.password !== "" &&
      userInput.email !== ""
    ) {
      setTimeout(() => {
        dispatch(signUpUser(userInput));
        setSuccess(true);
      }, 5000);
    }
    if (error !== null) {
      setEmail("");
      setPassword("");
      setUsername("");
      setIsSignInForm(true);
    } else {
      setIsSignInForm(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="w-full min-h-screen ">
        <div className="bg-[url('/20250121_134247.webp')] bg-cover bg-no-repeat min-h-screen w-full bg-opacity-25">
          <div className="flex  items-center justify-center md:justify-end ">
            <div className=" bg-black bg-opacity-85 w-11/12 mt-24 mb-6 md:mr-14 md:w-5/12  py-8 px-4 md:py-8 md:px-[68px]">
              {success ? (
                <div>
                  <p className="text-white text-xl pb-6 tracking-wider">
                    User Registered Successfully!
                  </p>
                  <Link
                    to="/login"
                    className="text-white hover:underline tracking-wider"
                  >
                    Go To Login!
                  </Link>
                </div>
              ) : (
                <div>
                  <form
                    onClick={(e) => e.preventDefault()}
                    className=" flex flex-col"
                  >
                    <h1 className="text-3xl font-semibold text-white mb-8">
                      Sign Up
                    </h1>

                    <input
                      type="Name"
                      placeholder="Full Name"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-3 py-4 mb-5 w-full tracking-wider bg-gray-800 rounded-md text-white focus:outline-none"
                    />

                    <input
                      type="Email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-3 py-4 mb-5 w-full tracking-wider bg-gray-800 rounded-md text-white focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-3 py-4 mb-4 w-full tracking-wider bg-gray-800 rounded-md text-white focus:outline-none"
                    />

                    {error && (
                      <p className="text-red-800">Please Enter Valid Details</p>
                    )}
                    <button
                      className="px-3 py-4 mt-7 bg-red-700 text-white rounded-md tracking-wider"
                      onClick={handleSignup}
                    >
                      Sign Up
                    </button>
                  </form>

                  <div className="mt-5 mb-10 flex justify-between items-center">
                    <label className="text-gray-500 cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded-md bg-slate-400"
                      />
                      Remember Me
                    </label>
                    <p className="text-gray-500 cursor-pointer hover:underline">
                      Need Help?
                    </p>
                  </div>

                  <Link to="/login">
                    {" "}
                    <p className="text-gray-500 font-semibold ">
                      Already registered !
                      <span className="text-white cursor-pointer hover:underline pl-2">
                        Sign In now
                      </span>
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp_Page;
