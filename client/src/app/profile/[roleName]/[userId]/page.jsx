"use client";

import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import userServices from "@/services/user";

const Profile = () => {
  const params = useParams();
  const { roleName, userId } = params;

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', surname: '', email: '', phone: '', adjective: '', features: [] });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userServices.byId(userId);
        setUser(data.data);
        setForm({
          name: data.data.name,
          surname: data.data.surname,
          email: data.data.email,
          phone: data.data.phone,
          adjective: data.data.adjective || '',
          features: data.data.features?.map(f => f.feature) || [],
        });
      } catch (err) {
        toast.error("Kullanıcı bilgisi alınamadı.");
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm(prev => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, features: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateName(userId, { name: form.name });
      await userServices.updateSurname(userId, { surname: form.surname });
      await userServices.updateEmail(userId, { email: form.email });
      await userServices.updatePhone(userId, { phone: form.phone });
      await userServices.updateAdjective(userId, { adjective: form.adjective });
      await userServices.updateFeatures(userId, { features: form.features.map(feature => ({ feature })) });
      toast.success("Bilgiler başarıyla güncellendi!");
    } catch (error) {
      toast.error("Güncelleme sırasında hata oluştu.");
      console.error(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-center w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-center overflow-y-auto">
          <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="p-2 w-full max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold mb-4">User Information</h2>

              {['name', 'surname', 'email', 'phone', 'adjective'].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">{field}</label>
                  <input type="text" name={field} value={form[field]} onChange={handleChange} className="border rounded w-full px-3 py-2" />
                </div>
              ))}

              <div>
                <label className="block mb-1">Features</label>
                {form.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="border rounded px-3 py-2 flex-1" />
                    <button type="button" onClick={() => removeFeature(index)} className="text-red-500">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="text-blue-500">+ Add Feature</button>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;