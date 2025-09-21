// Pages/Afterlogin.js
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Menu from '../components/Menu';

function After_logIn() {
  return (
    <>
      <Header islogin={true} />
      <Menu />

      {/* This is where child routes render */}
      <div >
        <Outlet />
      </div>
    </>
  );
}

export default After_logIn;
