"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import agreementServices from "@/services/agreement";
import auctionServices from "@/services/auction";
import jobServices from "@/services/job";
import periodServices from "@/services/period";
import roleServices from "@/services/role";
import userServices from "@/services/user";

import { setAgreements } from "@/redux/agreementSlice";
import { setAuctions } from "@/redux/auctionSlice";
import { setJobs } from "@/redux/jobSlice";
import { setPeriods } from "@/redux/periodSlice";
import { setRoles } from "@/redux/roleSlice";
import { setUsers } from "@/redux/userSlice";

const GlobalDataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agreements, auctions, jobs, periods, roles, users] = await Promise.all([
          agreementServices.get(),
          auctionServices.get(),
          jobServices.get(),
          periodServices.get(),
          roleServices.get(),
          userServices.get(),
        ]);

        dispatch(setAgreements(agreements.data || []));
        dispatch(setAuctions(auctions.data || []));
        dispatch(setJobs(jobs.data || []));
        dispatch(setPeriods(periods.data || []));
        dispatch(setRoles(roles.data || []));
        dispatch(setUsers(users.data || []));
      } catch (error) {
        console.error("Global data load error:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return null;
};

export default GlobalDataLoader;