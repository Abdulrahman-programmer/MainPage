import React, { useState } from "react";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Login from "../components/Login";
import SignUp from "../components/Signup";


function Before_logIn() {
    const [loginOrSignUp, setLoginOrSignUp] = useState(null);
    const islogin = (loginOrSignUp === "login");
    const isSignup = (loginOrSignUp === "signup");
    return (
        <div>
           <Header islogin = {false} 
           openLogin = {() => setLoginOrSignUp('login')}
           openSignup ={() => setLoginOrSignUp('signup')}/>
           <Intro openSignup ={() => setLoginOrSignUp('signup')}/>
           {islogin && <Login close = {()=> setLoginOrSignUp(null)} openSignup ={() => setLoginOrSignUp('signup')}/>}
           {isSignup && <SignUp close = {() => setLoginOrSignUp(null)}/>}
          <div
                className={`fixed inset-0 h-screen bg-black bg-opacity-100 
                    transition-opacity duration-300 z-10 ${loginOrSignUp ? "opacity-50 pointer-events-auto " : "opacity-0 pointer-events-none"} `}
                onClick={() => setLoginOrSignUp(null)}
            />
        </div>
    )
}
export default Before_logIn;