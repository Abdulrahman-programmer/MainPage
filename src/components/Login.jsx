import "./components.css";
import { useState } from "react";
import closeIcon from "../assets/close.svg";
import { useNavigate } from "react-router-dom";

function Login(params) {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/afterlogin"); // redirect after login
  };

  return (
    <div className="box">
      {/* Close button */}
      <div className="flex justify-end">
        <img
          src={closeIcon}
          alt="close"
          className="opacity-70 cursor-pointer"
          onClick={() => params.close()}
        />
      </div>

      <h1 className="text-5xl pt-10 text-gray-700 text-center">Login</h1>

      <form onSubmit={handleSubmit} method="post" className="flex flex-col p-10 pb-5">
        {/* Email */}
        <label htmlFor="email" className="text-gray-500">Email</label>
        <input type="email" name="email" id="email" required className="ip" />

        {/* Password */}
        <label htmlFor="password" className="text-gray-500">Password</label>
        <input
          type={visibility}
          name="password"
          id="password"
          required
          className="ip"
          autoComplete="on"
        />

        {/* Show password toggle */}
        <label className="flex items-center mt-2 text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            onChange={(e) => setVisibility(e.target.checked ? "text" : "password")}
            className="mr-1.5"
          />
          Show password
        </label>

        {/* Submit */}
        <input type="submit" value="Login" className="btn mt-10" />
      </form>

      {/* Register link */}
      <p className="pb-10 text-center text-gray-700">
        Don't have an account?
        <button
          className="text-blue-500 pl-1 hover:underline"
          onClick={params.openSignup}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
