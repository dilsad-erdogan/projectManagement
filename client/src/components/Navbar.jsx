import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { setSearchTerm } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const filterJobs = useSelector(state => state.job.filteredData);
  console.log(filterJobs);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  const handleLogin = () => {console.log("modal")}

  return (
    <nav className="w-full">
      <div className="hidden lg:flex w-full pt-8 justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold" style={{ fontFamily: "'Lucida Handwriting', cursive" }} onClick={() => navigate('/')}>Project Management</div>

        {/* Search text */}
        <div className="ml-4">
          <div className="relative bg-gray-200 rounded-2xl px-2 flex-1 mx-4">
            <form onSubmit={handleSearch}>
              <FaSearch className="absolute top-3" />
              <input type="text" placeholder="Search..." className="w-full hover:border-b py-2 px-6" onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
        </div>

        {/* Login */}
        <div className="flex flex-row items-center gap-5 m-5 text-2xl" onClick={handleLogin}>
          <FaUserCircle className='font-bold text-xl' />
          <p className='font-bold text-xl'>Login</p>
        </div>
      </div>

      <div className="lg:hidden mt-4">
        <IoMdMenu className="text-4xl" onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-center gap-6 w-full">
          {/* Logo */}
          <div className="text-3xl font-bold" style={{ fontFamily: "'Lucida Handwriting', cursive" }} onClick={() => navigate('/')}>Project Management</div>
          
          {/* Search text */}
          <div className="ml-4">
            <div className="relative bg-gray-200 rounded-2xl px-2 flex-1 mx-4">
              <form onSubmit={handleSearch}>
                <FaSearch className="absolute top-3" />
                <input type="text" placeholder="Search..." className="w-full hover:border-b py-2 px-6" onChange={(e) => setSearch(e.target.value)} />
              </form>
            </div>
          </div>

          {/* Login */}
          <div className="flex flex-row items-center gap-5 m-5 text-2xl" onClick={handleLogin}>
            <FaUserCircle className='font-bold text-xl' />
            <p className='font-bold text-xl'>Login</p>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar