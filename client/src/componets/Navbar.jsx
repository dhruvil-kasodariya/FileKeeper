import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../store/user/user.selecter';
import { signOutSuccess } from '../store/user/user.action';
import { FaUser } from 'react-icons/fa';


function Navbar() {
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const currentUser =useSelector(selectCurrentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogOut =()=>{
    dispatch(signOutSuccess());
    navigate('/')
  }
  return (

  <nav className="bg-[#3C5D9B] p-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-white text-lg font-bold">
    File Keeper
    </div>
   
    <ul className="flex space-x-4 justify-end items-center">
          <li>
            <a  className="text-white hover:text-gray-300 " onClick={()=>navigate("/file-list")}>FileList</a>
          </li>
          <div className="relative">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-3 py-2 text-white bg-[#476aaa] rounded-md hover:bg-blue-700 focus:outline-none"
      >
        <span>User</span>
        <FaUser className="w-5 h-5 ml-2" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.username}</p>
          </div>
          <div className="py-1">
            <span
              onClick={handleLogOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
        </ul>
    
  </div>
</nav>
  )
}

export default Navbar
