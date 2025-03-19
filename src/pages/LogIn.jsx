import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../features/userLogInSlice";
import { signUpUser } from "../features/userSignUpSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error, token } = useSelector(
    (state) => state.userLogIn
  );
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  // Get the 'from' location or default to the home Page
  const from =
    location.state?.from === "/userProfile" || location.state?.from == undefined
      ? "/"
      : location.state?.from;
  console.log(from);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  function validation() {
    if (!email || !password) {
      setErr("Enter valid email & password");
      return false;
    }
    setErr("");
    return true;
  }
  const handleLogin = () => {
    if (!validation()) return;
    setIsLogIn(true);
    try {
      dispatch(loginUser({ email, password })).then((result) => {
        console.log(result.payload);
        if (result?.error?.message === "Rejected") {
          setErr(result.payload);
          setIsLogIn(false);
        } else {
          setEmail("");
          setPassword("");
          navigate(from, { replace: true });
          // navigate("/");
        }
      });
    } catch (error) {
      setErr(error || "Failed to Log In. Please try again.");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="w-full min-h-screen relative ">
        <div className="bg-[url('/20250121_134247.webp')] bg-cover bg-no-repeat min-h-screen w-full bg-opacity-25">
          <div className="flex  items-center justify-center md:justify-end ">
            <div className=" bg-black bg-opacity-85 w-11/12 mt-32 md:mt-24 mb-6 md:mr-14 md:w-5/12  py-8 px-4 md:py-8 md:px-[68px]">
              <form
                action=""
                onClick={(e) => e.preventDefault()}
                className=" flex flex-col"
              >
                <h1 className="text-3xl font-semibold text-white mb-8">
                  Sign In
                </h1>
                {err && <p className="text-red-800 pb-4">{err}</p>}
                <input
                  type="Email"
                  placeholder="Email"
                  value={email}
                  autoComplete="true"
                  onFocus={() => setErr("")}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-4 mb-5 w-full tracking-wider bg-gray-800 rounded-md text-white focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onFocus={() => setErr("")}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="px-3 py-4 mb-4 w-full tracking-wider bg-gray-800 rounded-md text-white focus:outline-none"
                />

                <button
                  className={`px-3 py-4 mt-7 bg-red-700 text-white rounded-md tracking-wider ${
                    isLogIn ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleLogin}
                  type="submit"
                  disabled={isLogIn}
                >
                  {isLogIn ? "Signing In..." : "Sign In"}
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

              <Link to="/signup">
                {" "}
                <p className="text-gray-500 font-semibold ">
                  New to Timber ?
                  <span className="text-white cursor-pointer hover:underline pl-2">
                    Sign up now
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
