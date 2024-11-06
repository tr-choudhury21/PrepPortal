// src/pages/BranchDocuments.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BranchDocuments = () => {
    const { branchShort } = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {

            
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/docs/getalldocumentsbybranch?branch=${branchShort}`);

                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        };

        if(branchShort) fetchDocuments();
    }, [branchShort]);

    if (loading) {
        return <h1 className="text-center py-10">Loading documents...</h1>;
    }

    return (
        <div className="container mx-auto py-24">
            <h1 className="text-3xl font-bold text-center mb-10">
                {branchShort} Documents
            </h1>
            {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <div key={doc._id} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-bold">{doc.subject}</h2>
                            <p className="text-gray-600">Semester: {doc.semester}</p>
                            <p className="text-gray-600">Year: {doc.year}</p>
                            <p className="mt-2 text-gray-500">Uploaded by: {doc.uploadedBy}</p>
                            <p className="mt-2 text-gray-500">{doc.content}</p>
                            <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 mt-4 inline-block"
                            >
                                View Document
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No documents found for this branch.</p>
            )}
        </div>
    );
};

export default BranchDocuments;
