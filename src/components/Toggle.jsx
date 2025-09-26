import React from "react";
import "./components.css";
import daylogo from '../assets/day.svg'
import nightlogo from '../assets/dark.svg'

function Toggle_btn(params) {
    const [theme, setTheme] = React.useState(()=>{document.body.getAttribute('data-theme') || 'day'});   
    function changeBodyAttribute(attr, value) {
        document.body.setAttribute(attr, value);
    }   
    function toggleTheme() {
        const newTheme = theme === 'day' ? 'dark' : 'day';
        setTheme(newTheme);
        changeBodyAttribute('data-theme', newTheme);
    }
    return (
        <button className={`p-2 rounded-full  ${theme === 'day'? 'bg-gray-900 ' :'bg-gray-300'} ${params.islogin? " fixed bottom-3.5 left-25": ""}` } onClick={() => {
            toggleTheme();
        }}>
            <img src={theme === 'day' ? nightlogo :daylogo} alt="" className="h-5 lg:h-7" />
        </button>
    );
}
export default Toggle_btn;