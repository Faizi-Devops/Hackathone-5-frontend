import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const onLogout = () =>{
    let a = localStorage.removeItem("email");
    let b = localStorage.removeItem("name");
    let c = localStorage.removeItem("token");
    navigate('/')
    toast.success("Logout Successfully")

  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a  className="text-white text-sm font-semibold">Advance Todo</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 5h16a1 1 0 110 2H4a1 1 0 110-2zm0 5h16a1 1 0 010 2H4a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:w-auto" id="desktop-menu">
            <ul className="md:flex md:space-x-4 text-white text-sm">
            <Link to="/Dashboard"><li><a  className="hover:text-gray-300">Dashboard</a></li></Link>
              <Link to="/Task"><li><a className="hover:text-gray-300">Tasks</a></li></Link>
              <Link to="/Category"><li><a  className="hover:text-gray-300">Categories</a></li></Link>
              <li><a  className="hover:text-gray-300 hover:cursor-pointer" onClick={onLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? '' : 'hidden'} md:hidden`} id="mobile-menu">
        <ul className="text-white text-sm ">
        <Link to="/Dashboard"><li><a  className="block py-2 px-4 hover:bg-gray-700">Dashboard</a></li></Link> 
        <Link to="/Task"><li><a  className="block py-2 px-4 hover:bg-gray-700">Tasks</a></li></Link>
        <Link to="/Category"><li><a  className="block py-2 px-4 hover:bg-gray-700">Categories</a></li></Link>
          <li><a  className="block py-2 px-4 hover:bg-gray-700 hover:cursor-pointer" onClick={onLogout}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
