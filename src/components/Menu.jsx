import React, { useState } from "react";
import menuIcon from '../assets/menu.svg';
import inventoryIcon from '../assets/inventory.svg';
import dashboardIcon from '../assets/dashboard.svg';
import lowstockIcon from '../assets/lowStock.svg';
import reportIcon from '../assets/report.svg';
import salesIcon from '../assets/sales.svg';
import settingIcon from '../assets/setting.svg';
import logoutIcon from '../assets/logout.svg';
import closeIcon from '../assets/close.svg';


const menuItems = [
    { name: "Dashboard", link: "#", icon: dashboardIcon },
    { name: "Inventory", link: "#", icon: inventoryIcon },
    { name: "Sales", link: "#", icon: salesIcon },
    { name: "Report", link: "#", icon: reportIcon },
    { name: "LowStock", link: "#", icon: lowstockIcon },
    { name: "Setting", link: "#", icon: settingIcon },
    { name: "Logout", link: "#", icon: logoutIcon },
];

const Menu = () => {
    const [open, setOpen] = useState(false);
    const icon = open ? closeIcon : menuIcon;
    const name = "Shruti kumari";
    const email = "shruti51352@gmail.com";
    const profileIcon = "https://imgs.search.brave.com/0w706iazLuiZA7_266Xh7P1rBBHA32banx87yLoT5ZI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2L2Zm/L2NiLzY2ZmZjYjU2/NDgyYzY0YmRmNmI2/MDEwNjg3OTM4ODM1/LmpwZw";
    const profile = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
    return (
        <div>
            {/* Menu Button - hidden on large screens */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-4 left-2 z-150 bg-white rounded-full shadow-[0px_0px_10px_rgba(0,0,0,0.5)] p-2 focus:outline-none lg:h-0 lg:w-0 lg:p-0 lg:invisible"
            >
                <img src={icon} alt="Menu Icon" className="w-8 h-8" />
            </button>


            {/* Overlay - only on small/medium screens */}
            <div
                className={`fixed inset-0 h-screen bg-black bg-opacity-10 transition-opacity duration-300 z-40 ${open ? "opacity-10 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:hidden`}
                onClick={() => setOpen(false)}
            />

            {/* Sliding Menu */}
            <nav
                className={`
                    fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0  lg:shadow-none
                    
                `}
            >
                <div className=" w-full ">
                    <img src={profile} alt={profileIcon} className="rounded-full h-30 w-30 m-auto mt-10 mb-2 ring-1 ring-gray-400 shadow-2xl" />
                    <p className="text-xl text-center">{name}</p>
                    <p className="text-xs text-center text-gray-500">{email}</p>
                </div>

                <ul className="mt-5 lg:mt-8 space-y-2 px-6 flex flex-col">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setOpen(false)} className="flex w-full p-2 rounded-md gap-2 bg-blue-200 justify-center hover:bg-gray-300"   >
                            <img src={item.icon} alt="" />{item.name}
                        </button>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;