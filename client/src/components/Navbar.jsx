"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { setSearchTerm } from '@/redux/jobSlice';
import { login as loginAction } from '@/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import userServices from '@/services/user';
const { login, register } = userServices;

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roles = useSelector(state => state.role.roles);
  const [search, setSearch] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ role_id: '', email: '', password: '', name: '', surname: '', phone: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  const handleLogin = () => setIsLoginModalOpen(true);

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const changeRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const changeLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignIn = async () => {
    try {
      const response = await login({ email: formData.email, password: formData.password });
      dispatch(loginAction(response));
      setUser(response);
      closeModal();
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };

  const handleSignUp = async () => {
    try {
      await register(formData);
      alert('Kayıt Başarılı');
      changeLoginModal();
    } catch (error) {
      alert(error.message || 'Register failed');
    }
  };

  const handleProfileRedirect = () => {
    if (user && roles.length > 0) {
      const userRole = roles.find(role => role._id === user.user.role_id);
      if (userRole) {
        router.push(`/profile/${userRole.name}/${user.user._id}`);
      } else {
        console.error("User role not found");
      }
    }
  };  

  return (
    <nav className="w-full">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex w-full pt-8 justify-between items-center">
        <div className="text-3xl font-bold cursor-pointer" style={{ fontFamily: "'Lucida Handwriting', cursive" }} onClick={() => router.push('/')}>Project Management</div>
        <div className="ml-4">
          <div className="relative bg-gray-200 rounded-2xl px-2 flex-1 mx-4">
            <form onSubmit={handleSearch}>
              <FaSearch className="absolute top-3" />
              <input type="text" placeholder="Search..." className="w-full hover:border-b py-2 px-6" onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 m-5 text-2xl cursor-pointer" onClick={user ? handleProfileRedirect : handleLogin}>
          <FaUserCircle className='font-bold text-xl' />
          <p className='font-bold text-xl'>{user ? (user.user.name) + " " + (user.user.surname) : 'Login'}</p>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl mb-4 font-bold">Login</h2>
            <input type="text" name="email" placeholder="Email" className="w-full border p-2 mb-4 rounded" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="w-full border p-2 mb-4 rounded" onChange={handleChange} />
            <div className='flex flex-col gap-1 justify-center items-center'>
              <p className='text-sm'>OR</p>
              <p className='text-gray-500 text-sm' onClick={changeRegisterModal}>Sign Up</p>
            </div>
            <div className="flex justify-end mt-5 gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignIn}>Sign In</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl mb-4 font-bold">Register</h2>
            <select name="roleId" className="w-full border p-2 mb-4 rounded" onChange={handleChange}>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            {['name', 'surname', 'email', 'phone', 'password'].map(field => (
              <input key={field} type="text" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full border p-2 mb-4 rounded" onChange={handleChange} />
            ))}
            <div className='flex flex-col gap-1 justify-center items-center'>
              <p className='text-sm'>OR</p>
              <p className='text-gray-500 text-sm' onClick={changeLoginModal}>Login</p>
            </div>
            <div className="flex justify-end mt-5 gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;