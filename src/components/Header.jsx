import Logo from '../assets/logo.png';
import Login_btn from './loginbar';
import Login from './Login';

function Header(params) {
  
   return (<>

      <header className={'flex bg-white w-[100vw] items-center' + `${params.islogin ? " justify-center" : " justify-between"}`} >
         <div className={'flex items-center  gap-0 p-2 text-3xl font-bold text-gray-800 ' + `${params.islogin ? "lg:ml-72" : " "}`}>
            <img src={Logo} alt="" className='h-15' />
            Vyapix
         </div>

         {!params.islogin && <Login_btn open = {params.openLogin}  />}
      </header> 
   </>
   );
}
export default Header;