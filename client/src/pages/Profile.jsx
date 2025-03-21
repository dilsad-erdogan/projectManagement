"use client";

import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { roleName, userId } = useParams();

  return (
    <div>
      <h1>Role: {roleName}</h1>
      <h2>User ID: {userId}</h2>

      {roleName === "Developer" ? (
        <p>Welcome Developer, you can manage everything!</p>
      ) : (
        <p>Welcome Customer, here are your jobs!</p>
      )}
    </div>
  );
};

export default Profile;