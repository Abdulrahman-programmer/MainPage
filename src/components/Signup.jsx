import { use, useState } from "react";
import closeIcon from "../assets/close.svg"
import "./components.css"

function SignUp(params) {

    const [visibility, setVisiblity] = useState("password")

    return (
        <div className="box top-15">
            <div className=" flex justify-end" >
                <img src={closeIcon} className="opacity-70 cursor-pointer"
                alt="close" onClick={() => { params.close() }} />
            </div>
            <h1 className="text-5xl pt-10 label text-center">Sign up</h1>
            <form action="" method="post" className="flex flex-col p-10 pb-0 pt-5">

                <label htmlFor="gst" className="label">GST no.</label>
                <input type="text" name="gst" id="gstNo" required className="ip" />

                <label htmlFor="Name" className="label">Name</label>
                <input type="text" name="Name" id="name" required className="ip" />

                <label htmlFor="email" className="label">Email</label>
                <input type="email" name="email" id="email" required className="ip" />

                <label htmlFor="password" className="label">password</label>
                <input type={visibility} name="password" id="password" required className="ip" />
                <div >
                    <input
                        type="checkbox"
                        onChange={(e) => setVisiblity(e.target.checked ? "text" : "password")}
                        className="mr-1.5"
                    />  <p className="inline label ">show password</p>
                </div>

                <input type="submit" value="Sign up" className="btn mt-5 mb-0" />
            </form>
            <p className="text-center mt-5 mb-10 label">
                Already have an account?
                <button
                    className="text-blue-500 pl-1 hover:underline dark:text-blue-700"
                    onClick={params.openLogin}
                >
                    Login
                </button>
            </p>
        </div>
    )
}

export default SignUp;
