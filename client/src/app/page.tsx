"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux"
import store from "../redux/store";
import Navbar from "../components/Navbar";
import Main from "../pages/Main";

export default function Home() {
  return (
    <Provider store={store}>
      <div className='h-screen'>
        <Router>
          <Navbar />

          <div className='flex w-full overflow-hidden'>
            <Toaster position='top-right' />

            <Routes>
              <Route path='/' element={<Main />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  )
}