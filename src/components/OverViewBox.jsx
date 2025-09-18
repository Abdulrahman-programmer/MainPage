import "./components.css";
import productIcon from "../assets/product.svg";
import orderIcon from "../assets/orders.svg";
import outofstockIcon from "../assets/stockWarning.svg";
import stockIcon from "../assets/Stock.svg";
function OverViewBox() {
    return (
        <div className="p-4 m-4 bg-white rounded-lg shadow-md lg:ml-72">
            <h2 className="text-2xl font-bold mb-4 ml-2 lg:ml-4">Overview</h2>
            <div className="container">
                <div className="detailBox ">
                    <div className="iconBox ">
                        <img src={productIcon} alt="" className="w-full"/>
                    </div>
                    <div className="values">
                        <p className="text-2xl font-bold">3562</p>
                        <p>Total Products</p>
                    </div>
                </div>
                <div className="detailBox ">
                    <div className="iconBox ">
                        <img src={stockIcon} alt=""className="w-full" />
                    </div>
                    <div className="values">
                        <p className="text-2xl font-bold">4125</p>
                        <p>Total Stock</p>
                    </div>
                </div>
                <div className="detailBox ">
                    <div className="iconBox ">
                        <img src={orderIcon} alt="" className="w-full"/>
                    </div>
                    <div className="values">
                        <p className="text-2xl font-bold">1352</p>
                        <p>Total Orders</p>
                    </div>
                </div>
                <div className="detailBox  bg-red-400/20 ring-red-300/50">
                    <div className="iconBox bg-red-200">
                        <img src={outofstockIcon} alt="" className="w-full"/>
                    </div>
                    <div className="values text-red-500/50">
                        <p className="text-2xl font-bold">245</p>
                        <p>Out Of Stock</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default OverViewBox;