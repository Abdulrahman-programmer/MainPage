import React, { useState } from "react";
import { Link } from "react-router-dom";
import dashboardIcon from '../assets/dashboard.svg';
import inventoryIcon from '../assets/inventory.svg';
import salesIcon from '../assets/sales.svg';
import reportIcon from '../assets/report.svg';
import lowstockIcon from '../assets/lowStock.svg';
import settingIcon from '../assets/setting.svg';
import logoutIcon from '../assets/logout.svg';
import menuIcon from '../assets/menu.svg';
import closeIcon from '../assets/close.svg';
import "./components.css";
import DarkModeToggle from "./Btn-toggle";
import { param } from "framer-motion/client";


const menuItems = [
  { name: "Dashboard", link: ".", icon: dashboardIcon },
  { name: "Inventory", link: "inventory", icon: inventoryIcon },
  { name: "Sales", link: "sales", icon: salesIcon },
  { name: "Report", link: "report", icon: reportIcon },
  { name: "LowStock", link: "lowstock", icon: lowstockIcon },
  { name: "Setting", link: "setting", icon: settingIcon },
  { name: "Logout", link: "/", icon: logoutIcon }, // redirect to before login
];

const Menu = (param) => {
    
    const [open, setOpen] = useState(false);
    const icon = open ? closeIcon : menuIcon;
    const name = param.name || "User";
    const email = param.email || "example@email.com";
    
    
    const profileIcon = "https://imgs.search.brave.com/hQGpORTxbSweZrFglnSiOKQOz1YBschmBRDlbCpiUu0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/MjAzLzEzNS9zbWFs/bC9hYnN0cmFjdC1o/dW1hbi1zaWxob3Vl/dHRlLXdpdGgtYmx1/ZS1ncmFkaWVudC1p/c29sYXRlZC1vbi10/cmFuc3BhcmVudC1i/YWNrZ3JvdW5kLXBu/Zy5wbmc";
    const profile = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
    return (
        <div className="bg-blue-950 ">
            {/* Menu Button - hidden on large screens */}
            <button
                onClick={() => setOpen(!open)}
                className={`fixed top-4 left-2 z-150 bg-white ${open? "rounded-full" : "rounded-md"} shadow-[0px_0px_10px_rgba(0,0,0,0.5)] 
                transition-all duration-200 ease-in transition-discrete
                p-2 focus:outline-none lg:h-0 lg:w-0 lg:p-0 lg:invisible dark:bg-gray-500`}
            >
                <img src={icon} alt="Menu Icon" className="w-8 h-8" />
            </button>


            {/* Overlay - only on small/medium screens */}
            <div
                className={`fixed inset-0 h-screen bg-black bg-opacity-10 transition-opacity duration-300 z-40 ${open ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:hidden`}
                onClick={() => setOpen(false)}
            />

            {/* Sliding Menu */}
            <nav
                className={`
                    fixed top-0 left-0 h-screen w-64 bg-blue-950 shadow-lg z-50
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0  lg:shadow-none dark:bg-gray-800
                    
                `}
            > { /* Profile Section */}
                    <DarkModeToggle islogin ={true}/>
                <div className=" w-full ">
                    <img src={profileIcon} alt={profileIcon} className="rounded-full h-30 w-30 m-auto mt-10 mb-2 ring-1 ring-gray-400 shadow-2xl" />
                    <p className="text-xl text-center text-white">{name}</p>
                    <p className="text-xs text-center text-gray-300">{email}</p>
                </div>
                
                    {/* Menu Items */}
                <ul className="mt-5 lg:mt-8 space-y-2 px-6 flex flex-col">
                    {menuItems.map((item) => (
                        <Link to={item.link}
                         key={item.name}>      
                        <button
                            key={item.name}
                            onClick={() =>{ setOpen(false)}} className="flex w-full py-2 rounded-md gap-2 bg-blue-200  px-12 hover:bg-gray-300 hover:scale-110 transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-500"   >
                            <img src={item.icon} alt="" />{item.name}
                        </button>
                        </Link>
                    ))}
                </ul>
               
            </nav>
        </div>
    );
};

export default Menu;