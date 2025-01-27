"use client";

import '../styles/style.css';
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  req_name: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  status: string;
};

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data.jobs))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (

    <div className="container">
      <h1 className="text-3xl font-bold">Job Portal</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">Job ID</th>
            <th className="border border-gray-300 px-4 py-2">Job Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/jobs/${job.id}`} className="text-blue-500">
                  {job.id}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">{job.req_name}</td>

              <td
                className={`status ${
                  job.status === "Active" ? "status-active" : "status-inactive"
                  }`}
              >
                {job.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
