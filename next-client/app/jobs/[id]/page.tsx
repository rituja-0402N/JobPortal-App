"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import '../../styles/style.css';

type Posting = {
    id: number;
    sitename: string;
    duration: number;
}
type Job = {
    id: number;
    req_name: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    description: string;
    status: string;
    postings?: Posting[];
};

export default function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/jobs/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setJob(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching job details:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <p>Loading job details...</p>;
    }

    if (!job) {
        return <p>Job not found!</p>;
    }

    return (
        <section className="py-24">
            <div className="container">
                <h1 className="text-3xl font-bold">Job Details</h1>
                <h4><strong>ID:</strong> {job.id}</h4>
                <h4><strong>Job Name:</strong> {job.req_name}</h4>
                <h5><strong>Location:</strong> {job.location.city}, {job.location.state}, {job.location.country}</h5>
                <h6><strong>Status:</strong> {job.status}</h6>
                <p><strong>Description:</strong> {job.description}</p>
                <br></br>
                <h1 className="text-3xl font-bold">Postings</h1>

                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">No.</th>
                            <th className="border border-gray-300 px-4 py-2">Post ID</th>
                            <th className="border border-gray-300 px-4 py-2">Site Name</th>
                            <th className="border border-gray-300 px-4 py-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {job.postings?.map((post, index) => (
                            <tr key={post.id}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2"> {post.id}</td>
                                <td className="border border-gray-300 px-4 py-2"> {post.sitename}</td>
                                <td className="border border-gray-300 px-4 py-2"> {post.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6">
                    <Link href="/jobs" className="text-blue-500">
                        &larr; Back to Jobs List
          </Link>
                </div>
            </div>
        </section>
    );
}
