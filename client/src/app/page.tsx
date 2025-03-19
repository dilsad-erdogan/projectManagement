"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux"
import agreementServices from "../services/agreement";
import auctionServices from "../services/auction";
import jobServices from "../services/job";
import periodServices from "../services/period";
import roleServices from "../services/role";
import userServices from "../services/user";
import { setAgreements } from "../redux/agreementSlice";
import { setAuctions } from "../redux/auctionSlice";
import { setJobs } from "../redux/jobSlice";
import { setPeriods } from "../redux/periodSlice";
import { setRoles } from "../redux/roleSlice";
import { setUsers } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import Main from "../pages/Main";
import { useEffect, useState } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState([]);
  const [auction, setAuction] = useState([]);
  const [job, setJob] = useState([]);
  const [period, setPeriod] = useState([]);
  const [role, setRole] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const data = await agreementServices.get();
        setAgreement(data.data || []);
      } catch (error) {
        console.error("Error fetching agreement:", error);
      }
    };

    const fetchAuction = async () => {
      try {
        const data = await auctionServices.get();
        setAuction(data.data || []);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };

    const fetchJob = async () => {
      try {
        const data = await jobServices.get();
        setJob(data.data || []);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    const fetchPeriod = async () => {
      try {
        const data = await periodServices.get();
        setPeriod(data.data || []);
      } catch (error) {
        console.error("Error fetching period:", error);
      }
    };

    const fetchRole = async () => {
      try {
        const data = await roleServices.get();
        setRole(data.data || []);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const data = await userServices.get();
        setUser(data.data || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchAgreement();
    fetchAuction();
    fetchJob();
    fetchPeriod();
    fetchRole();
    fetchUser();
  }, []);

  useEffect(() => {
    dispatch(setAgreements(agreement));
    dispatch(setAuctions(auction));
    dispatch(setJobs(job));
    dispatch(setPeriods(period));
    dispatch(setRoles(role));
    dispatch(setUsers(user));
  }, [agreement, auction, job, period, role, user]);

  return (
    <div className='h-screen'>
      <Router>
        <Navbar />

        <div className='flex w-full overflow-hidden'>
          <Toaster position='top-right' />

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/profile' element={<Main />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}