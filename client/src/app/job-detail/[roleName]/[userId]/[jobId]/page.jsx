"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import jobServices from '@/services/job';

const page = () => {
  const params = useParams();
  const { roleName, userId, jobId } = params;

  const jobs = useSelector(state => state.job.jobs);
  const users = useSelector(state => state.user.users);

  const job = jobs.find(j => j._id === jobId);
  const owner = job ? users.find(u => u._id === job.customer_id) : null;

  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [completionMsg, setCompletionMsg] = useState("");

  const handleReportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("report", file);
    setSelectedFileName(file.name);

    try {
      setUploading(true);
      setMessage("");

      const res = await fetch(`http://localhost:3030/job/upload-report/${jobId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Report uploaded successfully.");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("An error occurred.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleCompleteJob = async () => {
    try {
      await jobServices.updateCompletionState(jobId, { completion_state: true });
      setCompletionMsg("Job marked as completed.");
    } catch (err) {
      setCompletionMsg("Failed to complete the job.");
    }
  };

  return (
    <div className='flex justify-center items-start gap-10 w-full max-w-[1200px] mt-2'>
      {/* Sidebar */}
      <div className="w-1/6 p-5 mt-10 h-full overflow-y-auto border-r border-black dark:border-white">
        <Sidebar roleName={roleName} userId={userId} />
      </div>

      {/* Content */}
      <div className='flex justify-center items-start w-full max-w-[1200px]'>
        <div className="w-5/6 p-5 flex flex-col justify-start overflow-y-auto">
          {job ? (
            <div className="p-5 border rounded-2xl cursor-pointer">
              <button onClick={handleCompleteJob} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Finish the Job</button>

              <h2 className="text-2xl font-bold mb-4 mt-5">Job Details</h2>
              <p><strong>Owner:</strong> {owner ? `${owner.name} ${owner.surname}` : job.customer_id}</p>
              <p><strong>Title:</strong> {job.title}</p>
              <p><strong>Short Description:</strong> {job.short_description}</p>
              <p><strong>Long Description:</strong> {job.long_description}</p>
              <p><strong>Price Range:</strong> {job.min_price}₺ - {job.max_price}₺</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Starting State:</strong> {job.starting_state ? "True" : "False"}</p>
              <p><strong>Completion State:</strong> {job.completion_state ? "True" : "False"}</p>
              <p><strong>Difficulty State:</strong> {job.difficulty_state ? "True" : "False"}</p>

              {completionMsg && <p className="text-green-600 mt-2">{completionMsg}</p>}
              {selectedFileName && <p className="mt-1 text-sm text-gray-600">Selected file: {selectedFileName}</p>}
              
              {job.reports && job.reports.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold">Uploaded Reports:</h3>
                  <ul className="list-disc list-inside text-sm">
                    {job.reports.map((report, index) => (
                      <li key={index}>
                        <a href={`http://localhost:3030/${report.pdf_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Report {index + 1} - {new Date(report.date).toLocaleDateString()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5">
                <label className="block font-semibold mb-2">Upload PDF Report</label>
                <input type="file" accept="application/pdf" onChange={handleReportUpload} />
                {uploading && <p className="text-blue-500 mt-2">Loading...</p>}
                {message && <p className="mt-2 mr-4 text-sm">{message}</p>}
              </div>
            </div>
          ) : (
            <p>Job not found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page;