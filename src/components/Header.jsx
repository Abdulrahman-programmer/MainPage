import Logo from '../assets/logo.png';
function Header() {
   return (
      <header className='flex justify-center bg-white w-[100vw]' >
        <div className='flex items-center gap-1.5 p-4 text-3xl font-bold text-gray-800 lg:ml-72'>
            <img src={Logo} alt="" className='h-15' />
            Vyapix
        </div>
      </header>
   ); 
}
export default Header;