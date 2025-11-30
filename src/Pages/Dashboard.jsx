import Greeting from "../components/Greeting";
import OverViewBox from "../components/OverViewBox";
import BestSellers from "../components/BestSellers";
import MaxSales from "../components/MaxSales";
import { useOutletContext } from "react-router-dom";

function Dashboard(param) {
    const name = localStorage.getItem("userName") || "Admin";
    return (
    <>
        <Greeting name={name} />
        <OverViewBox />
        <div className='flex flex-col py-4 gap-4 lg:ml-72 lg:flex-row mx-4'>
            <BestSellers />
            <MaxSales />
        </div>
    </>
    );
}
export default Dashboard;