import "./components.css";
function Login_btn(params) {
    return (
        <ul className="nav-links">
                <li className="text-sm md:text-base">About</li>
                <li className="text-sm md:text-base"> Features</li>
                <button className="btn mt-3 p-1 pl-1.5 pr-1.5 md:p-2.5 md:pl-5 md:pr-5 text-l md:text-xl "
                onClick={params.open} >Login</button>

            </ul>
    );
}
export default Login_btn;