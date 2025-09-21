import Menu from '../components/Menu'
import Header from '../components/Header'
import Dashboard from './Dashboard'
import Inventory from './Inventory'
import Sales from './Sales'
import Report from './Report'
import LowStock from './LowStock'
import Setting from './Setting'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
function After_logIn() {
    return (
        <>
        
            <Header login = {true} />

            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/sales' element={<Sales />} />
                    <Route path='/report' element={<Report />} />
                    <Route path='/lowstock' element={<LowStock />} />
                    <Route path='/setting' element={<Setting />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default After_logIn;